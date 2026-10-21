/* ================================================================
   🤖 CHATBOT DEL REPOSITORIO
   Se agrega con:  <script src="chatbot.js"></script>
   (justo antes de </body>, DESPUÉS del <script> principal)
   Funciona sin servidor: usa la lista `archivos` y `UNIDADES`
   que ya carga tu página desde GitHub.
   ================================================================ */
(function () {
  'use strict';

  /* ---------- Estilos ---------- */
  const css = `
  .cb-fab{position:fixed;right:22px;bottom:22px;z-index:150;width:58px;height:58px;border-radius:18px;border:0;cursor:pointer;
    display:grid;place-items:center;color:#fff;background:linear-gradient(135deg,var(--a1),var(--a2));
    box-shadow:0 14px 36px rgba(124,92,255,.5);transition:transform .25s}
  .cb-fab:hover{transform:translateY(-3px) scale(1.04)}
  .cb-fab svg{width:26px;height:26px}
  .cb-panel{position:fixed;right:22px;bottom:94px;z-index:150;width:min(390px,calc(100vw - 28px));height:min(580px,calc(100vh - 120px));
    display:none;flex-direction:column;overflow:hidden;background:var(--bg);border:1px solid var(--border-2);border-radius:22px;
    box-shadow:0 30px 80px rgba(0,0,0,.55)}
  .cb-panel.open{display:flex;animation:subirModal .3s cubic-bezier(.2,.8,.2,1)}
  .cb-head{display:flex;align-items:center;gap:12px;padding:14px 16px;border-bottom:1px solid var(--border);background:var(--surface-2)}
  .cb-ava{width:36px;height:36px;border-radius:11px;display:grid;place-items:center;color:#fff;background:linear-gradient(135deg,var(--a1),var(--a2))}
  .cb-ava svg{width:19px;height:19px}
  .cb-title{flex:1;line-height:1.2}
  .cb-title b{font-family:'Space Grotesk',sans-serif;font-size:.95rem;display:block}
  .cb-title small{color:var(--ok);font-size:.72rem;font-weight:600}
  .cb-x{width:32px;height:32px;border-radius:9px;border:1px solid var(--border);background:transparent;color:var(--muted);cursor:pointer;display:grid;place-items:center}
  .cb-x:hover{color:var(--text);background:var(--surface-2)}
  .cb-x svg{width:15px;height:15px}
  .cb-msgs{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px}
  .cb-m{max-width:88%;padding:10px 14px;border-radius:16px;font-size:.86rem;line-height:1.5;animation:aparecer .3s ease both;word-wrap:break-word}
  .cb-m.bot{align-self:flex-start;background:var(--surface-2);border:1px solid var(--border);border-bottom-left-radius:5px}
  .cb-m.user{align-self:flex-end;color:#fff;background:linear-gradient(135deg,var(--a1),var(--a2));border-bottom-right-radius:5px}
  .cb-m a.cb-link{color:var(--a2);font-weight:600}
  .cb-files{display:flex;flex-direction:column;gap:6px;margin-top:9px}
  .cb-f{display:flex;align-items:center;gap:9px;padding:7px 9px;border-radius:11px;background:var(--surface);border:1px solid var(--border)}
  .cb-f .ext{width:32px;height:32px;border-radius:9px;font-size:.55rem}
  .cb-f span.n{flex:1;min-width:0;font-size:.76rem;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .cb-f .accion{width:28px;height:28px}
  .cb-acts{display:flex;flex-wrap:wrap;gap:6px;margin-top:9px}
  .cb-mini{font-family:inherit;font-size:.74rem;font-weight:600;padding:6px 11px;border-radius:999px;cursor:pointer;
    background:var(--surface);border:1px solid var(--border);color:var(--text);transition:.2s}
  .cb-mini:hover{border-color:var(--a1);transform:translateY(-1px)}
  .cb-chips{display:flex;gap:6px;padding:0 16px 10px;overflow-x:auto;flex-shrink:0}
  .cb-chips .cb-mini{white-space:nowrap}
  .cb-form{display:flex;gap:8px;padding:12px;border-top:1px solid var(--border);background:var(--surface)}
  .cb-form input{flex:1;min-width:0;padding:11px 14px;border-radius:12px;border:1px solid var(--border);background:var(--bg);color:var(--text);font-family:inherit;font-size:.86rem;outline:none}
  .cb-form input:focus{border-color:var(--a1);box-shadow:0 0 0 3px rgba(124,92,255,.16)}
  .cb-form button{width:42px;border-radius:12px;border:0;cursor:pointer;color:#fff;display:grid;place-items:center;background:linear-gradient(135deg,var(--a1),var(--a2))}
  .cb-form button svg{width:17px;height:17px}
  .cb-typing{display:flex;gap:4px;padding:13px 14px}
  .cb-typing i{width:6px;height:6px;border-radius:50%;background:var(--muted);animation:cbp 1s infinite}
  .cb-typing i:nth-child(2){animation-delay:.15s}.cb-typing i:nth-child(3){animation-delay:.3s}
  @keyframes cbp{0%,60%,100%{opacity:.3;transform:none}30%{opacity:1;transform:translateY(-4px)}}
  @media(max-width:600px){.cb-fab{right:14px;bottom:14px}.cb-panel{right:14px;bottom:82px}}
  `;
  const st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  /* ---------- HTML ---------- */
  const ICON_BOT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="12" rx="3"/><path d="M12 8V4"/><circle cx="12" cy="3" r="1"/><circle cx="9" cy="14" r="1"/><circle cx="15" cy="14" r="1"/></svg>';
  const ICON_X = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>';
  const ICON_SEND = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/></svg>';

  const root = document.createElement('div');
  root.innerHTML = `
    <button class="cb-fab" id="cbFab" type="button" aria-label="Abrir asistente">${ICON_BOT}</button>
    <section class="cb-panel" id="cbPanel" aria-label="Asistente del repositorio">
      <div class="cb-head">
        <div class="cb-ava">${ICON_BOT}</div>
        <div class="cb-title"><b>Asistente del repositorio</b><small>● en línea</small></div>
        <button class="cb-x" id="cbClose" type="button" aria-label="Cerrar">${ICON_X}</button>
      </div>
      <div class="cb-msgs" id="cbMsgs"></div>
      <div class="cb-chips" id="cbChips"></div>
      <form class="cb-form" id="cbForm">
        <input id="cbInput" type="text" placeholder="Escribe: buscar informe, unidad 1…" autocomplete="off" aria-label="Mensaje" />
        <button type="submit" aria-label="Enviar">${ICON_SEND}</button>
      </form>
    </section>`;
  document.body.appendChild(root);

  const $ = (id) => document.getElementById(id);
  const fab = $('cbFab'), panel = $('cbPanel'), msgs = $('cbMsgs'), input = $('cbInput');

  /* ---------- Utilidades ---------- */
  const norm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  const esc = (s) => escaparHTML(s);
  const ROMAN = { i: 1, ii: 2, iii: 3, iv: 4 };

  const TIPOS_NOMBRE = {
    pdf: ['PDF', 'pdf'], doc: ['documentos Word', 'doc'], xls: ['hojas de cálculo', 'xls'],
    ppt: ['presentaciones', 'ppt'], img: ['imágenes', 'img'], vid: ['videos', 'vid'],
    aud: ['audios', 'aud'], code: ['archivos de código/texto', 'code'], zip: ['comprimidos', 'zip']
  };

  function etiquetaSemana(id) {
    for (const u of UNIDADES) {
      const s = u.semanas.find((x) => x.id === id);
      if (s) return `${u.titulo} · ${s.titulo}`;
    }
    return id;
  }

  function parseUS(t) {
    let u = null, s = null, m = t.match(/\bu(\d)\s*s(\d)\b/);
    if (m) { u = +m[1]; s = +m[2]; }
    else {
      m = t.match(/unidad\s*(iv|iii|ii|i|\d)\b/);
      if (m) u = ROMAN[m[1]] || +m[1];
      m = t.match(/semana\s*(\d)/);
      if (m) s = +m[1];
    }
    return { u, s };
  }

  function semanasDe(u, s) {
    return UNIDADES.flatMap((un, i) =>
      (!u || i + 1 === u) ? un.semanas.filter((_, j) => !s || j + 1 === s) : []
    );
  }

  /* ---------- Render ---------- */
  function addMsg(html, who) {
    const d = document.createElement('div');
    d.className = 'cb-m ' + who;
    d.innerHTML = html;
    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
    return d;
  }

  function fileCards(lista, limite = 8) {
    const mostrar = lista.slice(0, limite);
    let h = '<div class="cb-files">' + mostrar.map((a) => {
      const cat = categoriaDe(a.ext);
      return `<div class="cb-f">
        <div class="ext ext-${cat}">${etiquetaDe(a.ext)}</div>
        <span class="n" title="${esc(a.nombre)}">${esc(a.nombre)}<br><small style="color:var(--muted)">${esc(etiquetaSemana(a.semana))} · ${formatearPeso(a.peso)}</small></span>
        <button class="accion" type="button" data-ver="${esc(a.ruta)}" title="Visualizar">${SVG.ojo}</button>
        <a class="accion" href="${a.url}" download target="_blank" rel="noopener" title="Descargar">${SVG.bajar}</a>
      </div>`;
    }).join('') + '</div>';
    if (lista.length > limite) h += `<p style="margin-top:8px;color:var(--muted);font-size:.76rem">…y ${lista.length - limite} más. Afina tu búsqueda para verlos.</p>`;
    return h;
  }

  function acciones(items) {
    return '<div class="cb-acts">' + items.map((i) =>
      `<button type="button" class="cb-mini" data-say="${esc(i.say || '')}" data-go="${esc(i.go || '')}">${esc(i.t)}</button>`
    ).join('') + '</div>';
  }

  function responder(html) {
    const t = addMsg('<div class="cb-typing"><i></i><i></i><i></i></div>', 'bot');
    setTimeout(() => { t.innerHTML = html; msgs.scrollTop = msgs.scrollHeight; }, 380);
  }

  /* ---------- Acciones de la página ---------- */
  function irAUnidad(id) {
    const el = document.querySelector(`[data-unidad="${id}"]`);
    if (!el) return;
    el.classList.add('open');
    const head = el.querySelector('[data-toggle]');
    if (head) head.setAttribute('aria-expanded', 'true');
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* ---------- Cerebro del bot ---------- */
  function listarSemanas(u, s) {
    const sems = semanasDe(u, s);
    if (!sems.length) return '❓ No encontré esa unidad o semana. El repositorio tiene 4 unidades de 4 semanas.';
    const ids = sems.map((x) => x.id);
    const lista = archivos.filter((a) => ids.includes(a.semana))
      .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es', { numeric: true }));
    const nombre = s ? etiquetaSemana(ids[0]) : (u ? UNIDADES[u - 1].titulo : 'todas las unidades');
    const botonIr = u ? acciones([{ t: `📍 Ir a ${UNIDADES[u - 1].titulo}`, go: UNIDADES[u - 1].id }]) : '';
    if (!lista.length) return `📂 <b>${esc(nombre)}</b> todavía no tiene archivos.<br>Súbelos a <code>Trabajos/${esc(ids[0])}/</code> en GitHub.` + botonIr;
    return `📂 <b>${esc(nombre)}</b>: ${lista.length} archivo(s).` + fileCards(lista) + botonIr;
  }

  function resumen() {
    const filas = UNIDADES.map((u) => {
      const ids = u.semanas.map((s) => s.id);
      return `• ${esc(u.titulo)}: <b>${archivos.filter((a) => ids.includes(a.semana)).length}</b>`;
    }).join('<br>');
    const porTipo = {};
    archivos.forEach((a) => { const c = categoriaDe(a.ext); porTipo[c] = (porTipo[c] || 0) + 1; });
    const tipos = Object.entries(porTipo).map(([c, n]) => `${(TIPOS_NOMBRE[c] || [c])[0]}: ${n}`).join(' · ') || '—';
    return `📊 Hay <b>${archivos.length}</b> archivos en total.<br>${filas}<br><small style="color:var(--muted)">${tipos}</small>`;
  }

  function buscar(q) {
    const palabras = q.split(/\s+/).filter(Boolean);
    const res = archivos.filter((a) => {
      const n = norm(a.nombre);
      return palabras.every((p) => n.includes(p));
    });
    if (!res.length) return `🔍 No encontré archivos con “${esc(q)}”. Prueba con otra palabra o pide “resumen”.`;
    return `🔍 ${res.length} resultado(s) para “${esc(q)}”:` + fileCards(res);
  }

  function procesar(texto) {
    const t = norm(texto);
    if (!t) return;

    if (/^(hola|buenas|hey|buen dia|buenos dias|buenas tardes|buenas noches|hi)\b/.test(t))
      return responder('¡Hola! 👋 Soy el asistente del repositorio. Puedo buscar archivos, listar unidades y semanas, abrirlos o descargarlos. Escribe <b>ayuda</b> para ver todo.');

    if (/\b(ayuda|help|que puedes|que haces|comandos|opciones|menu)\b/.test(t))
      return responder(`Puedo ayudarte con:<br>
        • 🔎 <b>buscar</b> <i>informe</i> — por nombre<br>
        • 📂 <b>unidad 1</b>, <b>semana 2</b> o <b>u1s3</b> — listar archivos<br>
        • 📄 <b>pdf</b>, <b>word</b>, <b>excel</b>, <b>imágenes</b>… — por tipo<br>
        • 📊 <b>resumen</b> — cuántos archivos hay<br>
        • 🏋️ <b>más pesado</b> — el archivo más grande<br>
        • 🌓 <b>cambiar tema</b> · ✉️ <b>contacto</b> · 🐙 <b>github</b><br>
        • ⬆️ <b>cómo subir</b> un trabajo`);

    if (/\b(tema|modo oscuro|modo claro|oscuro|claro|dark|light)\b/.test(t)) {
      $('btnTema').click();
      return responder('🌓 Listo, cambié el tema de la página.');
    }

    if (/\b(contacto|correo|email|mail|escribir|contactar)\b/.test(t))
      return responder('✉️ Puedes escribirme con el botón <b>Contáctame</b> de la parte superior.' + acciones([{ t: 'Ir al contacto', go: '#contacto' }]));

    if (/\b(github|codigo fuente|repo)\b/.test(t) && !/buscar|busca/.test(t))
      return responder(`🐙 Repositorio: <a class="cb-link" href="https://github.com/${GITHUB_USUARIO}/${GITHUB_REPO}" target="_blank" rel="noopener">${esc(GITHUB_USUARIO)}/${esc(GITHUB_REPO)}</a>`);

    if (/\b(subir|agregar|anadir|cargar|nuevo trabajo|nueva tarea|como pongo|upload)\b/.test(t))
      return responder(`⬆️ Para agregar un trabajo:<br>
        1. Entra a tu repo en GitHub.<br>
        2. Abre <code>${esc(CARPETA_BASE)}/&lt;semana&gt;/</code>, por ejemplo <code>${esc(CARPETA_BASE)}/u1s2/</code>.<br>
        3. <b>Add file → Upload files</b> y haz <i>Commit</i>.<br>
        4. Recarga esta página y aparecerá solo.<br>
        <small style="color:var(--muted)">Las carpetas válidas son u1s1 … u4s4.</small>`);

    if (/\b(mas pesado|mas grande|pesa mas|mayor tamano)\b/.test(t)) {
      if (!archivos.length) return responder('Aún no hay archivos cargados.');
      const top = [...archivos].sort((a, b) => b.peso - a.peso).slice(0, 3);
      return responder('🏋️ Los más pesados:' + fileCards(top));
    }

    if (/\b(cuantos|total|resumen|estadistica|cantidad|cuantas)\b/.test(t))
      return responder(resumen());

    // por tipo de archivo
    const mapaTipo = [
      [/\bpdf/, 'pdf'], [/\b(word|docx?)\b/, 'doc'], [/\b(excel|xlsx?|csv|hoja)/, 'xls'],
      [/\b(powerpoint|pptx?|diapositiva|presentacion)/, 'ppt'], [/\b(imagen|imagenes|foto|fotos|png|jpe?g)/, 'img'],
      [/\bvideo/, 'vid'], [/\baudio/, 'aud'], [/\b(sql|codigo|script|html|txt)\b/, 'code'], [/\b(zip|rar|comprimido)/, 'zip']
    ];
    for (const [re, cat] of mapaTipo) {
      if (re.test(t) && !/^(buscar|busca)/.test(t)) {
        const lista = archivos.filter((a) => categoriaDe(a.ext) === cat);
        const n = TIPOS_NOMBRE[cat][0];
        return responder(lista.length ? `📄 ${lista.length} ${n}:` + fileCards(lista) : `No hay ${n} en el repositorio todavía.`);
      }
    }

    // unidad / semana
    const { u, s } = parseUS(t);
    if (u || s) {
      if (!archivos.length) return responder('⏳ Los archivos aún se están cargando desde GitHub. Intenta de nuevo en un momento.');
      return responder(listarSemanas(u, s));
    }

    // buscar explícito
    const m = t.match(/^(?:buscar|busca|buscame|encuentra|encontrar|dame|abre|abrir|ver|donde esta)\s+(?:el|la|los|las|un|una)?\s*(?:archivo|trabajo|tarea|documento)?\s*(?:de|del)?\s*(.*)$/);
    if (m !== null && !m[1]) return responder('🔎 ¿Qué archivo buscas? Escribe parte del nombre, por ejemplo: <b>buscar tarea</b>.');
    const consulta = m ? m[1] : t;

    if (!archivos.length) return responder('⏳ Los archivos aún no están cargados. Si el problema persiste, revisa tu conexión o el límite de GitHub.');
    const r = buscar(consulta);
    if (r.startsWith('🔍 No encontré') && !m)
      return responder('🤔 No entendí eso. Escribe <b>ayuda</b> para ver lo que puedo hacer, o <b>buscar</b> seguido del nombre de un archivo.');
    responder(r);
  }

  /* ---------- Eventos ---------- */
  function enviar(texto) {
    addMsg(esc(texto), 'user');
    procesar(texto);
  }

  fab.addEventListener('click', () => {
    panel.classList.toggle('open');
    if (panel.classList.contains('open')) input.focus();
  });
  $('cbClose').addEventListener('click', () => panel.classList.remove('open'));
  $('cbForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const v = input.value.trim();
    if (!v) return;
    input.value = '';
    enviar(v);
  });

  panel.addEventListener('click', (e) => {
    const b = e.target.closest('[data-say],[data-go]');
    if (!b) return;
    const go = b.dataset.go, say = b.dataset.say;
    if (go) {
      if (go.startsWith('#')) document.querySelector(go)?.scrollIntoView({ behavior: 'smooth' });
      else irAUnidad(go);
    }
    if (say) enviar(say);
  });

  const CHIPS = [
    ['📊 Resumen', 'resumen'], ['🔎 Buscar', 'buscar'], ['📂 Unidad 1', 'unidad 1'],
    ['📄 PDFs', 'pdf'], ['⬆️ Cómo subir', 'cómo subir'], ['🌓 Tema', 'cambiar tema']
  ];
  $('cbChips').innerHTML = CHIPS.map(([l, s]) => `<button type="button" class="cb-mini" data-say="${esc(s)}">${esc(l)}</button>`).join('');

  addMsg('¡Hola! 👋 Soy el asistente de tu repositorio. Puedo <b>buscar archivos</b>, listar <b>unidades y semanas</b>, abrirlos o descargarlos. Toca una opción o escribe <b>ayuda</b>.', 'bot');
})();
