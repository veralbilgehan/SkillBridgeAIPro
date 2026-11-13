// Toplu test katılımcı ekranı: QR ile açılır (group.html?t=<testId>).
// Ad soyad + sicil ile giriş, tek tek soru, geri dönüş yok, süre bitince otomatik gönderim.
// Doğru cevaplar bu sayfaya hiç gelmez; puanlama sunucuda yapılır.
(function () {
    const app = document.getElementById('app');
    const timerEl = document.getElementById('timer');
    const testId = new URLSearchParams(location.search).get('t') || '';
    const KEY = 'sbgt_' + testId;
    let test = null, session = null, timerId = null, questionShownAt = 0;

    const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const load = () => { try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { return null; } };
    const save = () => { try { localStorage.setItem(KEY, JSON.stringify(session)); } catch (e) {} };

    async function api(path, opts) {
        const res = await fetch('/api/group-tests/' + encodeURIComponent(testId) + path, opts);
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || 'Sunucuya ulaşılamadı. Bağlantınızı kontrol edip tekrar deneyin.');
        return data;
    }
    const post = (path, body) => api(path, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });

    function message(icon, title, text) {
        stopTimer();
        app.innerHTML = `<div class="card center"><div class="big">${icon}</div><h1>${esc(title)}</h1><p class="muted">${esc(text)}</p></div>`;
    }

    // --- Giriş ---
    function renderIntro() {
        app.innerHTML = `<div class="card">
            <h1>${esc(test.title)}</h1>
            <div class="meta"><span>${test.questionCount} soru</span><span>${test.timeLimitMinutes} dakika</span><span>Çoktan seçmeli</span></div>
            <p class="muted">Sorular tek tek gösterilir. Cevabınızı kaydettikten sonra önceki soruya dönemezsiniz. Süre dolduğunda test otomatik olarak gönderilir.</p>
            <label for="g-name">Ad Soyad</label><input id="g-name" type="text" autocomplete="name" maxlength="100">
            <label for="g-sicil">Sicil / Personel No</label><input id="g-sicil" type="text" autocomplete="off" maxlength="40">
            <label class="consent"><input id="g-consent" type="checkbox"><span>Adım, sicil numaram ve cevaplarım değerlendirme amacıyla test yöneticisine iletilecektir.</span></label>
            <p class="error" id="g-err"></p>
            <button class="primary" id="g-start">Teste Başla</button>
        </div>`;
        document.getElementById('g-start').onclick = join;
    }

    async function join() {
        const name = document.getElementById('g-name').value.trim();
        const sicil = document.getElementById('g-sicil').value.trim();
        const err = document.getElementById('g-err');
        if (name.length < 3 || !sicil) return err.textContent = 'Ad soyad ve sicil numarası zorunludur.';
        if (!document.getElementById('g-consent').checked) return err.textContent = 'Devam etmek için bilgilendirmeyi onaylayın.';
        const btn = document.getElementById('g-start');
        btn.disabled = true; err.textContent = '';
        try {
            const r = await post('/join', { name, sicil });
            session = { name: r.name, sicil, token: r.token, startedAt: r.startedAt, index: 0, answers: [], durations: [], caseRead: !test.caseText, submitted: false };
            save();
            next();
        } catch (e) { err.textContent = e.message; btn.disabled = false; }
    }

    // --- Süre ---
    function remaining() { return Math.round((session.startedAt + test.timeLimitMinutes * 60000 - Date.now()) / 1000); }
    function startTimer() {
        if (timerId) return;
        timerEl.hidden = false;
        const tick = () => {
            const left = Math.max(0, remaining());
            timerEl.textContent = '⏱ ' + String(Math.floor(left / 60)).padStart(2, '0') + ':' + String(left % 60).padStart(2, '0');
            timerEl.classList.toggle('warn', left <= 60);
            if (left <= 0) { stopTimer(); submit(true); }
        };
        tick();
        timerId = setInterval(tick, 1000);
    }
    function stopTimer() { if (timerId) clearInterval(timerId); timerId = null; timerEl.hidden = true; }

    // --- Akış ---
    function next() {
        if (session.submitted) return message('✅', 'Testiniz tamamlandı', 'Cevaplarınız test yöneticisine iletildi. Teşekkür ederiz.');
        if (remaining() <= 0) return submit(true);
        startTimer();
        if (!session.caseRead) return renderCase();
        if (session.index >= test.questions.length) return renderReview();
        renderQuestion();
    }

    function renderCase() {
        app.innerHTML = `<div class="card"><h2>Vaka</h2><div class="case">${esc(test.caseText)}</div>
            <p class="muted">Vakayı dikkatlice okuyun. Sorular sırasında vakayı yeniden açabilirsiniz.</p>
            <button class="primary" id="g-go">Sorulara Başla</button></div>`;
        document.getElementById('g-go').onclick = () => { session.caseRead = true; save(); next(); };
    }

    function renderQuestion() {
        const i = session.index, q = test.questions[i];
        let selected = null;
        questionShownAt = Date.now();
        app.innerHTML = `<div class="card">
            <div class="progress"><i style="width:${(i / test.questions.length) * 100}%"></i></div>
            <p class="muted" style="margin:0 0 8px;font-weight:700">Soru ${i + 1} / ${test.questions.length}</p>
            ${test.caseText ? `<details><summary>Vakayı göster</summary><div class="case">${esc(test.caseText)}</div></details>` : ''}
            <h2>${esc(q.text)}</h2>
            <div class="options">${q.options.map((o, k) => `<button data-k="${k}"><b>${'ABCD'[k]}</b><span>${esc(o)}</span></button>`).join('')}</div>
            <div class="row"><button id="g-skip">Boş Bırak</button><button class="primary" id="g-save" disabled>Cevabı Kaydet</button></div>
        </div>`;
        app.querySelectorAll('.options button').forEach(b => b.onclick = () => {
            selected = Number(b.dataset.k);
            app.querySelectorAll('.options button').forEach(x => x.classList.toggle('sel', x === b));
            document.getElementById('g-save').disabled = false;
        });
        const record = value => {
            session.answers[i] = value;
            session.durations[i] = Math.round((Date.now() - questionShownAt) / 1000);
            session.index++;
            save();
            next();
        };
        document.getElementById('g-save').onclick = () => record(selected);
        document.getElementById('g-skip').onclick = () => record(null);
    }

    function renderReview() {
        const blank = test.questions.length - session.answers.filter(a => a !== null && a !== undefined).length;
        app.innerHTML = `<div class="card center"><div class="big">📝</div><h1>Tüm sorular tamamlandı</h1>
            <p class="muted">${blank ? blank + ' soruyu boş bıraktınız. ' : ''}Testi gönderdikten sonra değişiklik yapılamaz.</p>
            <p class="error" id="g-err"></p>
            <button class="primary" id="g-send">Testi Gönder</button></div>`;
        document.getElementById('g-send').onclick = () => submit(false);
    }

    async function submit(timeUp) {
        stopTimer();
        app.innerHTML = `<div class="card center"><div class="big">⏳</div><h1>${timeUp ? 'Süre doldu' : 'Gönderiliyor'}</h1><p class="muted">Cevaplarınız gönderiliyor…</p><p class="error" id="g-err"></p></div>`;
        const answers = test.questions.map((_, i) => Number.isInteger(session.answers[i]) ? session.answers[i] : null);
        try {
            await post('/submit', { sicil: session.sicil, token: session.token, answers, durations: session.durations });
            session.submitted = true;
            save();
            next();
        } catch (e) {
            // Bağlantı koparsa cevaplar cihazda kalır; katılımcı tekrar deneyebilir
            const box = document.getElementById('g-err');
            box.textContent = e.message;
            const retry = document.createElement('button');
            retry.className = 'primary'; retry.textContent = 'Tekrar Gönder'; retry.style.marginTop = '12px';
            retry.onclick = () => submit(timeUp);
            box.after(retry);
        }
    }

    window.addEventListener('beforeunload', e => {
        if (session && !session.submitted && session.index > 0) { e.preventDefault(); e.returnValue = ''; }
    });

    // --- Başlangıç ---
    (async function init() {
        if (!/^[A-Za-z0-9_-]{6,40}$/.test(testId)) return message('⚠️', 'Geçersiz bağlantı', 'QR kodu yeniden okutun veya test yöneticisinden bağlantıyı isteyin.');
        try { test = await api(''); } catch (e) { return message('⚠️', 'Test açılamadı', e.message); }
        document.title = test.title + ' · SkillBridge';
        session = load();
        if (session && session.submitted) return next();
        if (session && session.token) {
            // Aynı cihazda yarım kalan teste devam (sayfa yenilendi / kapandı)
            try { await post('/join', { name: session.name, sicil: session.sicil, resumeToken: session.token }); return next(); }
            catch (e) { session = null; try { localStorage.removeItem(KEY); } catch (x) {} }
        }
        if (test.status !== 'open') return message('🔒', 'Test kapalı', 'Bu test şu anda katılıma kapalıdır.');
        if (test.full) return message('🚫', 'Kapasite dolu', 'Bu testin katılımcı kapasitesi dolmuştur.');
        renderIntro();
    })();
})();
