const fs = require('fs');
const { execSync } = require('child_process');

try {
    const envContent = fs.readFileSync('.env', 'utf8');
    let geminiKey = '';
    
    envContent.split('\n').forEach(line => {
        line = line.trim();
        if (line.startsWith('GEMINI_API_KEY=')) {
            geminiKey = line.substring('GEMINI_API_KEY='.length).replace(/['"]/g, '').trim();
        }
    });

    if (!geminiKey) {
        console.error('GEMINI_API_KEY bulunamadı!');
        process.exit(1);
    }

    console.log('Deploying to Google Cloud Run...');
    const cmd = "gcloud run deploy skillbridge-pro --source . --region europe-west1 --allow-unauthenticated --quiet --set-env-vars GEMINI_API_KEY=" + geminiKey;
    
    execSync(cmd, { stdio: 'inherit' });
    console.log('Deployment successful!');

} catch(err) {
    console.error('Error during deployment:', err.message);
}
