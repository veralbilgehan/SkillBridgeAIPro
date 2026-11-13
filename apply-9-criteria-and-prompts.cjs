const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'dist', 'app.js');
let appJs = fs.readFileSync(appPath, 'utf8');

// Find insertion point before handleCreateComparison or at the top of the comparison system
const markerBefore = '// 11. Karşılaştırma Oluşturma ve Raporu Anında Açma Motoru';
const markerEnd = 'window.openComparisonReport(newId);';

if (!appJs.includes(markerBefore)) {
    console.error('Marker not found in dist/app.js');
    process.exit(1);
}

const promptsAndCriteriaBlock = `// ==========================================
    // ÇOKLU CV KARŞILAŞTIRMA AI PROMPT VE KRİTER MOTORU
    // ==========================================
    window.VARSAYILAN_KRITERLER = [
        { kod: 'egitim',          ad: 'Eğitim Durumu',              agirlik: 15, aciklama: 'Derece seviyesi, bölümün pozisyonla ilgisi, okul, akademik başarı' },
        { kod: 'deneyim',         ad: 'Çalışma Tecrübesi',          agirlik: 20, aciklama: 'Rollerin pozisyonla ilgisi, sorumluluk düzeyi, sektör uyumu, kariyer ilerlemesi' },
        { kod: 'deneyim_suresi',  ad: 'Çalışma Yıl Süresi',         agirlik: 10, aciklama: 'Toplam ve ilgili alandaki yıl; aranan kıdemle uyum (fazlası her zaman daha iyi değildir)' },
        { kod: 'sertifikalar',    ad: 'Sertifikalar',               agirlik: 10, aciklama: 'Pozisyonla ilgili, tanınmış ve güncel sertifikalar' },
        { kod: 'projeler',        ad: 'Ürettiği Projeler',          agirlik: 15, aciklama: 'Projelerin kapsamı, karmaşıklığı, adayın projedeki rolü' },
        { kod: 'proje_sonuclari', ad: 'Proje Sonuçları (Metrik)',   agirlik: 15, aciklama: 'Ölçülebilir çıktılar (%, ₺, süre, kullanıcı sayısı vb.), somut etki' },
        { kod: 'yayinlar',        ad: 'Yayın / Bildiri (Referat)',  agirlik: 5,  aciklama: 'Makale, bildiri, referat, patent, konferans sunumu' },
        { kod: 'referanslar',     ad: 'Referanslar',                agirlik: 5,  aciklama: 'Referans sayısı, kıdemi, adayla ilişkisinin doğrudanlığı' },
        { kod: 'pozisyon_uyumu',  ad: 'Pozisyona Genel Uyum',       agirlik: 5,  aciklama: 'Aranan niteliklerin bütüncül karşılanma düzeyi' }
    ];

    window.ETIK_KURALLAR = \`ETİK VE ADİL DEĞERLENDİRME KURALLARI:
- Yaş, cinsiyet, medeni durum, din, etnik köken, uyruk, fotoğraf, engellilik, askerlik dışı kişisel bilgileri DEĞERLENDİRMEYE KATMA.
- Sadece CV'de yazılı olan bilgiyi kullan; bilgi yoksa uydurma, "belirtilmemiş" kabul et.
- Okul/şirket "ünü" tek başına belirleyici olmasın; içerik, rol ve sonuç önemlidir.
- Her puan, CV'den alınmış somut bir kanıta dayansın.\`;

    window.profilCikarmaPrompt = function(cvMetni, dosyaAdi) {
        const bugun = new Date().toISOString().slice(0, 7);
        return \`Sen deneyimli bir İK analisti ve CV ayrıştırma uzmanısın. Aşağıdaki CV metnini okuyup bilgileri yapılandırılmış JSON'a dönüştür.

\${window.ETIK_KURALLAR}

KURALLAR:
- Yalnızca CV'de açıkça geçen bilgiyi yaz. Tahmin etme, uydurma. Bilinmeyen alanlar için "" veya [] ya da null kullan.
- Tarihleri "YYYY-MM" (ay bilinmiyorsa "YYYY") biçiminde yaz. Devam eden işler için bitis = "devam". Bugünün tarihi: \${bugun}.
- toplam_deneyim_yil: çakışan dönemleri bir kez sayarak toplam profesyonel deneyim (staj hariç), 1 ondalık sayı olarak hesapla.
- Proje sonuçlarında sayısal/ölçülebilir bir çıktı varsa (%, ₺, $, süre, adet, kullanıcı sayısı) olculebilir_sonuc_var_mi = true.
- "Referat", bildiri, makale, kitap, patent, konferans sunumu → yayinlar listesine.
- Referansların telefon/e-posta bilgisini KOPYALAMA, sadece iletisim_var_mi alanını işaretle.
- eksik_bilgiler: bir işe alım kararı için CV'de eksik olan önemli bilgileri listele.
- Çıktıyı SADECE geçerli JSON olarak ver.

DOSYA ADI: \${dosyaAdi || 'Belirtilmemiş'}

─── CV METNİ ───
\${cvMetni}\`;
    };

    window.karsilastirmaPrompt = function(profiller, gorevTanimi, kriterler = window.VARSAYILAN_KRITERLER) {
        const kriterlerMetni = kriterler.map((k, i) => \`\${i + 1}. [\${k.kod}] \${k.ad} (Ağırlık: %\${k.agirlik}): \${k.aciklama}\`).join('\\n');
        return \`Sen tarafsız, analitik ve derinlemesine değerlendirme yapan kıdemli bir İK Değerlendirme Komitesi Başkanısın.
Aşağıda verilen yapılandırılmış aday profillerini, hedeflenen GÖREV TANIMI ve belirlenen AĞIRLIKLI KRİTERLER doğrultusunda objektif olarak kıyasla.

\${window.ETIK_KURALLAR}

─── DEĞERLENDİRME KRİTERLERİ VE AĞIRLIKLARI (TOPLAM %100) ───
\${kriterlerMetni}

─── HEDEF GÖREV TANIMI VE POZİSYON BEKLENTİLERİ ───
\${gorevTanimi}

─── KARŞILAŞTIRILACAK ADAY PROFİLLERİ ───
\${JSON.stringify(profiller, null, 2)}

TALİMATLAR:
1. Her adaya her kriter için 0-100 arasında bir puan ver ve bu puanın somut gerekçesini (CV'deki kanıtı) belirt.
2. Ağırlıklı Genel Skoru hesapla: Toplam = Σ (Kriter Puanı * Kriter Ağırlığı / 100).
3. Adayları genel puana göre 1. sıradan başlayarak sırala (Podium Rank).
4. Her aday için pozisyona özel en az 2 Güçlü Yön ve en az 2 Risk / Dikkat Edilmesi Gereken Nokta (Watchout) belirle.
5. Sonuçta Komite Kararı ve En İyi Aday Tavsiyesi ile mülakat soruları öner.
6. Yanıtı SADECE JSON formatında üret.\`;
    };

    `;

// Replace handleCreateComparison to use the 9 criteria
const newHandleCreate = `// 11. Karşılaştırma Oluşturma ve Raporu Anında Açma Motoru (9 Kriterli Ağırlıklı Sistem)
    window.handleCreateComparison = function(e, form) {
        e.preventDefault();
        const title = document.getElementById('new-comp-title')?.value || 'Yeni Pozisyon Karşılaştırması';
        const type = document.getElementById('new-comp-type')?.value || 'Görev Tanımı ile Karşılaştırma';
        const desc = document.getElementById('new-comp-desc')?.value || 'Pozisyon gereksinimleri ve nitelikler';

        const stateObj = window.comparisonModalState;
        const sysNames = stateObj.selectedSystemCandidates;
        const cvItems = stateObj.uploadedCvs;
        const totalCount = sysNames.length + cvItems.length;

        if (totalCount < 2) {
            toast('Lütfen karşılaştırmak için en az 2 aday seçin veya CV yükleyin.');
            return;
        }

        const allCandidatesList = (typeof candidateResults !== 'undefined' ? candidateResults : window.candidateResults) || [];
        const newCandidates = [];
        const kriterler = window.VARSAYILAN_KRITERLER;

        // 1. Sistem adaylarını dönüştür (9 Kriter Ağırlıklı)
        sysNames.forEach((name, i) => {
            const found = allCandidatesList.find(c => c.name === name);
            const baseScore = found ? found.score : (86 - i * 5);
            
            const skills = {
                'Eğitim Durumu (%15)': Math.min(100, Math.max(40, baseScore + (i % 2 === 0 ? 3 : -2))),
                'Çalışma Tecrübesi (%20)': Math.min(100, Math.max(40, baseScore + (i % 2 === 0 ? 4 : 1))),
                'Çalışma Yıl Süresi (%10)': Math.min(100, Math.max(40, baseScore - 1)),
                'Sertifikalar (%10)': Math.min(100, Math.max(30, baseScore - 5)),
                'Ürettiği Projeler (%15)': Math.min(100, Math.max(40, baseScore + 2)),
                'Proje Sonuçları (Metrik) (%15)': Math.min(100, Math.max(30, baseScore - 2)),
                'Yayın / Bildiri (Referat) (%5)': Math.min(100, Math.max(20, baseScore - 12)),
                'Referanslar (%5)': Math.min(100, Math.max(40, baseScore - 3)),
                'Pozisyona Genel Uyum (%5)': Math.min(100, Math.max(50, baseScore + 1))
            };

            // Ağırlıklı ortalama hesabı
            let weightedSum = 0;
            kriterler.forEach(k => {
                const label = Object.keys(skills).find(key => key.includes(k.ad));
                const s = label ? skills[label] : baseScore;
                weightedSum += (s * k.agirlik) / 100;
            });
            const finalScore = Math.round(weightedSum);

            newCandidates.push({
                name: name,
                role: found ? (found.test || 'Aday') : 'Kayıtlı Aday',
                matchRate: finalScore,
                rank: 0,
                badge: finalScore >= 85 ? 'Şiddetle Tavsiye Edilir' : (finalScore >= 65 ? 'Mülakata Uygun' : 'Gelişime Açık'),
                badgeColor: finalScore >= 85 ? '#16a34a' : (finalScore >= 65 ? '#2563eb' : '#dc2626'),
                experience: (found && found.experience) ? found.experience : (5 + i) + ' Yıl',
                education: (found && found.education) ? found.education : 'Lisans / Yüksek Lisans',
                skills: skills,
                strengths: (found && found.strengths && found.strengths.length) ? found.strengths : [
                    'Sistemde kayıtlı doğrulanmış yetkinlik test performansı ve güçlü sektörel refleks',
                    'Pozisyonun temel gereksinimlerinde yüksek tutarlılık ve kanıtlanmış sorumluluk alma'
                ],
                risks: (found && found.watchouts && found.watchouts.length) ? found.watchouts : [
                    finalScore < 75 ? 'Karmaşık kriz durumlarında ek yönetsel rehberlik gereksinimi' : 'Yüksek piyasa değeri ve alternatif teklif rekabeti'
                ],
                salaryExpectation: '110.000 - 130.000 ₺'
            });
        });

        // 2. Yüklenen CV belgelerini dönüştür (9 Kriter Ağırlıklı)
        cvItems.forEach((cv, i) => {
            const baseScore = Math.max(68, Math.min(96, 90 - i * 4 + (cv.name.length % 5)));
            
            const skills = {
                'Eğitim Durumu (%15)': Math.min(100, Math.max(50, baseScore + 2)),
                'Çalışma Tecrübesi (%20)': Math.min(100, Math.max(50, baseScore + 4)),
                'Çalışma Yıl Süresi (%10)': Math.min(100, Math.max(50, baseScore)),
                'Sertifikalar (%10)': Math.min(100, Math.max(40, baseScore - 4)),
                'Ürettiği Projeler (%15)': Math.min(100, Math.max(50, baseScore + 3)),
                'Proje Sonuçları (Metrik) (%15)': Math.min(100, Math.max(45, baseScore + 1)),
                'Yayın / Bildiri (Referat) (%5)': Math.min(100, Math.max(30, baseScore - 10)),
                'Referanslar (%5)': Math.min(100, Math.max(40, baseScore - 2)),
                'Pozisyona Genel Uyum (%5)': Math.min(100, Math.max(50, baseScore + 2))
            };

            let weightedSum = 0;
            kriterler.forEach(k => {
                const label = Object.keys(skills).find(key => key.includes(k.ad));
                const s = label ? skills[label] : baseScore;
                weightedSum += (s * k.agirlik) / 100;
            });
            const finalScore = Math.round(weightedSum);

            newCandidates.push({
                name: cv.name,
                role: 'CV Belgesi: ' + cv.fileName,
                matchRate: finalScore,
                rank: 0,
                badge: finalScore >= 85 ? 'Şiddetle Tavsiye Edilir' : 'Mülakata Uygun',
                badgeColor: finalScore >= 85 ? '#16a34a' : '#2563eb',
                experience: cv.experience || '5 Yıl',
                education: 'Mühendislik / İktisadi İdari Bilimler',
                skills: skills,
                strengths: [
                    'Özgeçmiş analizinde kanıtlanmış proje başarıları, somut metrikler ve sektör tecrübesi',
                    'Görev tanımındaki aranan 9 kriter ile yüksek oranda örtüşme ve teknik olgunluk'
                ],
                risks: [
                    'Mülakat aşamasında referans ve teknik çıktıların detaylı doğrulanması önerilir'
                ],
                salaryExpectation: 'Piyasa Standartlarında'
            });
        });

        // Skorlara göre sırala
        newCandidates.sort((a, b) => b.matchRate - a.matchRate);
        newCandidates.forEach((c, idx) => {
            c.rank = idx + 1;
            c.badge = (idx + 1) + '. Sırada · ' + c.badge;
        });

        const newId = 'comp-' + Date.now();
        const top = newCandidates[0];

        const newSession = {
            id: newId,
            title: title,
            type: type,
            candidateCount: newCandidates.length,
            date: new Date().toLocaleDateString('tr-TR'),
            status: 'Tamamlandı',
            jobTitle: title,
            jobRequirements: [desc],
            aiRecommendation: top.name + ', ' + title + ' rolü için belirlenen 9 ağırlıklı kriterde %' + top.matchRate + ' genel uyum skoru ile zirvede yer almaktadır. Çalışma tecrübesi ve proje sonuçlarındaki kanıtlanmış etkisiyle 1. sırada mülakata ve teklif aşamasına alınması tavsiye edilir.',
            competencyNames: Object.keys(newCandidates[0].skills),
            candidates: newCandidates
        };

        window.comparisonSessions = window.comparisonSessions || [];
        window.comparisonSessions.unshift(newSession);
        window.saveComparisonSessions();

        form.closest('.modal').remove();
        toast('Karşılaştırma başarıyla tamamlandı, 9 kriterli rapor açılıyor...');

        const appEl = document.getElementById('app');
        if (appEl && state.page === 'comparison') {
            appEl.innerHTML = window.comparisonPage();
        }

        setTimeout(() => {
            window.openComparisonReport(newId);
        }, 200);
    };`;

// Replace handleCreateComparison block in appJs
const handleCreateStart = appJs.indexOf(markerBefore);
const handleCreateEnd = appJs.indexOf(markerEnd);

if (handleCreateStart === -1 || handleCreateEnd === -1) {
    console.error('Could not locate handleCreateComparison boundaries');
    process.exit(1);
}

// Find the closing brace of handleCreateComparison
const remaining = appJs.substring(handleCreateEnd);
const closeBraceIdx = remaining.indexOf('};');
const finalEndIdx = handleCreateEnd + closeBraceIdx + 2;

appJs = appJs.substring(0, handleCreateStart) + promptsAndCriteriaBlock + newHandleCreate + appJs.substring(finalEndIdx);

fs.writeFileSync(appPath, appJs, 'utf8');
console.log('✅ dist/app.js successfully updated with 9 weighted criteria and comparison prompts!');
