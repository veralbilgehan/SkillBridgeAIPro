// ==========================================
// FORMDAN VAKA YARAT — KULLANICI TANIMLI EKLEME (+ Ekle)
// Eklenen değerler localStorage'da kalıcı saklanır ve DATABANK'a birleştirilir.
// ==========================================
(function () {
  if (!window.DATABANK || typeof window.updateDbChain !== 'function') return;

  const STORE_KEY = 'sb_custom_definitions_v1';
  const load = () => {
    try { const d = JSON.parse(localStorage.getItem(STORE_KEY) || '{}'); return { bank: d.bank || {}, global: d.global || {} }; }
    catch (e) { return { bank: {}, global: {} }; }
  };
  const save = (d) => localStorage.setItem(STORE_KEY, JSON.stringify(d));
  const merge = window.sbMergeDatabank || ((t, s) => t);
  const esc = (v) => String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  let custom = load();
  merge(window.DATABANK, custom.bank);

  const FIELDS = [
    { id: 'pb-sector', key: 'sector', label: 'Sektör' },
    { id: 'pb-subsector', key: 'subsector', label: 'Alt Sektör', needs: 1 },
    { id: 'pb-position', key: 'positions', label: 'Pozisyon', needs: 2 },
    { id: 'pb-level', key: 'levels', label: 'Kıdem / Seviye', global: true },
    { id: 'pb-function', key: 'functions', label: 'Fonksiyon', needs: 2 },
    { id: 'pb-expertise', key: 'expertises', label: 'Uzmanlık Alanı', needs: 2 },
    { id: 'pb-department', key: 'departments', label: 'Departman', needs: 2 },
    { id: 'pb-certificate', key: 'certificates', label: 'Sertifika', needs: 2 },
    { id: 'pb-difficulty', key: 'difficulties', label: 'Zorluk Seviyesi', global: true },
    { id: 'pb-duration', key: 'durations', label: 'Vaka Çözüm Süresi', global: true }
  ];

  const $ = (id) => document.getElementById(id);
  const val = (id) => ($(id) ? $(id).value : '');
  const multi = (id) => ($(id) ? Array.from($(id).selectedOptions).map((o) => o.value) : []);
  const hasOpt = (el, v) => el && Array.from(el.options).some((o) => o.value === v);
  const ensureOpt = (el, v) => { if (el && v && !hasOpt(el, v)) el.insertAdjacentHTML('beforeend', `<option value="${esc(v)}">${esc(v)}</option>`); };
  const setVal = (id, v) => { const el = $(id); if (el && v && hasOpt(el, v)) el.value = v; };
  const setMulti = (id, vals) => { const el = $(id); if (!el) return; const set = new Set(vals); Array.from(el.options).forEach((o) => { o.selected = set.has(o.value); }); };

  // Fonksiyon listesine DATABANK.functions değerlerini de ekle
  const origChain = window.updateDbChain;
  window.updateDbChain = function (level) {
    origChain(level);
    if (level === 'subsector') {
      const f = $('pb-function'), s = val('pb-sector'), sub = val('pb-subsector');
      const dbF = (window.DATABANK[s] && window.DATABANK[s][sub] && window.DATABANK[s][sub].functions) || [];
      if (f && dbF.length) {
        const existing = Array.from(f.options).map((o) => o.value).filter((v) => v && v !== 'Genel Operasyon');
        const all = Array.from(new Set([...dbF, ...existing]));
        f.innerHTML = '<option value="">Fonksiyon Seçiniz</option>' + all.map((v) => `<option value="${esc(v)}">${esc(v)}</option>`).join('');
        f.disabled = false;
      }
      if (typeof window.updateDbPrompt === 'function') window.updateDbPrompt();
    }
  };

  const applyGlobals = () => {
    FIELDS.filter((f) => f.global).forEach((f) => (custom.global[f.key] || []).forEach((v) => ensureOpt($(f.id), v)));
  };

  // Seçimleri koruyarak zinciri yeniden kur
  const rebuild = (selectAfter) => {
    const snap = {
      sector: val('pb-sector'), sub: val('pb-subsector'), pos: val('pb-position'), func: val('pb-function'),
      exp: multi('pb-expertise'), dep: multi('pb-department'), cert: multi('pb-certificate')
    };
    Object.assign(snap, selectAfter.single || {});
    window.updateDbChain('init');
    setVal('pb-sector', snap.sector);
    if (snap.sector) { window.updateDbChain('sector'); setVal('pb-subsector', snap.sub); }
    if (snap.sector && snap.sub) {
      window.updateDbChain('subsector');
      if (snap.func) { setVal('pb-function', snap.func); window.updateDbChain('function'); }
      setVal('pb-position', snap.pos);
      setMulti('pb-expertise', [...snap.exp, ...(selectAfter.expertises || [])]);
      setMulti('pb-department', [...snap.dep, ...(selectAfter.departments || [])]);
      setMulti('pb-certificate', [...snap.cert, ...(selectAfter.certificates || [])]);
    }
    if (typeof window.updateDbPrompt === 'function') window.updateDbPrompt();
  };

  const addValues = (field, values) => {
    const s = val('pb-sector'), sub = val('pb-subsector');
    if (field.needs >= 1 && !s) return toastMsg('Önce bir Sektör seçin.');
    if (field.needs >= 2 && !sub) return toastMsg('Önce bir Alt Sektör seçin.');

    if (field.global) {
      const list = (custom.global[field.key] = custom.global[field.key] || []);
      values.forEach((v) => { if (!list.includes(v)) list.push(v); ensureOpt($(field.id), v); });
      save(custom);
      $(field.id).value = values[values.length - 1];
      if (typeof window.updateDbPrompt === 'function') window.updateDbPrompt();
      return toastMsg(`${values.length} ${field.label} eklendi.`);
    }

    const patch = {};
    if (field.key === 'sector') values.forEach((v) => { patch[v] = {}; });
    else if (field.key === 'subsector') { patch[s] = {}; values.forEach((v) => { patch[s][v] = {}; }); }
    else { patch[s] = { [sub]: { [field.key]: values } }; }

    // Sadece-sektör / sadece-alt sektör eklemeleri için boş nesneleri koru
    Object.keys(patch).forEach((sec) => {
      custom.bank[sec] = custom.bank[sec] || {};
      window.DATABANK[sec] = window.DATABANK[sec] || {};
      Object.keys(patch[sec]).forEach((ss) => {
        custom.bank[sec][ss] = custom.bank[sec][ss] || {};
        window.DATABANK[sec][ss] = window.DATABANK[sec][ss] || {};
      });
    });
    merge(custom.bank, patch);
    merge(window.DATABANK, patch);
    save(custom);

    const last = values[values.length - 1];
    const after = { single: {} };
    if (field.key === 'sector') Object.assign(after.single, { sector: last, sub: '', pos: '', func: '' });
    else if (field.key === 'subsector') Object.assign(after.single, { sub: last, pos: '', func: '' });
    else if (field.key === 'positions') after.single.pos = last;
    else if (field.key === 'functions') after.single.func = last;
    else after[field.key] = values;
    rebuild(after);
    toastMsg(`${values.length} ${field.label} eklendi ve kaydedildi.`);
  };

  const toastMsg = (m) => (typeof window.toast === 'function' ? window.toast(m) : alert(m));

  // ---------- Modal ----------
  const openModal = (field) => {
    const s = val('pb-sector'), sub = val('pb-subsector');
    if (field.needs >= 1 && !s) return toastMsg('Önce bir Sektör seçin.');
    if (field.needs >= 2 && !sub) return toastMsg('Önce bir Alt Sektör seçin.');
    closeModal();
    const ctx = field.global ? 'Tüm vakalarda kullanılabilir' : field.needs === 2 ? `${s} › ${sub}` : field.needs === 1 ? s : 'Ana sektör listesi';
    const wrap = document.createElement('div');
    wrap.className = 'def-modal-backdrop';
    wrap.innerHTML = `<div class="def-modal" role="dialog" aria-modal="true" aria-labelledby="def-modal-title">
      <span class="eyebrow">TANIM EKLE</span>
      <h3 id="def-modal-title">Yeni ${esc(field.label)}</h3>
      <p class="def-modal-ctx">${esc(ctx)}</p>
      <textarea id="def-modal-input" rows="3" placeholder="Bir veya birden fazla değer yazın. Birden fazlası için virgül ya da yeni satır kullanın."></textarea>
      <div class="def-modal-actions">
        <button type="button" class="secondary" id="def-modal-cancel">İptal</button>
        <button type="button" class="primary" id="def-modal-save">Ekle</button>
      </div></div>`;
    document.body.appendChild(wrap);
    const input = $('def-modal-input');
    const submit = () => {
      const values = Array.from(new Set(input.value.split(/[,\n]/).map((v) => v.trim().replace(/\s+/g, ' ')).filter(Boolean))).map((v) => v.slice(0, 120));
      if (!values.length) { input.focus(); return; }
      closeModal();
      addValues(field, values);
    };
    $('def-modal-cancel').onclick = closeModal;
    $('def-modal-save').onclick = submit;
    wrap.addEventListener('mousedown', (e) => { if (e.target === wrap) closeModal(); });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(); }
      if (e.key === 'Escape') closeModal();
    });
    setTimeout(() => input.focus(), 30);
  };
  const closeModal = () => document.querySelectorAll('.def-modal-backdrop').forEach((n) => n.remove());

  // ---------- Butonları yerleştir ----------
  const enhance = () => {
    if (!$('pb-sector')) return;
    applyGlobals();
    FIELDS.forEach((field) => {
      const el = $(field.id);
      const label = el && el.closest('label');
      if (!label || label.querySelector('.def-add-btn')) return;
      const span = label.querySelector('span');
      if (!span) return;
      span.classList.add('def-label-row');
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'def-add-btn';
      btn.id = 'def-add-' + field.id.replace('pb-', '');
      btn.title = `Yeni ${field.label} ekle`;
      btn.textContent = '+ Ekle';
      btn.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); openModal(field); });
      span.appendChild(btn);
    });
  };

  // ---------- Stil ----------
  const style = document.createElement('style');
  style.textContent = `
    .def-label-row{display:flex!important;align-items:center;justify-content:space-between;gap:8px}
    .def-add-btn{font:600 11px/1 inherit;padding:4px 9px;border-radius:999px;border:1px solid rgba(91,143,99,.35);background:linear-gradient(180deg,#f4faf5,#e8f3ea);color:#4f8a5a;cursor:pointer;transition:all .18s ease;white-space:nowrap;letter-spacing:.2px;text-transform:none}
    .def-add-btn:hover{background:#5b8f63;color:#fff;border-color:#5b8f63;transform:translateY(-1px);box-shadow:0 4px 10px rgba(91,143,99,.25)}
    .def-modal-backdrop{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;background:rgba(15,23,42,.38);backdrop-filter:blur(4px);animation:defFade .16s ease}
    .def-modal{width:min(440px,92vw);background:#fff;border-radius:18px;padding:24px;box-shadow:0 24px 60px rgba(15,23,42,.25);animation:defPop .2s cubic-bezier(.2,.9,.3,1.2)}
    .def-modal h3{margin:6px 0 4px;color:#4f8a5a}
    .def-modal-ctx{margin:0 0 14px;font-size:13px;color:#64748b}
    .def-modal textarea{width:100%;box-sizing:border-box;padding:12px;border-radius:12px;border:1px solid #d7e3d9;font:inherit;resize:vertical;outline:none;transition:border-color .15s,box-shadow .15s}
    .def-modal textarea:focus{border-color:#5b8f63;box-shadow:0 0 0 3px rgba(91,143,99,.15)}
    .def-modal-actions{display:flex;justify-content:flex-end;gap:10px;margin-top:16px}
    @keyframes defFade{from{opacity:0}to{opacity:1}}
    @keyframes defPop{from{opacity:0;transform:translateY(8px) scale(.97)}to{opacity:1;transform:none}}`;
  document.head.appendChild(style);

  const prevRender = window.render;
  window.render = function () {
    const r = prevRender.apply(this, arguments);
    try { if (typeof state !== 'undefined' && state.page === 'prompt') enhance(); } catch (e) { console.error(e); }
    return r;
  };
  try { if (typeof state !== 'undefined' && state.page === 'prompt') { window.updateDbChain('init'); enhance(); } } catch (e) {}

  window.sbCustomDefinitions = {
    list: () => load(),
    reset: () => { localStorage.removeItem(STORE_KEY); location.reload(); }
  };
})();
