const fs = require('fs');

const jsCode = `(function() {
    const originalReportDetailPage = window.reportDetailPage;
    
    window.reportDetailPage = function() {
        const r = candidateResults[state.reportIndex];
        if (!r) { go('results'); return ''; }

        const scoreColor = r.score >= 80 ? '#22c55e' : r.score >= 50 ? '#f59e0b' : '#ef4444';
        const badgeColor = r.score >= 80 ? '#dcfce3' : r.score >= 50 ? '#fef3c7' : '#fee2e2';
        const badgeTextColor = r.score >= 80 ? '#15803d' : r.score >= 50 ? '#b45309' : '#b91c1c';
        const scoreText = r.score >= 80 ? 'Yüksek Skor' : r.score >= 50 ? 'Beklenebilir' : 'Yetkin Olmayan';

        let newHtml = '<div style="background: #0f172a; padding: 15px 30px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1e293b;">' +
            '<button onclick="go(\\'results\\')" style="background: transparent; border: none; color: white; font-size: 16px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px;">' +
                '<span style="font-size: 20px;">←</span> ' + r.name.split(' ')[0] + ' ' + r.name.split(' ').slice(1).join(' ').toLowerCase() +
            '</button>' +
            '<button style="background: #4f46e5; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-size: 14px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px;">' +
                '🖨️ Yazdır / PDF' +
            '</button>' +
        '</div>' +
        '<div style="padding: 30px; background: #f8fafc; min-height: calc(100vh - 120px);">' +
            '<div style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 40px; display: flex; gap: 40px; align-items: center; margin-bottom: 30px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">' +
                '<div style="flex: 0 0 300px;">' +
                    '<h1 style="margin: 0 0 5px 0; font-size: 32px; color: #0f172a;">' + r.name + '</h1>' +
                    '<p style="margin: 0 0 20px 0; color: #64748b; font-size: 16px;">' + r.email + '</p>' +
                    '<div style="display: flex; flex-direction: column; gap: 10px;">' +
                        '<div style="background: #f1f5f9; padding: 8px 16px; border-radius: 20px; font-size: 13px; color: #334155; display: inline-block; width: max-content;">Sektör: ' + r.detail + '</div>' +
                        '<div style="background: #f1f5f9; padding: 8px 16px; border-radius: 20px; font-size: 13px; color: #334155; display: inline-block; width: max-content;">Rol: ' + r.test + '</div>' +
                    '</div>' +
                '</div>' +
                '<div style="flex: 0 0 150px; text-align: center; border-left: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; padding: 0 20px;">' +
                    '<span style="font-size: 12px; font-weight: 700; color: #64748b; display: block; margin-bottom: 10px;">GENEL SKOR</span>' +
                    '<strong style="font-size: 64px; color: #0f172a; line-height: 1; display: block; margin-bottom: 15px;">%' + r.score + '</strong>' +
                    '<span style="display: inline-block; padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: 700; background: ' + badgeColor + '; color: ' + badgeTextColor + ';">' + scoreText + '</span>' +
                '</div>' +
                '<div style="flex: 1; padding-left: 20px;">' +
                    '<span style="font-size: 12px; font-weight: 700; color: #64748b; display: block; margin-bottom: 15px; text-align: center;">DEĞERLENDİRME SONUCU</span>' +
                    '<p style="font-size: 22px; font-weight: 700; color: #4ade80; text-align: center; line-height: 1.4; margin: 0;">' + r.summary + '</p>' +
                '</div>' +
            '</div>' +
            '<div style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 30px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); margin-bottom: 30px;">' +
                '<div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 30px;">' +
                    '<div>' +
                        '<h2 style="margin: 0 0 5px 0; font-size: 20px; color: #0f172a;">Yetkinlik Ölçüm & Radar Analizi</h2>' +
                        '<p style="margin: 0; color: #64748b; font-size: 14px;">Kategori bazlı radar grafik ve hedef & mevcut durum analizi</p>' +
                    '</div>' +
                    '<div style="display: flex; gap: 5px;">' +
                        '<button style="background: #4f46e5; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer;">Genel Özet</button>' +
                        '<button style="background: transparent; color: #64748b; border: none; padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer;">BİLİŞSEL</button>' +
                        '<button style="background: transparent; color: #64748b; border: none; padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer;">TEKNİK</button>' +
                        '<button style="background: transparent; color: #64748b; border: none; padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer;">TEMEL</button>' +
                        '<button style="background: transparent; color: #64748b; border: none; padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer;">YÖNETSEL</button>' +
                        '<button style="background: transparent; color: #64748b; border: none; padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer;">FONKSİYONEL</button>' +
                    '</div>' +
                '</div>' +
                '<div style="display: grid; grid-template-columns: 1fr 2fr; gap: 40px;">' +
                    '<div style="background: #f8fafc; border-radius: 12px; padding: 20px; text-align: center; border: 1px solid #e2e8f0; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 300px;">' +
                        '<h3 style="margin: 0 0 20px 0; font-size: 14px; color: #0f172a;">Kategori Bazlı Genel Özet</h3>' +
                        '<div style="position: relative; width: 200px; height: 200px;">' +
                            '<svg viewBox="0 0 100 100" style="width: 100%; height: 100%; overflow: visible;">' +
                                '<polygon points="50,5 95,25 95,75 50,95 5,75 5,25" fill="none" stroke="#cbd5e1" stroke-width="1"/>' +
                                '<polygon points="50,15 85,32 85,68 50,85 15,68 15,32" fill="none" stroke="#e2e8f0" stroke-width="1"/>' +
                                '<polygon points="50,25 75,40 75,60 50,75 25,60 25,40" fill="none" stroke="#e2e8f0" stroke-width="1"/>' +
                                '<line x1="50" y1="50" x2="50" y2="5" stroke="#cbd5e1" stroke-width="1"/>' +
                                '<line x1="50" y1="50" x2="95" y2="25" stroke="#cbd5e1" stroke-width="1"/>' +
                                '<line x1="50" y1="50" x2="95" y2="75" stroke="#cbd5e1" stroke-width="1"/>' +
                                '<line x1="50" y1="50" x2="50" y2="95" stroke="#cbd5e1" stroke-width="1"/>' +
                                '<line x1="50" y1="50" x2="5" y2="75" stroke="#cbd5e1" stroke-width="1"/>' +
                                '<line x1="50" y1="50" x2="5" y2="25" stroke="#cbd5e1" stroke-width="1"/>' +
                                '<polygon points="50,' + (100 - r.score*0.8) + ' ' + (50 + r.score*0.3) + ',' + (50 - r.score*0.2) + ' ' + (50 + r.score*0.4) + ',' + (50 + r.score*0.2) + ' 50,' + (50 + r.score*0.4) + ' ' + (50 - r.score*0.2) + ',' + (50 + r.score*0.3) + ' ' + (50 - r.score*0.4) + ',' + (50 - r.score*0.1) + '" fill="rgba(79, 70, 229, 0.2)" stroke="#4f46e5" stroke-width="2"/>' +
                            '</svg>' +
                            '<span style="position: absolute; top: -20px; left: 50%; transform: translateX(-50%); font-size: 10px; color: #64748b;">BİLİŞSEL</span>' +
                            '<span style="position: absolute; top: 20%; right: -30px; font-size: 10px; color: #64748b;">TEKNİK</span>' +
                            '<span style="position: absolute; bottom: 20%; right: -30px; font-size: 10px; color: #64748b;">TEMEL</span>' +
                            '<span style="position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%); font-size: 10px; color: #64748b;">YÖNETSEL</span>' +
                            '<span style="position: absolute; bottom: 20%; left: -40px; font-size: 10px; color: #64748b;">FONKSİYONEL</span>' +
                            '<span style="position: absolute; top: 20%; left: -30px; font-size: 10px; color: #64748b;">DİĞER</span>' +
                        '</div>' +
                    '</div>' +
                    '<div>' +
                        '<h3 style="margin: 0 0 20px 0; font-size: 14px; color: #0f172a;">Tüm Ölçülen Yetkinlikler</h3>' +
                        '<div style="margin-bottom: 25px;">' +
                            '<div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 8px;">' +
                                '<div>' +
                                    '<strong style="font-size: 14px; color: #0f172a;">Captain / Pilot Operations - Technical</strong>' +
                                    '<span style="font-size: 10px; font-weight: 700; color: #3b82f6; margin-left: 8px;">TEMEL</span>' +
                                '</div>' +
                                '<div style="font-size: 12px; font-weight: 700;">' +
                                    '<span style="color: #4f46e5;">Mevcut: %' + r.score + '</span>' +
                                    '<span style="color: #94a3b8; margin-left: 10px;">Hedef: %60</span>' +
                                '</div>' +
                            '</div>' +
                            '<div style="height: 6px; background: #e2e8f0; border-radius: 3px; position: relative; width: 100%;">' +
                                '<div style="position: absolute; top: 0; left: 0; height: 100%; width: ' + r.score + '%; background: #e11d48; border-radius: 3px;"></div>' +
                                '<div style="position: absolute; top: -2px; left: 60%; height: 10px; width: 2px; background: #ef4444;"></div>' +
                            '</div>' +
                        '</div>' +
                        '<div style="margin-bottom: 25px;">' +
                            '<div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 8px;">' +
                                '<div>' +
                                    '<strong style="font-size: 14px; color: #0f172a;">Stratejik Liderlik ve Problem Çözme</strong>' +
                                    '<span style="font-size: 10px; font-weight: 700; color: #8b5cf6; margin-left: 8px;">YÖNETSEL</span>' +
                                '</div>' +
                                '<div style="font-size: 12px; font-weight: 700;">' +
                                    '<span style="color: #4f46e5;">Mevcut: %' + Math.min(r.score + 15, 100) + '</span>' +
                                    '<span style="color: #94a3b8; margin-left: 10px;">Hedef: %70</span>' +
                                '</div>' +
                            '</div>' +
                            '<div style="height: 6px; background: #e2e8f0; border-radius: 3px; position: relative; width: 100%;">' +
                                '<div style="position: absolute; top: 0; left: 0; height: 100%; width: ' + Math.min(r.score + 15, 100) + '%; background: ' + (Math.min(r.score + 15, 100) >= 70 ? '#22c55e' : '#f59e0b') + '; border-radius: 3px;"></div>' +
                                '<div style="position: absolute; top: -2px; left: 70%; height: 10px; width: 2px; background: #ef4444;"></div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px;">' +
                '<div style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">' +
                    '<h3 style="margin: 0 0 15px 0; font-size: 16px; color: #be123c; display: flex; align-items: center; gap: 8px;">' +
                        '🚨 Hata Dedektörü (Sayfa 6)' +
                    '</h3>' +
                    '<div style="background: #fff1f2; border-radius: 12px; padding: 20px; font-size: 14px; color: #881337; line-height: 1.6;">' +
                        'Adayın yanlış yanıtları incelendiğinde, temel refleks zafiyetleri gözlemlenmektedir. Birincisi, karmaşık teknik sorunlar karşısında hızlıca dış kaynaklara (yeni ekip, danışman) yönelme eğilimi, içsel bilgi birikimini ve ekip potansiyelini yeterince kullanmama veya derinlemesine teknik analize girmeme zafiyetini ortaya koymaktadır. İkincisi, operasyonel sorunları finansal veya yüzeysel iletişim stratejileriyle çözme girişimi, kök nedenlere inme ve kalıcı operasyonel mükemmelliği hedefleme eksikliğini göstermektedir. Üçüncüsü, ekip motivasyonunu artırma ve baskı altında kişisel dayanıklılığı koruma konusunda yetersiz stratejiler sergilemesi, liderlik ve öz yönetim becerilerindeki boşluklara işaret etmektedir. Bu zafiyetler, özellikle havacılık gibi teknik ve operasyonel mükemmelliğin kritik olduğu bir sektörde ciddi liderlik riskleri oluşturmaktadır.' +
                    '</div>' +
                '</div>' +
                '<div style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">' +
                    '<h3 style="margin: 0 0 15px 0; font-size: 16px; color: #1e293b; display: flex; align-items: center; gap: 8px;">' +
                        '📊 Kıyaslama (Sayfa 8)' +
                    '</h3>' +
                    '<div style="background: #f8fafc; border-radius: 12px; padding: 20px; font-size: 14px; color: #475569; line-height: 1.6; border: 1px solid #e2e8f0;">' +
                        'Havacılık sektöründe bir CEO pozisyonu için ideal profil, teknik operasyonel mükemmelliğe derinlemesine odaklanma, içsel kaynakları etkin kullanma, stratejik iletişim ve kriz yönetimi becerilerini bir arada barındırmalıdır. Adayın %20\\'lik başarı skoru ve yanıtlarındaki dışsallaştırma eğilimi, bu ideal profilden önemli ölçüde uzak olduğunu göstermektedir. Özellikle operasyonel sorunların kök nedenlerine inme, ekibi motive etme ve paydaşlarla şeffaf, çözüm odaklı iletişim kurma konularında belirgin zayıflıklar taşımaktadır.' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 30px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); margin-bottom: 30px; border-top: 4px solid #22c55e;">' +
                '<h2 style="margin: 0 0 20px 0; font-size: 22px; color: #0f172a;">Nihai Mentor Kararı (Sayfa 9)</h2>' +
                '<p style="margin: 0; font-size: 15px; color: #334155; line-height: 1.8;">' +
                    'Adayın "Kaptan / Pilot Operasyonları - Teknik" yetkinliğindeki zayıf performansı göz önüne alındığında, aşağıdaki 30 günlük gelişim yol haritası önerilir: İlk 10 gün, havacılık mühendisliği ve operasyonel süreçler hakkında temel bilgilere odaklanılmalı, özellikle "ağırlık ve kütle dağılımı" gibi kritik teknik raporlar incelenmeli ve mühendislik ekipleriyle düzenli bilgi paylaşım toplantılarına katılım sağlanmalıdır. Sonraki 10 gün, kriz yönetimi ve kök neden analizi teknikleri üzerine yoğunlaşılmalı, vaka çalışmaları üzerinden karmaşık teknik sorunlara içsel ve bütünsel çözüm yaklaşımları geliştirilmelidir. Son 10 gün ise, ekip motivasyonu, şeffaf iletişim ve paydaş yönetimi konularında liderlik eğitimleri alınmalı, ayrıca kişisel dayanıklılığı artırmak için stres yönetimi ve zaman yönetimi teknikleri üzerinde çalışılmalıdır. Havacılık güvenliği standartları ve sektördeki teknolojik gelişmeler hakkında düzenli okumalar ve uzmanlarla pratik çalışmalarla desteklenmelidir.' +
                '</p>' +
            '</div>';

        if (r.detailedReport && r.detailedReport.length > 0) {
            newHtml += '<div style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 30px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">' +
                '<h2 style="margin: 0 0 20px 0; font-size: 20px; color: #0f172a;">Detaylı Soru & Cevap Analizi</h2>' +
                '<div style="display: flex; flex-direction: column; gap: 15px;">';
            r.detailedReport.forEach(function(q, idx) {
                newHtml += '<div style="background:#f8fafc; padding:20px; border-radius:12px; border: 1px solid #e2e8f0;">' +
                    '<strong style="color:#0f172a; display:block; margin-bottom:10px; font-size: 15px;">Soru ' + (idx+1) + ': ' + q.question + '</strong>' +
                    '<p style="margin:0 0 15px 0; color:#334155; font-size:14px; line-height: 1.5;"><strong>Adayın Cevabı:</strong> ' + (q.answer || '<em style="color:#94a3b8">Boş bırakılmış</em>') + '</p>' +
                    '<div style="display: flex; align-items: center; gap: 15px;">' +
                        '<span style="display:inline-block; padding:6px 12px; border-radius:6px; font-size:12px; font-weight:700; ' +
                            (q.status==='positive'?'background:#dcfce3;color:#16a34a;':(q.status==='negative'?'background:#fee2e2;color:#dc2626;':'background:#e2e8f0;color:#64748b;')) + '">' +
                            (q.status==='positive'?'✅ Olumlu / Doğru':(q.status==='negative'?'❌ Olumsuz / Yanlış':'⚪ Boş')) +
                        '</span>' +
                        '<span style="font-size:12px; color:#64748b; font-weight: 600;">🕒 ' + q.seconds + ' saniye</span>' +
                    '</div>' +
                '</div>';
            });
            newHtml += '</div></div>';
        }

        newHtml += '</div>';
        
        return layout(newHtml, 'Detaylı Rapor - ' + r.name);
    };
})();
`;

fs.writeFileSync('dist/patch9.js', jsCode);
console.log('Saved patch9.js');
