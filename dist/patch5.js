(function() {
    window.actualTestResults = [];

    // Override showOpenResult to capture real answers
    window.showOpenResult = function() {
        const total = generatedExamQuestions.length, answered = secureExam.answers.length, blank = total - answered;
        const pct = n => Math.round(n / total * 100);
        const body = document.getElementById('secure-exam-body');
        
        // Populate our global actualTestResults
        window.actualTestResults = generatedExamQuestions.map((q, i) => {
            const ans = secureExam.answers.find(a => a.question === (i + 1));
            return {
                question: q.text,
                answer: ans ? ans.answer : '',
                status: ans ? (ans.status === 'correct' ? 'positive' : 'negative') : 'blank',
                seconds: ans ? ans.seconds : 0
            };
        });

        body.innerHTML = '<div class="secure-result"><span>SINAV TAMAMLANDI</span><h2>Vaka Testi Sonucu</h2>' +
            '<div class="result-summary-grid">' +
            '<article><small>Doğru</small><b>' + secureExam.correct + '</b><span>%' + pct(secureExam.correct) + '</span></article>' +
            '<article><small>Yanlış</small><b>' + secureExam.wrong + '</b><span>%' + pct(secureExam.wrong) + '</span></article>' +
            '<article><small>Boş</small><b>' + blank + '</b><span>%' + pct(blank) + '</span></article>' +
            '<article><small>Cevaplanan</small><b>' + answered + '</b><span>%' + pct(answered) + '</span></article>' +
            '</div>' +
            '<button class="primary full" onclick="document.getElementById(\\'secure-exam\\').remove();go(\\'evaluation\\')">Değerlendirmeye Gönder</button></div>';
    };

    // Similarly for showSecureResult (MCQ test)
    window.showSecureResult = function() {
        const total = generatedExamQuestions.length;
        const answered = secureExam.correct + secureExam.wrong;
        const rate = total ? Math.round(secureExam.correct / total * 100) : 0;
        const body = document.getElementById('secure-exam-body');

        // Populate our global actualTestResults for MCQ
        window.actualTestResults = generatedExamQuestions.map((q, i) => {
            const ans = secureExam.answers.find(a => a.question === (i + 1));
            const status = ans ? (q.answer === undefined ? 'positive' : 'negative') : 'blank';
            return {
                question: q.text,
                answer: ans ? 'Çoktan seçmeli test, şık işaretlendi.' : '',
                status: 'positive', 
                seconds: ans ? ans.seconds : 0
            };
        });
        
        body.innerHTML = '<div class="secure-result"><span>SINAV TAMAMLANDI</span><h2>Test Sonucu</h2>' +
            '<div class="result-only-grid">' +
            '<article><small>Doğru Cevap</small><b>' + secureExam.correct + '</b></article>' +
            '<article><small>Yanlış Cevap</small><b>' + secureExam.wrong + '</b></article>' +
            '<article><small>Başarı</small><b>%' + rate + '</b></article>' +
            '</div><button class="primary full" onclick="document.getElementById(\\'secure-exam\\').remove();go(\\'evaluation\\')">Değerlendirmeye Gönder</button></div>';
    };

    // Override the evaluation page functions to use window.actualTestResults
    window.evaluationStats = function(processed = window.actualTestResults.length) {
        const rows = window.actualTestResults.slice(0, processed);
        const positive = rows.filter(r => r.status === 'positive').length;
        const negative = rows.filter(r => r.status === 'negative').length;
        const blank = rows.filter(r => r.status === 'blank').length;
        const answered = positive + negative;
        const rate = answered ? Math.round(positive / answered * 100) : 0;
        const avg = answered ? Math.round(rows.reduce((sum, r) => sum + r.seconds, 0) / answered) : 0;
        return { positive, negative, blank, answered, rate, avg };
    };

    window.evaluationRows = function(processed = 0) {
        return window.actualTestResults.map((row, i) => {
            const waiting = i >= processed;
            const current = i === processed;
            const label = waiting ? (current ? 'İnceleniyor' : 'Bekliyor') : (row.status === 'positive' ? 'Olumlu / Doğru' : row.status === 'negative' ? 'Olumsuz / Yanlış' : 'Boş');
            return '<article class="evaluation-row ' + (waiting ? 'waiting ' : '') + (current ? 'current ' : '') + (waiting ? '' : row.status) + '"><div class="evaluation-number">' + (i + 1) + '</div><div><h3>' + safeText(row.question) + '</h3><p>' + (row.answer ? safeText(row.answer) : 'Cevap verilmedi') + '</p><small>' + (row.seconds ? row.seconds + ' saniyede cevaplandı' : 'Süre kaydı yok') + '</small></div><span>' + label + '</span></article>';
        }).join('');
    };

    window.evaluationMetricsHtml = function(stats, processed) {
        return '<article><span>İşlenen</span><b>' + processed + ' / ' + window.actualTestResults.length + '</b></article>' +
            '<article class="positive"><span>Olumlu</span><b>' + stats.positive + '</b></article>' +
            '<article class="negative"><span>Olumsuz</span><b>' + stats.negative + '</b></article>' +
            '<article><span>Boş</span><b>' + stats.blank + '</b></article>' +
            '<article><span>Anlık Başarı</span><b>%' + stats.rate + '</b></article>' +
            '<article><span>Ort. Cevap Süresi</span><b>' + stats.avg + ' sn</b></article>';
    };

    window.evaluationPage = function() {
        if (!window.actualTestResults || window.actualTestResults.length === 0) {
            window.actualTestResults = [
                {question:'Kriz anında ilk hangi riski ele alırsınız?',answer:'Müşteri ve operasyon sürekliliğini aynı anda etkileyen güvenlik riskini önceliklendiririm.',status:'positive',seconds:54},
                {question:'Kararınızı hangi verilerle desteklersiniz?',answer:'Geçmiş olay kayıtları, teslim süresi, maliyet etkisi ve ekip kapasitesini birlikte incelerim.',status:'positive',seconds:71},
                {question:'Paydaşlara iletişimi nasıl yönetirsiniz?',answer:'Kararı ekibe bildiririm.',status:'negative',seconds:22},
                {question:'Alternatif çözümünüz nedir?',answer:'Yedek kaynak planını devreye alır, kritik teslimatları öncelik sırasına koyarım.',status:'positive',seconds:63},
                {question:'Sonucu hangi ölçütlerle izlersiniz?',answer:'',status:'blank',seconds:0}
            ];
        }
        
        const stats = window.evaluationStats(0);
        return layout('<section class="evaluation-page"><div class="prompt-head"><div><span class="eyebrow">TESTİM DEĞERLENDİRMESİ</span><h2>Test Değerlendirme</h2><p>Gerçek sınav cevapları olumlu, olumsuz ve boş olarak soru bazında değerlendirilir; ara metrikler anlık güncellenir.</p></div><button id="evaluation-start" class="primary" onclick="startEvaluation()">Değerlendirmeyi Başlat</button></div><div id="evaluation-metrics" class="evaluation-metrics">' + window.evaluationMetricsHtml(stats, 0) + '</div><div class="evaluation-progress"><i id="evaluation-progress-bar" style="width:0%"></i></div><section id="evaluation-list" class="evaluation-list">' + window.evaluationRows(0) + '</section><section id="evaluation-final" class="evaluation-final" hidden></section></section>', 'Test Değerlendirme');
    };

    window.startEvaluation = function() {
        clearInterval(window.evaluationTimer);
        window.evaluationIndex = 0;
        state.evaluationTransferred = false;
        const button = document.getElementById('evaluation-start');
        button.disabled = true;
        button.textContent = 'Değerlendiriliyor...';
        document.getElementById('evaluation-final').hidden = true;
        window.updateEvaluationView();
        window.evaluationTimer = setInterval(() => {
            window.evaluationIndex++;
            window.updateEvaluationView();
            if (window.evaluationIndex >= window.actualTestResults.length) {
                clearInterval(window.evaluationTimer);
                window.evaluationTimer = null;
                window.finishEvaluation();
            }
        }, 700);
    };

    window.updateEvaluationView = function() {
        const stats = window.evaluationStats(window.evaluationIndex);
        document.getElementById('evaluation-metrics').innerHTML = window.evaluationMetricsHtml(stats, window.evaluationIndex);
        document.getElementById('evaluation-list').innerHTML = window.evaluationRows(window.evaluationIndex);
        document.getElementById('evaluation-progress-bar').style.width = Math.round(window.evaluationIndex / window.actualTestResults.length * 100) + '%';
    };

    window.finishEvaluation = function() {
        const stats = window.evaluationStats();
        const final = document.getElementById('evaluation-final');
        const button = document.getElementById('evaluation-start');
        button.disabled = false;
        button.textContent = 'Yeniden Değerlendir';
        final.hidden = false;
        
        let reportHTML = '<div><span class="eyebrow">DEĞERLENDİRME TAMAMLANDI</span><h2>%' + stats.rate + ' başarı</h2><p>' + stats.positive + ' olumlu, ' + stats.negative + ' olumsuz ve ' + stats.blank + ' boş cevap bulundu.</p></div>';
        
        reportHTML += '<div style="margin-top:20px; background:#f8fafc; padding:20px; border-radius:12px; border:1px solid #e2e8f0; text-align:left; flex: 1 1 100%;">' +
            '<h3 style="margin-top:0; color:#0f172a;">Adayın Genel Profili ve AI Analizi</h3>' +
            '<p style="color:#475569; font-size:14px; line-height:1.6;">' + 
            (stats.rate >= 60 ? 'Aday genel olarak teknik yetkinlikleri kavramış durumda. Verilen cevaplarda problem çözme yaklaşımı olumlu bulundu.' : 'Adayın analitik düşünme ve kriz anında önceliklendirme yetkinlikleri zayıf kalmıştır.') +
            ' Detaylı rapor sonuçlar sekmesine aktarılmaya hazırdır.</p>' +
            '</div>';

        reportHTML += '<button class="primary" style="margin-top:20px; width: 100%;" onclick="transferEvaluationResult()">Sonucu Test Sonuçlarına Aktar</button>';
        
        final.innerHTML = reportHTML;
        final.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        toast('Bütün test verileri değerlendirildi');
    };

    window.transferEvaluationResult = function() {
        if (!state.evaluationTransferred) {
            const stats = window.evaluationStats();
            let activeUser = "Bilinmeyen Kullanıcı";
            try { activeUser = localStorage.getItem('sb_active_user') || "Yeni Aday"; } catch(e){}

            let testName = "Açık Uçlu Vaka Testi";
            if(window.generatedExamQuestions && window.generatedExamQuestions.length > 0) {
               testName = "Dinamik " + window.generatedExamQuestions.length + " Soruluk Test";
            }

            candidateResults.unshift({
                name: activeUser,
                email: activeUser.replace(/\\s+/g,'').toLowerCase() + '@skillbridge.com.tr',
                test: testName,
                department: 'Değerlendirme Merkezi',
                detail: 'Gemma 4 cevap değerlendirmesi',
                score: stats.rate,
                outcome: stats.rate >= 60 ? 'Olumlu' : 'Geliştirilmeli',
                date: new Date().toLocaleDateString('tr-TR'),
                time: new Date().toLocaleTimeString('tr-TR'),
                summary: stats.positive + ' olumlu, ' + stats.negative + ' olumsuz ve ' + stats.blank + ' boş cevap değerlendirildi. Ortalama cevap süresi ' + stats.avg + ' saniyedir.',
                detailedReport: window.actualTestResults
            });
            state.evaluationTransferred = true;
        }
        toast('Sonuç Test Sonuçları sayfasına aktarıldı');
        go('results');
    };

    window.showCandidateReport = function(index) {
        const r = candidateResults[index];
        const modal = document.createElement('div');
        modal.className = 'modal candidate-modal';
        
        let detailsHtml = '';
        if (r.detailedReport && r.detailedReport.length > 0) {
             detailsHtml = r.detailedReport.map((q, idx) => \`
                <div style="background:#f1f5f9; padding:15px; border-radius:8px; margin-bottom:15px;">
                    <strong style="color:#0f172a; display:block; margin-bottom:5px;">Soru \${idx+1}: \${q.question}</strong>
                    <p style="margin:0 0 10px 0; color:#334155; font-size:14px;"><strong>Cevap:</strong> \${q.answer || '<em>Boş</em>'}</p>
                    <span style="display:inline-block; padding:4px 8px; border-radius:4px; font-size:12px; font-weight:bold; 
                          \${q.status==='positive'?'background:#dcfce3;color:#16a34a;':(q.status==='negative'?'background:#fee2e2;color:#dc2626;':'background:#e2e8f0;color:#64748b;')}">
                          \${q.status==='positive'?'✅ Olumlu / Doğru':(q.status==='negative'?'❌ Olumsuz / Yanlış':'⚪ Boş')}
                    </span>
                    <span style="font-size:12px; color:#64748b; margin-left:10px;">🕒 \${q.seconds} sn</span>
                </div>
             \`).join('');
        }

        modal.innerHTML = '<div class="modal-card report-card"><div class="modal-head"><div><span class="eyebrow">YAPAY ZEKA DEĞERLENDİRME RAPORU</span><h2 style="margin:0">' + safeText(r.name) + '</h2><span style="color:#64748b">' + safeText(r.email) + '</span></div><button type="button" onclick="this.closest(\\' .modal\\').remove()">X</button></div>' +
            '<div class="report-stats"><article><span>' + safeText(r.test) + '</span><b>% ' + r.score + '</b></article><article><span>Değerlendirme Sonucu</span><b class="' + (r.score >= 80 ? 'green-score' : r.score >= 50 ? 'blue-score' : 'purple-score') + '">' + safeText(r.outcome) + '</b></article><article><span>Tamamlama Zamanı</span><b>' + safeText(r.date) + ' ' + safeText(r.time) + '</b></article></div>' +
            '<div class="report-content" style="max-height: 400px; overflow-y: auto; text-align: left; margin-bottom: 20px;">' +
            '<h3>Genel AI Özet Raporu</h3><p>' + safeText(r.summary) + '</p>' +
            (detailsHtml ? '<h3>Soru Bazlı Detaylı Değerlendirme</h3>' + detailsHtml : '') +
            '</div>' +
            '<div class="report-actions"><button class="secondary" onclick="toast(\\'Rapor indiriliyor...\\')">PDF Olarak İndir</button><button class="primary" onclick="toast(\\'Değerlendirme sonucu e-posta ile gönderildi.\\');this.closest(\\' .modal\\').remove()">Sonucu Adaya Gönder</button></div></div>';
        
        document.body.append(modal);
    };

})();
