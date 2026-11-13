// Toplu test (QR ile çoklu katılımcı) veri katmanı.
// Cloud Run'da Firestore, yerel geliştirmede data/group-tests.json kullanılır.
// Her iki arka uç da aynı kuralları uygular: kapasite, sicil başına tek giriş, sunucu tarafı puanlama.
import { randomBytes, createHash } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const COLLECTION = 'sbGroupTests';

export class GroupError extends Error {
    constructor(status, message) { super(message); this.status = status; }
}

export const newToken = () => randomBytes(24).toString('base64url');
export const hashToken = token => createHash('sha256').update(String(token)).digest('hex');
// Sicil no anahtarı: büyük/küçük harf ve boşluk farkı aynı kişiyi iki kez sokmasın
export const sicilKey = sicil => String(sicil).trim().toLocaleUpperCase('tr-TR').replace(/\s+/g, '');

export function scoreAnswers(questions, answers) {
    let correct = 0, wrong = 0, blank = 0;
    const detail = questions.map((q, i) => {
        const given = Number.isInteger(answers[i]) ? answers[i] : null;
        if (given === null) blank++;
        else if (given === q.answer) correct++;
        else wrong++;
        return given;
    });
    const score = questions.length ? Math.round(correct / questions.length * 100) : 0;
    return { correct, wrong, blank, score, answers: detail };
}

function levelFor(score) {
    if (score >= 90) return 'Lead / Principal';
    if (score >= 75) return 'Senior';
    if (score >= 50) return 'Mid-Level';
    return 'Junior';
}

// Katılımcıya gönderilecek görünüm: doğru cevaplar ve açıklamalar sunucuda kalır
export function publicView(test, joinedCount) {
    return {
        id: test.id,
        title: test.title,
        caseText: test.caseText,
        status: test.status,
        timeLimitMinutes: test.timeLimitMinutes,
        questionCount: test.questions.length,
        full: joinedCount >= test.capacity,
        questions: test.questions.map(q => ({ text: q.text, options: q.options }))
    };
}

// --- Ortak iş kuralları (arka uçtan bağımsız) ---

// Test belgesinde sayaç tutulmaz: yüzlerce kişi aynı anda QR okuttuğunda tek belgeye
// yazma çakışması (Firestore ~1 yazma/sn/belge) girişleri düşürürdü. Sayı, katılımcı
// kayıtlarından okunur; eşzamanlı girişlerde kapasite birkaç kişi aşılabilir.
function applyJoin(test, existing, joinedCount, { name, sicil, resumeToken }) {
    if (!test) throw new GroupError(404, 'Test bulunamadı.');
    if (existing) {
        if (existing.status === 'submitted') throw new GroupError(409, 'Bu sicil numarası ile test daha önce tamamlanmış.');
        if (resumeToken && hashToken(resumeToken) === existing.tokenHash) return { resume: true, participant: existing };
        throw new GroupError(409, 'Bu sicil numarası ile test başka bir cihazda başlatılmış.');
    }
    if (test.status !== 'open') throw new GroupError(409, 'Bu test katılıma kapatılmış.');
    if (joinedCount >= test.capacity) throw new GroupError(409, 'Test kapasitesi dolmuştur.');
    const token = newToken();
    const participant = {
        name, sicil, key: sicilKey(sicil), tokenHash: hashToken(token),
        status: 'started', startedAt: Date.now()
    };
    return { resume: false, participant, token };
}

function applySubmit(test, participant, { token, answers, durations }) {
    if (!test) throw new GroupError(404, 'Test bulunamadı.');
    if (!participant || hashToken(token) !== participant.tokenHash) throw new GroupError(403, 'Katılım doğrulanamadı.');
    if (participant.status === 'submitted') throw new GroupError(409, 'Bu test zaten gönderilmiş.');
    const scored = scoreAnswers(test.questions, Array.isArray(answers) ? answers : []);
    const submittedAt = Date.now();
    const seconds = Math.round((submittedAt - participant.startedAt) / 1000);
    return {
        ...participant,
        ...scored,
        durations: Array.isArray(durations) ? durations.slice(0, test.questions.length).map(n => Math.max(0, Math.round(Number(n) || 0))) : [],
        level: levelFor(scored.score),
        seconds,
        late: seconds > test.timeLimitMinutes * 60 + 120,
        status: 'submitted',
        submittedAt
    };
}

// --- Firestore arka ucu ---

async function firestoreStore(databaseId) {
    const { Firestore } = await import('@google-cloud/firestore');
    // Projedeki diğer uygulamaların verisinden ayrı tutmak için adlandırılmış veritabanı kullanılabilir
    const fs = new Firestore(databaseId ? { databaseId } : {});
    const tests = fs.collection(COLLECTION);
    const people = id => tests.doc(id).collection('participants');

    const getTest = async id => { const s = await tests.doc(id).get(); return s.exists ? s.data() : null; };
    const joinedCount = async id => (await people(id).count().get()).data().count;

    return {
        async createTest(test) { await tests.doc(test.id).create(test); },
        getTest,
        joinedCount,
        async setStatus(id, status) { await tests.doc(id).update({ status }); },
        async join(id, input) {
            const pRef = people(id).doc(sicilKey(input.sicil));
            const [test, ps, count] = await Promise.all([getTest(id), pRef.get(), joinedCount(id)]);
            const result = applyJoin(test, ps.exists ? ps.data() : null, count, input);
            if (result.resume) return result;
            try {
                // create(): aynı sicil ile eşzamanlı ikinci giriş ALREADY_EXISTS ile reddedilir
                await pRef.create(result.participant);
            } catch (e) {
                if (e.code === 6) throw new GroupError(409, 'Bu sicil numarası ile test başka bir cihazda başlatılmış.');
                throw e;
            }
            return result;
        },
        async submit(id, sicil, input) {
            const test = await getTest(id); // sorular yayından sonra değişmez
            const pRef = people(id).doc(sicilKey(sicil));
            // Transaction yalnızca katılımcının kendi belgesini kilitler (çakışma yok)
            return fs.runTransaction(async tx => {
                const ps = await tx.get(pRef);
                const done = applySubmit(test, ps.exists ? ps.data() : null, input);
                tx.set(pRef, done);
                return done;
            });
        },
        async participants(id) { return (await people(id).get()).docs.map(d => d.data()); }
    };
}

// --- Yerel JSON dosyası arka ucu (geliştirme) ---

function fileStore(path) {
    let data = null, chain = Promise.resolve();
    const load = async () => {
        if (data) return data;
        try { data = JSON.parse(await readFile(path, 'utf8')); } catch { data = {}; }
        return data;
    };
    const save = async () => { await mkdir(dirname(path), { recursive: true }); await writeFile(path, JSON.stringify(data)); };
    // Yazma işlemlerini sıraya al (Firestore transaction'ının yerel karşılığı)
    const locked = fn => (chain = chain.then(async () => fn(await load()), async () => fn(await load())));

    return {
        createTest: test => locked(async d => {
            if (d[test.id]) throw new GroupError(409, 'Test zaten var.');
            d[test.id] = { test, participants: {} };
            await save();
        }),
        getTest: async id => (await load())[id]?.test || null,
        joinedCount: async id => Object.keys((await load())[id]?.participants || {}).length,
        setStatus: (id, status) => locked(async d => { d[id].test.status = status; await save(); }),
        join: (id, input) => locked(async d => {
            const rec = d[id];
            const joined = rec ? Object.keys(rec.participants).length : 0;
            const result = applyJoin(rec?.test || null, rec?.participants[sicilKey(input.sicil)] || null, joined, input);
            if (!result.resume) {
                rec.participants[result.participant.key] = result.participant;
                await save();
            }
            return result;
        }),
        submit: (id, sicil, input) => locked(async d => {
            const rec = d[id];
            const done = applySubmit(rec?.test || null, rec?.participants[sicilKey(sicil)] || null, input);
            rec.participants[done.key] = done;
            await save();
            return done;
        }),
        participants: async id => Object.values((await load())[id]?.participants || {})
    };
}

let storePromise = null;
export function getStore(env) {
    if (!storePromise) {
        // Cloud Run K_SERVICE tanımlar; GROUP_STORE ile elle seçilebilir
        const kind = env.GROUP_STORE || (env.K_SERVICE ? 'firestore' : 'file');
        const root = join(dirname(fileURLToPath(import.meta.url)), 'data', 'group-tests.json');
        storePromise = kind === 'firestore' ? firestoreStore(env.FIRESTORE_DATABASE) : Promise.resolve(fileStore(root));
    }
    return storePromise;
}
