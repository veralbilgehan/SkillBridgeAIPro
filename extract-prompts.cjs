const fs = require('fs');
const app = fs.readFileSync('dist/app.js', 'utf8');

const getMatches = (funcName) => {
    const idx = app.indexOf(funcName);
    if (idx === -1) return null;
    const promptIdx = app.indexOf('const prompt=`', idx);
    if (promptIdx === -1) return null;
    const endIdx = app.indexOf('`', promptIdx + 15);
    return app.substring(promptIdx, endIdx + 1);
};

console.log('HR:', getMatches('generateHrQuestion=async function'));
console.log('MCQ:', getMatches('buildMcqDraft=async function'));
console.log('QDraft:', getMatches('buildQuestionDraft=async function'));
