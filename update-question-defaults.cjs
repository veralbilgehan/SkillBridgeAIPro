const fs = require('fs');

const file = 'dist/app.js';
let content = fs.readFileSync(file, 'utf8');

console.log('Original content length:', content.length);

// 1. Update questionsPage inputs
const oldQuestionsPageSettings = '<label><span>Soru Sayısı</span><input id="question-count" type="number" min="1" max="100" value="10"></label><label><span>Test Süresi (Dakika)</span><input id="test-total-minutes" type="number" min="1" value="30"></label><label><span>Soru Başına Süre (Dakika)</span><input id="question-minutes" type="number" min="1" value="3"></label><label><span>Her Kelime İçin Süre</span><div class="word-time-control"><input id="word-time-enabled" type="checkbox"><input id="word-seconds" type="number" min="1" value="2"><em>saniye</em></div></label>';
const newQuestionsPageSettings = '<label><span>Soru Sayısı</span><input id="question-count" type="number" min="1" max="100" value="1" oninput="window.updateTotalTestMinutes?.()"></label><label><span>Test Süresi (Dakika)</span><input id="test-total-minutes" type="number" min="1" value="3"></label><label><span>Soru Başına Süre (Dakika)</span><input id="question-minutes" type="number" min="1" value="3" oninput="window.updateTotalTestMinutes?.()"></label><label><span>Her Kelime İçin Süre</span><div class="word-time-control"><input id="word-time-enabled" type="checkbox"><input id="word-seconds" type="number" min="1" value="10"><em>saniye</em></div></label>';

if (!content.includes(oldQuestionsPageSettings)) {
    console.error('ERROR: oldQuestionsPageSettings not found!');
    process.exit(1);
}
content = content.replace(oldQuestionsPageSettings, newQuestionsPageSettings);
console.log('Updated questionsPage settings');

// 2. Update mcqPage inputs (line 344)
const oldMcqSettings = '<label><span>Soru Sayısı</span><input id="mcq-count" type="number" min="10" max="100" value="10"></label><label><span>Test Süresi (Dakika)</span><input id="test-total-minutes" type="number" min="1" value="30"></label><label><span>Soru Başına Süre (Dakika)</span><input id="question-minutes" type="number" min="1" value="3"></label>';
const newMcqSettings = '<label><span>Soru Sayısı</span><input id="mcq-count" type="number" min="1" max="100" value="1" oninput="window.updateTotalTestMinutes?.()"></label><label><span>Test Süresi (Dakika)</span><input id="test-total-minutes" type="number" min="1" value="3"></label><label><span>Soru Başına Süre (Dakika)</span><input id="question-minutes" type="number" min="1" value="3" oninput="window.updateTotalTestMinutes?.()"></label>';

if (!content.includes(oldMcqSettings)) {
    console.error('ERROR: oldMcqSettings not found!');
    process.exit(1);
}
content = content.replace(oldMcqSettings, newMcqSettings);
console.log('Updated mcqPage settings');

// 3. Update buildMcqDraft (line 343)
const oldBuildMcqDraft = "const source=pv('mcq-case',''),count=Number(pv('mcq-count','10'));if(!source.trim())return toast('Önce vaka metnini girin');if(count<10||count>100)return toast('Soru sayısı 10 ile 100 arasında olmalıdır');";
const newBuildMcqDraft = "const source=pv('mcq-case',''),count=Number(pv('mcq-count','1'));if(!source.trim())return toast('Önce vaka metnini girin');if(count<1||count>100)return toast('Soru sayısı 1 ile 100 arasında olmalıdır');";

if (!content.includes(oldBuildMcqDraft)) {
    console.error('ERROR: oldBuildMcqDraft not found!');
    process.exit(1);
}
content = content.replace(oldBuildMcqDraft, newBuildMcqDraft);
console.log('Updated buildMcqDraft (line 343)');

// 4. Update buildQuestionDraft (line 348)
const oldBuildQDraft = "const source=pv('question-case',''),count=Number(pv('question-count','10')),words=Number(pv('question-words','28'));";
const newBuildQDraft = "const source=pv('question-case',''),count=Number(pv('question-count','1')),words=Number(pv('question-words','28'));";

if (!content.includes(oldBuildQDraft)) {
    console.error('ERROR: oldBuildQDraft not found!');
    process.exit(1);
}
content = content.replace(oldBuildQDraft, newBuildQDraft);
console.log('Updated buildQuestionDraft (line 348)');

// 5. Update renderSecureQuestion word-seconds fallback (line 350)
const oldRenderSec = "perWord=document.getElementById('word-time-enabled')?.checked?Number(document.getElementById('word-seconds')?.value||2):0";
const newRenderSec = "perWord=document.getElementById('word-time-enabled')?.checked?Number(document.getElementById('word-seconds')?.value||10):0";

if (!content.includes(oldRenderSec)) {
    console.error('ERROR: oldRenderSec not found!');
    process.exit(1);
}
content = content.replace(oldRenderSec, newRenderSec);
console.log('Updated renderSecureQuestion (line 350)');

// 6. Update buildMcqDraft override (line 445)
const oldBuildMcqOverride = "buildMcqDraft=async function(){const button=document.querySelector('.question-builder .primary'),source=pv('mcq-case',''),count=Number(pv('mcq-count','10'));if(!source.trim())return toast('Önce vaka metnini girin');if(count<10||count>100)return toast('Soru sayısı 10 ile 100 arasında olmalıdır');";
const newBuildMcqOverride = "buildMcqDraft=async function(){const button=document.querySelector('.question-builder .primary'),source=pv('mcq-case',''),count=Number(pv('mcq-count','1'));if(!source.trim())return toast('Önce vaka metnini girin');if(count<1||count>100)return toast('Soru sayısı 1 ile 100 arasında olmalıdır');";

if (!content.includes(oldBuildMcqOverride)) {
    console.error('ERROR: oldBuildMcqOverride not found!');
    process.exit(1);
}
content = content.replace(oldBuildMcqOverride, newBuildMcqOverride);
console.log('Updated buildMcqDraft override (line 445)');

// 7. Update buildQuestionDraft override (line 446)
const oldBuildQOverride = "buildQuestionDraft=async function(){const button=document.querySelector('.question-builder .primary'),source=pv('question-case',''),count=Number(pv('question-count','10'));";
const newBuildQOverride = "buildQuestionDraft=async function(){const button=document.querySelector('.question-builder .primary'),source=pv('question-case',''),count=Number(pv('question-count','1'));";

if (!content.includes(oldBuildQOverride)) {
    console.error('ERROR: oldBuildQOverride not found!');
    process.exit(1);
}
content = content.replace(oldBuildQOverride, newBuildQOverride);
console.log('Updated buildQuestionDraft override (line 446)');

// 8. Update lines 5088-5118 (Ajan 16 / mcq-draft section)
const oldAgent16Count = '<input id="mcq-count" type="number" min="10" max="100" value="10">';
const newAgent16Count = '<input id="mcq-count" type="number" min="1" max="100" value="1" oninput="window.updateTotalTestMinutes?.()">';

if (content.includes(oldAgent16Count)) {
    content = content.replace(oldAgent16Count, newAgent16Count);
    console.log('Updated Agent 16 mcq-count input');
}

const oldAgent16Total = '<input id="test-total-minutes" type="number" min="5" value="25">';
const newAgent16Total = '<input id="test-total-minutes" type="number" min="1" value="3">';

if (content.includes(oldAgent16Total)) {
    content = content.replace(oldAgent16Total, newAgent16Total);
    console.log('Updated Agent 16 test-total-minutes input');
}

const oldAgent16Minutes = '<input id="question-minutes" type="number" min="1" value="2.5">';
const newAgent16Minutes = '<input id="question-minutes" type="number" min="1" value="3" oninput="window.updateTotalTestMinutes?.()">';

if (content.includes(oldAgent16Minutes)) {
    content = content.replace(oldAgent16Minutes, newAgent16Minutes);
    console.log('Updated Agent 16 question-minutes input');
}

const oldAgent16CountVal = "const count = Number(pv('mcq-count', '10')) || 10;";
const newAgent16CountVal = "const count = Number(pv('mcq-count', '1')) || 1;";

if (content.includes(oldAgent16CountVal)) {
    content = content.replace(oldAgent16CountVal, newAgent16CountVal);
    console.log('Updated Agent 16 count resolution');
}

const oldAgent16Check = "if (count < 5 || count > 100) return toast('Soru sayısı 10 ile 100 arasında olmalıdır.');";
const newAgent16Check = "if (count < 1 || count > 100) return toast('Soru sayısı 1 ile 100 arasında olmalıdır.');";

if (content.includes(oldAgent16Check)) {
    content = content.replace(oldAgent16Check, newAgent16Check);
    console.log('Updated Agent 16 count validation check');
}

// 9. Add window.updateTotalTestMinutes if not exists
if (!content.includes('window.updateTotalTestMinutes')) {
    const helperCode = `
// Otomatik test süresi senkronizasyonu (kullanıcı değiştirebilir)
window.updateTotalTestMinutes = function() {
    const qc = document.getElementById('question-count') || document.getElementById('mcq-count');
    const qm = document.getElementById('question-minutes');
    const tm = document.getElementById('test-total-minutes');
    if (qc && qm && tm) {
        const c = parseFloat(qc.value) || 1;
        const m = parseFloat(qm.value) || 3;
        tm.value = Math.max(1, Math.round(c * m));
    }
};
`;
    content += helperCode;
    console.log('Added window.updateTotalTestMinutes helper');
}

fs.writeFileSync(file, content, 'utf8');
console.log('All updates written to dist/app.js successfully!');
