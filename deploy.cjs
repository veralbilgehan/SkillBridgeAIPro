const fs = require('fs');
const { spawnSync } = require('child_process');

const SERVICE = 'skillbridge-pro';
const REGION = 'europe-west1';
const SECRET = 'gemini-api-key';
// Toplu test sonuçları bu Firestore veritabanında tutulur (projedeki diğer uygulamalardan ayrı)
const FIRESTORE_DB = 'skillbridge';
// Hedef proje: GCP_PROJECT ortam değişkeni > gcloud varsayılan projesi
const PROJECT = process.env.GCP_PROJECT || '';

// gcloud'u kabuk üzerinden çalıştırır (Windows'ta gcloud.cmd). Gizli değerler argüman olarak değil, stdin ile verilir.
function gcloud(args, { input, allowFail = false, capture = false } = {}) {
    if (PROJECT) args = args.concat(['--project', PROJECT]);
    const r = spawnSync('gcloud', args, {
        shell: true,
        input,
        encoding: 'utf8',
        stdio: [input !== undefined ? 'pipe' : 'inherit', capture ? 'pipe' : 'inherit', capture ? 'pipe' : 'inherit']
    });
    if (r.status !== 0 && !allowFail) {
        throw new Error('gcloud ' + args.slice(0, 3).join(' ') + ' başarısız (kod ' + r.status + ')');
    }
    return r;
}

try {
    // 1. Anahtarı .env dosyasından oku (komut satırına yazılmaz, loglanmaz)
    const envContent = fs.readFileSync('.env', 'utf8');
    let geminiKey = '';
    envContent.split(/\r?\n/).forEach(line => {
        line = line.trim();
        if (line.startsWith('GEMINI_API_KEY=')) {
            geminiKey = line.substring('GEMINI_API_KEY='.length).replace(/['"]/g, '').trim();
        }
    });
    if (!geminiKey) {
        console.error('GEMINI_API_KEY bulunamadı!');
        process.exit(1);
    }

    // 2. Proje bilgileri
    const project = PROJECT || gcloud(['config', 'get-value', 'project', '--quiet'], { capture: true }).stdout.trim();
    const projectNumber = gcloud(['projects', 'describe', project, '--format=value(projectNumber)'], { capture: true }).stdout.trim();
    if (!projectNumber) throw new Error('Proje numarası alınamadı: ' + project);
    const runtimeSa = projectNumber + '-compute@developer.gserviceaccount.com';
    console.log('Hedef proje: ' + project + ' (' + projectNumber + ')');

    // 3. Gerekli API'leri etkinleştir
    console.log('Cloud Run, Cloud Build, Artifact Registry ve Secret Manager API etkinleştiriliyor...');
    gcloud(['services', 'enable', 'run.googleapis.com', 'cloudbuild.googleapis.com', 'artifactregistry.googleapis.com', 'secretmanager.googleapis.com', 'firestore.googleapis.com', '--quiet']);

    // Toplu test veritabanı yoksa oluştur (tek seferlik)
    const dbExists = gcloud(['firestore', 'databases', 'describe', '--database=' + FIRESTORE_DB, '--format=value(name)'], { capture: true, allowFail: true }).status === 0;
    if (!dbExists) {
        console.log('Firestore veritabanı oluşturuluyor: ' + FIRESTORE_DB);
        gcloud(['firestore', 'databases', 'create', '--database=' + FIRESTORE_DB, '--location=' + REGION, '--type=firestore-native', '--quiet']);
    }

    // 4. Secret yoksa oluştur, varsa yeni sürüm ekle (değer stdin üzerinden gider)
    const exists = gcloud(['secrets', 'describe', SECRET, '--format=value(name)'], { capture: true, allowFail: true }).status === 0;
    if (!exists) {
        console.log('Secret oluşturuluyor: ' + SECRET);
        gcloud(['secrets', 'create', SECRET, '--replication-policy=automatic', '--data-file=-', '--quiet'], { input: geminiKey });
    } else {
        console.log('Secret güncelleniyor (yeni sürüm): ' + SECRET);
        gcloud(['secrets', 'versions', 'add', SECRET, '--data-file=-', '--quiet'], { input: geminiKey });
    }

    // 5. Cloud Run çalışma hesabına okuma yetkisi ver
    gcloud([
        'secrets', 'add-iam-policy-binding', SECRET,
        '--member=serviceAccount:' + runtimeSa,
        '--role=roles/secretmanager.secretAccessor',
        '--quiet'
    ], { capture: true });

    // 6. Dağıt: GEMINI_API_KEY ortam değişkeni Secret Manager'dan gelir
    console.log('Deploying to Google Cloud Run...');
    gcloud([
        'run', 'deploy', SERVICE,
        '--source', '.',
        '--region', REGION,
        '--allow-unauthenticated',
        '--quiet',
        '--remove-env-vars', 'GEMINI_API_KEY',
        '--set-secrets', 'GEMINI_API_KEY=' + SECRET + ':latest',
        '--update-env-vars', 'FIRESTORE_DATABASE=' + FIRESTORE_DB
    ]);
    console.log('Deployment successful!');
} catch (err) {
    console.error('Error during deployment:', err.message);
    process.exitCode = 1;
}
