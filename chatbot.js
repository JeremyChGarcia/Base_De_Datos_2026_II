/* ================================================================
   🤖 CHATBOT DEL REPOSITORIO  v2  (conversacional)
   Se agrega con:  <script src="chatbot.js"></script>
   (DESPUÉS del <script> principal, antes de </body>)
   Sin servidor ni API key. Usa `archivos` y `UNIDADES` de la página.
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
  .cb-panel{position:fixed;right:22px;bottom:94px;z-index:150;width:min(400px,calc(100vw - 28px));height:min(600px,calc(100vh - 120px));
    display:none;flex-direction:column;overflow:hidden;background:var(--bg);border:1px solid var(--border-2);border-radius:22px;
    box-shadow:0 30px 80px rgba(0,0,0,.55)}
  .cb-panel.open{display:flex;animation:subirModal .3s cubic-bezier(.2,.8,.2,1)}
  .cb-head{display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid var(--border);background:var(--surface-2)}
  .cb-ava{width:36px;height:36px;border-radius:11px;display:grid;place-items:center;color:#fff;background:linear-gradient(135deg,var(--a1),var(--a2))}
  .cb-ava svg{width:19px;height:19px}
  .cb-title{flex:1;line-height:1.2;min-width:0}
  .cb-title b{font-family:'Space Grotesk',sans-serif;font-size:.95rem;display:block}
  .cb-title small{color:var(--ok);font-size:.72rem;font-weight:600}
  .cb-x{width:32px;height:32px;border-radius:9px;border:1px solid var(--border);background:transparent;color:var(--muted);cursor:pointer;display:grid;place-items:center;flex-shrink:0}
  .cb-x:hover{color:var(--text);background:var(--surface-2)}
  .cb-x.on{color:var(--a2);border-color:var(--a2)}
  .cb-x svg{width:15px;height:15px}
  .cb-msgs{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px}
  .cb-m{max-width:88%;padding:10px 14px;border-radius:16px;font-size:.86rem;line-height:1.5;animation:aparecer .3s ease both;word-wrap:break-word}
  .cb-m.bot{align-self:flex-start;background:var(--surface-2);border:1px solid var(--border);border-bottom-left-radius:5px}
  .cb-m.user{align-self:flex-end;color:#fff;background:linear-gradient(135deg,var(--a1),var(--a2));border-bottom-right-radius:5px}
  .cb-m a.cb-link{color:var(--a2);font-weight:600}
  .cb-m pre{margin-top:8px;padding:9px 11px;border-radius:10px;background:var(--bg);border:1px solid var(--border);overflow-x:auto;white-space:pre-wrap}
  .cb-m code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:.78rem}
  .cb-files{display:flex;flex-direction:column;gap:6px;margin-top:9px}
  .cb-f{display:flex;align-items:center;gap:9px;padding:7px 9px;border-radius:11px;background:var(--surface);border:1px solid var(--border)}
  .cb-f .ext{width:32px;height:32px;border-radius:9px;font-size:.55rem}
  .cb-f span.n{flex:1;min-width:0;font-size:.76rem;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .cb-f .accion{width:28px;height:28px}
  .cb-acts{display:flex;flex-wrap:wrap;gap:6px;margin-top:9px}
  .cb-mini{font-family:inherit;font-size:.74rem;font-weight:600;padding:6px 11px;border-radius:999px;cursor:pointer;text-align:left;
    background:var(--surface);border:1px solid var(--border);color:var(--text);transition:.2s}
  .cb-mini:hover:not(:disabled){border-color:var(--a1);transform:translateY(-1px)}
  .cb-mini:disabled{opacity:.75;cursor:default}
  .cb-chips{display:flex;gap:6px;padding:0 16px 10px;overflow-x:auto;flex-shrink:0}
  .cb-chips .cb-mini{white-space:nowrap}
  .cb-form{display:flex;gap:8px;padding:12px;border-top:1px solid var(--border);background:var(--surface)}
  .cb-form input{flex:1;min-width:0;padding:11px 14px;border-radius:12px;border:1px solid var(--border);background:var(--bg);color:var(--text);font-family:inherit;font-size:.86rem;outline:none}
  .cb-form input:focus{border-color:var(--a1);box-shadow:0 0 0 3px rgba(124,92,255,.16)}
  .cb-form button{width:42px;border-radius:12px;border:0;cursor:pointer;color:#fff;display:grid;place-items:center;background:linear-gradient(135deg,var(--a1),var(--a2))}
  .cb-form button svg{width:17px;height:17px}
  .cb-form .cb-mic{background:var(--surface-2);border:1px solid var(--border);color:var(--text)}
  .cb-form .cb-mic.on{background:var(--danger);border-color:transparent;color:#fff}
  .cb-typing{display:flex;gap:4px;padding:3px 2px}
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
  const ICON_MIC = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v4"/></svg>';
  const ICON_SPK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 010 7M18.5 5.5a9 9 0 010 13"/></svg>';

  const root = document.createElement('div');
  root.innerHTML = `
    <button class="cb-fab" id="cbFab" type="button" aria-label="Abrir asistente">${ICON_BOT}</button>
    <section class="cb-panel" id="cbPanel" aria-label="Asistente del repositorio">
      <div class="cb-head">
        <div class="cb-ava">${ICON_BOT}</div>
        <div class="cb-title"><b>Asistente del repositorio</b><small>● en línea</small></div>
        <button class="cb-x" id="cbTts" type="button" title="Leer respuestas en voz alta" aria-label="Voz">${ICON_SPK}</button>
        <button class="cb-x" id="cbClose" type="button" aria-label="Cerrar">${ICON_X}</button>
      </div>
      <div class="cb-msgs" id="cbMsgs"></div>
      <div class="cb-chips" id="cbChips"></div>
      <form class="cb-form" id="cbForm">
        <button type="button" class="cb-mic" id="cbMic" title="Hablar" aria-label="Hablar">${ICON_MIC}</button>
        <input id="cbInput" type="text" placeholder="Escribe o habla… ej: qué es un JOIN" autocomplete="off" aria-label="Mensaje" />
        <button type="submit" aria-label="Enviar">${ICON_SEND}</button>
      </form>
    </section>`;
  document.body.appendChild(root);

  const $ = (id) => document.getElementById(id);
  const fab = $('cbFab'), panel = $('cbPanel'), msgs = $('cbMsgs'), input = $('cbInput');

  /* ---------- Utilidades ---------- */
  const norm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  const esc = (s) => escaparHTML(s);
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  const ej = (c) => '<pre><code>' + esc(c) + '</code></pre>';
  const ROMAN = { i: 1, ii: 2, iii: 3, iv: 4 };

  let nombre = '';
  try { nombre = localStorage.getItem('cb-nombre') || ''; } catch (e) {}
  const nom = () => (nombre ? ', ' + esc(nombre) : '');

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

  /* ---------- Voz ---------- */
  let ttsOn = false;
  function hablar(texto) {
    if (!ttsOn || !('speechSynthesis' in window)) return;
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(texto.replace(/\s+/g, ' ').slice(0, 400));
      u.lang = 'es-PE';
      speechSynthesis.speak(u);
    } catch (e) {}
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
    setTimeout(() => {
      t.innerHTML = html;
      msgs.scrollTop = msgs.scrollHeight;
      hablar(t.textContent);
    }, 380);
  }

  function irAUnidad(id) {
    const el = document.querySelector(`[data-unidad="${id}"]`);
    if (!el) return;
    el.classList.add('open');
    const head = el.querySelector('[data-toggle]');
    if (head) head.setAttribute('aria-expanded', 'true');
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* ================================================================
     BASE DE CONOCIMIENTO (Base de Datos)
     ================================================================ */
  const KB = [
    { k: ['base de datos', 'bd', 'bbdd'], a: '🗄️ Una <b>base de datos</b> es una colección organizada de datos relacionados, almacenados para consultarlos, actualizarlos y gestionarlos de forma eficiente y segura.' },
    { k: ['sgbd', 'dbms', 'gestor de base de datos'], a: '⚙️ Un <b>SGBD</b> (Sistema Gestor de Bases de Datos) es el software que crea y administra bases de datos, controla accesos, seguridad y concurrencia. Ejemplos: MySQL, PostgreSQL, SQL Server, Oracle.' },
    { k: ['sql', 'lenguaje sql'], a: '📝 <b>SQL</b> (Structured Query Language) es el lenguaje estándar para crear, consultar y modificar bases de datos relacionales. Se agrupa en DDL, DML, DCL y TCL.' + ej('SELECT nombre FROM alumnos WHERE edad >= 18;') },
    { k: ['select', 'consulta', 'consultar'], a: '🔎 <b>SELECT</b> sirve para consultar datos de una o varias tablas.' + ej('SELECT nombre, nota\nFROM alumnos\nWHERE nota >= 13\nORDER BY nota DESC;') },
    { k: ['where', 'filtrar'], a: '🎯 <b>WHERE</b> filtra las filas antes de agrupar. Admite =, &lt;&gt;, &gt;, &lt;, BETWEEN, IN, LIKE, AND, OR, IS NULL.' + ej("SELECT * FROM alumnos\nWHERE ciudad = 'Huancayo' AND edad > 18;") },
    { k: ['join', 'joins', 'inner join', 'left join', 'right join', 'combinar tablas'], a: '🔗 <b>JOIN</b> combina filas de dos o más tablas usando una condición.<br>• <b>INNER</b>: solo coincidencias<br>• <b>LEFT</b>: todo lo de la izquierda + coincidencias<br>• <b>RIGHT</b>: lo contrario<br>• <b>FULL</b>: todo de ambas' + ej('SELECT a.nombre, c.nombre AS curso\nFROM alumnos a\nINNER JOIN cursos c ON a.id_curso = c.id;') },
    { k: ['group by', 'agrupar', 'having'], a: '📊 <b>GROUP BY</b> agrupa filas para usar funciones de agregación; <b>HAVING</b> filtra esos grupos (WHERE filtra filas, HAVING filtra grupos).' + ej('SELECT id_curso, COUNT(*) AS total\nFROM alumnos\nGROUP BY id_curso\nHAVING COUNT(*) > 10;') },
    { k: ['order by', 'ordenar'], a: '↕️ <b>ORDER BY</b> ordena el resultado: ASC (por defecto) o DESC.' + ej('SELECT * FROM alumnos ORDER BY apellido ASC, nota DESC;') },
    { k: ['count', 'sum', 'avg', 'min', 'max', 'funciones de agregacion', 'agregacion'], a: '🧮 <b>Funciones de agregación</b>: COUNT (cuenta), SUM (suma), AVG (promedio), MIN y MAX.' + ej('SELECT COUNT(*), AVG(nota), MAX(nota) FROM alumnos;') },
    { k: ['distinct', 'duplicados'], a: '✨ <b>DISTINCT</b> elimina filas duplicadas del resultado.' + ej('SELECT DISTINCT ciudad FROM alumnos;') },
    { k: ['insert', 'update', 'delete', 'dml', 'insertar', 'actualizar', 'eliminar'], a: '✏️ <b>DML</b> (manipulación de datos): INSERT agrega, UPDATE modifica y DELETE borra filas. ¡Usa siempre WHERE en UPDATE y DELETE!' + ej("INSERT INTO alumnos (nombre, edad) VALUES ('Ana', 20);\nUPDATE alumnos SET edad = 21 WHERE id = 1;\nDELETE FROM alumnos WHERE id = 1;") },
    { k: ['ddl', 'create table', 'alter table', 'drop table', 'crear tabla'], a: '🏗️ <b>DDL</b> (definición de datos): CREATE, ALTER y DROP definen la estructura de la base.' + ej('CREATE TABLE alumnos (\n  id INT PRIMARY KEY,\n  nombre VARCHAR(50) NOT NULL,\n  edad INT\n);') },
    { k: ['dcl', 'tcl', 'grant', 'revoke', 'commit', 'rollback'], a: '🔐 <b>DCL</b> controla permisos (GRANT, REVOKE). <b>TCL</b> controla transacciones (COMMIT confirma, ROLLBACK deshace, SAVEPOINT marca puntos).' },
    { k: ['clave primaria', 'llave primaria', 'primary key', 'pk'], a: '🔑 La <b>clave primaria (PK)</b> identifica de forma única cada fila de una tabla. No puede repetirse ni ser NULL, y cada tabla tiene una.' },
    { k: ['clave foranea', 'llave foranea', 'foreign key', 'fk'], a: '🧷 La <b>clave foránea (FK)</b> es un campo que referencia la clave primaria de otra tabla; mantiene la <b>integridad referencial</b> entre ellas.' + ej('FOREIGN KEY (id_curso) REFERENCES cursos(id)') },
    { k: ['normalizacion', 'normalizar', '1fn', '2fn', '3fn', 'formas normales', 'primera forma normal', 'segunda forma normal', 'tercera forma normal'], a: '📐 <b>Normalización</b>: organizar tablas para reducir redundancia y anomalías.<br>• <b>1FN</b>: valores atómicos, sin grupos repetidos<br>• <b>2FN</b>: 1FN + sin dependencias parciales de la clave<br>• <b>3FN</b>: 2FN + sin dependencias transitivas' },
    { k: ['acid', 'transaccion', 'transacciones'], a: '🔄 Una <b>transacción</b> es un conjunto de operaciones que se ejecutan como una unidad. Cumple <b>ACID</b>: Atomicidad (todo o nada), Consistencia, Aislamiento (Isolation) y Durabilidad.' },
    { k: ['indice', 'indices', 'index'], a: '⚡ Un <b>índice</b> acelera las búsquedas (como el índice de un libro), pero ocupa espacio y puede hacer más lentas las escrituras.' + ej('CREATE INDEX idx_apellido ON alumnos(apellido);') },
    { k: ['vista', 'vistas', 'view'], a: '👁️ Una <b>vista</b> es una consulta guardada que se usa como si fuera una tabla virtual. Simplifica consultas y restringe el acceso a columnas.' + ej('CREATE VIEW aprobados AS\nSELECT * FROM alumnos WHERE nota >= 13;') },
    { k: ['trigger', 'triggers', 'disparador'], a: '💥 Un <b>trigger</b> es código que se ejecuta automáticamente ante un evento (INSERT, UPDATE o DELETE) en una tabla. Sirve para auditoría y reglas de negocio.' },
    { k: ['procedimiento almacenado', 'stored procedure', 'procedimientos almacenados'], a: '📦 Un <b>procedimiento almacenado</b> es un bloque de SQL guardado en el servidor que puedes ejecutar por nombre y con parámetros. Reutiliza lógica y mejora la seguridad.' },
    { k: ['subconsulta', 'subconsultas', 'subquery'], a: '🪆 Una <b>subconsulta</b> es un SELECT dentro de otra consulta.' + ej('SELECT nombre FROM alumnos\nWHERE nota > (SELECT AVG(nota) FROM alumnos);') },
    { k: ['nosql', 'mongodb', 'no relacional'], a: '🍃 <b>NoSQL</b> agrupa bases no relacionales (documentos, clave-valor, grafos, columnas) como MongoDB o Redis. Son flexibles y escalan horizontalmente, ideales para datos sin esquema fijo.' },
    { k: ['modelo relacional', 'relacional'], a: '📋 El <b>modelo relacional</b> (Edgar F. Codd, 1970) organiza los datos en tablas (relaciones) con filas (tuplas) y columnas (atributos), conectadas mediante claves.' },
    { k: ['modelo entidad relacion', 'entidad relacion', 'mer', 'diagrama er', 'cardinalidad', 'entidad'], a: '🧩 El <b>modelo Entidad-Relación</b> diseña la base antes de crearla: <b>entidades</b> (objetos), <b>atributos</b> (sus datos) y <b>relaciones</b>. La <b>cardinalidad</b> indica cuántos elementos se relacionan: 1:1, 1:N o N:M (esta última se resuelve con una tabla intermedia).' },
    { k: ['null', 'nulo'], a: '❓ <b>NULL</b> significa "valor desconocido o ausente": no es 0 ni una cadena vacía. Se compara con <code>IS NULL</code>, nunca con <code>= NULL</code>.' },
    { k: ['mysql', 'postgresql', 'postgres', 'sql server', 'oracle', 'sqlite'], a: '🏷️ Son SGBD relacionales populares: <b>MySQL</b> (web, muy extendido), <b>PostgreSQL</b> (potente y abierto), <b>SQL Server</b> (Microsoft), <b>Oracle</b> (empresarial) y <b>SQLite</b> (ligero, embebido).' }
  ];

  function buscarKB(t) {
    let best = null, len = 0;
    for (const e of KB) for (const k of e.k) {
      const re = new RegExp('\\b' + k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + 's?\\b');
      if (re.test(t) && k.length > len) { best = e; len = k.length; }
    }
    return best;
  }
  function lev(a, b) {
    const m = [];
    for (let i = 0; i <= a.length; i++) m[i] = [i];
    for (let j = 1; j <= b.length; j++) m[0][j] = j;
    for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
      m[i][j] = Math.min(m[i - 1][j] + 1, m[i][j - 1] + 1, m[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return m[a.length][b.length];
  }
  function sugerir(t) {
    let mejor = null, d = 99;
    t.split(/\s+/).filter((w) => w.length >= 4).forEach((w) => {
      KB.forEach((e) => e.k.forEach((k) => {
        if (k.includes(' ') || k.length < 4) return;
        const x = lev(w, k);
        if (x < d && x <= (k.length >= 7 ? 2 : 1)) { d = x; mejor = k; }
      }));
    });
    return mejor;
  }

  /* ================================================================
     QUIZ
     ================================================================ */
  const QUIZ = [
    { q: '¿Qué sentencia se usa para consultar datos?', o: ['SELECT', 'INSERT', 'DROP', 'GRANT'], c: 0, e: 'SELECT es la sentencia de consulta.' },
    { q: 'Una clave primaria…', o: ['Puede repetirse', 'Identifica de forma única cada fila', 'Permite valores NULL', 'Solo existe en vistas'], c: 1, e: 'La PK es única y no admite NULL.' },
    { q: '¿Qué cláusula filtra GRUPOS de filas?', o: ['WHERE', 'ORDER BY', 'HAVING', 'DISTINCT'], c: 2, e: 'HAVING filtra grupos; WHERE filtra filas.' },
    { q: '¿Qué JOIN devuelve solo las filas con coincidencia en ambas tablas?', o: ['LEFT JOIN', 'INNER JOIN', 'FULL JOIN', 'CROSS JOIN'], c: 1, e: 'INNER JOIN solo trae coincidencias.' },
    { q: '¿Qué significa la A de ACID?', o: ['Autenticidad', 'Acceso', 'Atomicidad', 'Agregación'], c: 2, e: 'Atomicidad: la transacción se hace completa o no se hace.' },
    { q: 'La tercera forma normal (3FN) elimina…', o: ['Dependencias transitivas', 'Claves primarias', 'Índices', 'Vistas'], c: 0, e: '3FN elimina dependencias transitivas.' },
    { q: '¿Qué comando deshace una transacción?', o: ['COMMIT', 'ROLLBACK', 'GRANT', 'TRUNCATE'], c: 1, e: 'ROLLBACK revierte los cambios no confirmados.' },
    { q: 'CREATE, ALTER y DROP pertenecen a…', o: ['DML', 'DCL', 'TCL', 'DDL'], c: 3, e: 'Son sentencias DDL (definición de datos).' },
    { q: 'Un cliente puede tener muchos pedidos. Esa relación es…', o: ['1:1', '1:N', 'N:M', 'Recursiva'], c: 1, e: 'Un cliente → muchos pedidos es 1:N.' },
    { q: '¿Cuál de estas es una base de datos NoSQL?', o: ['MySQL', 'PostgreSQL', 'MongoDB', 'Oracle'], c: 2, e: 'MongoDB es NoSQL orientada a documentos.' }
  ];
  let quiz = null;
  function iniciarQuiz() {
    const orden = QUIZ.map((_, i) => i).sort(() => Math.random() - 0.5).slice(0, 5);
    quiz = { orden, pos: 0, ok: 0, resp: false };
    ultimo = 'quiz';
    responder('🎲 ¡Modo quiz! 5 preguntas de Base de Datos. Responde con los botones o con A/B/C/D. Escribe <b>salir</b> para terminar.');
    setTimeout(preguntar, 1000);
  }
  function preguntar() {
    if (!quiz) return;
    const q = QUIZ[quiz.orden[quiz.pos]];
    quiz.resp = false;
    addMsg(`<b>Pregunta ${quiz.pos + 1}/${quiz.orden.length}</b><br>${esc(q.q)}<div class="cb-acts" data-qgrp="${quiz.pos}">` +
      q.o.map((o, i) => `<button type="button" class="cb-mini" data-qz="${i}">${'ABCD'[i]}) ${esc(o)}</button>`).join('') + '</div>', 'bot');
  }
  function contestar(i) {
    if (!quiz || quiz.resp) return;
    quiz.resp = true;
    const q = QUIZ[quiz.orden[quiz.pos]];
    const ok = i === q.c;
    if (ok) quiz.ok++;
    const grp = msgs.querySelector(`[data-qgrp="${quiz.pos}"]`);
    if (grp) grp.querySelectorAll('button').forEach((b, j) => {
      b.disabled = true;
      if (j === q.c) b.style.borderColor = 'var(--ok)';
      else if (j === i) b.style.borderColor = 'var(--danger)';
    });
    responder((ok ? pick(['✅ ¡Correcto! ', '✅ ¡Exacto! ', '✅ ¡Bien hecho! ']) : '❌ Casi. ') + esc(q.e));
    quiz.pos++;
    setTimeout(quiz.pos < quiz.orden.length ? preguntar : finQuiz, 1900);
  }
  function finQuiz() {
    if (!quiz) return;
    const n = quiz.ok, t = quiz.orden.length;
    quiz = null;
    const msg = n === t ? '¡Perfecto! Eres un crack de las BD 🏆' : n >= t / 2 ? '¡Buen trabajo! Repasa lo que fallaste pidiéndome, por ejemplo, “explica join”.' : 'Sigue practicando 💪 Pídeme explicaciones, como “qué es normalización”.';
    addMsg(`🏁 Terminaste: <b>${n}/${t}</b>. ${msg}` + acciones([{ t: '🔁 Otra ronda', say: 'quiz' }, { t: '📖 Explícame algo', say: 'qué es sql' }]), 'bot');
  }

  /* ================================================================
     CONVERSACIÓN
     ================================================================ */
  let ultimo = '';
  const CHISTES = [
    '¿Por qué el DBA dejó a su pareja? Porque no tenían una clave foránea que los relacionara. 💔',
    'Un SQL entra a un bar, ve dos mesas y pregunta: “¿puedo hacerles un JOIN?” 🍻',
    'Mi relación con la base de datos es 1:N: yo la cuido y ella me da N problemas. 😅',
    '¿Cuál es el colmo de un DBA? Que su vida no esté normalizada. 📐',
    'Haz backup siempre. Quien no lo hace aprende con un DROP TABLE. 💥',
    '¿Por qué el índice se fue de fiesta? Para que lo encontraran más rápido. 🎉',
    'Un NoSQL entra a un bar y se sienta donde quiere: no tiene esquema. 🪑'
  ];
  const DATOS = [
    'SQL nació en los años 70 en IBM (se llamaba SEQUEL) y se basó en el modelo relacional de Edgar F. Codd, de 1970. 📜',
    'NULL no es 0 ni un texto vacío: significa “valor desconocido”. 🤔',
    'Evita SELECT * en proyectos reales: trae columnas que quizá no necesitas y es más lento. ⚠️',
    'Un índice acelera las lecturas, pero puede ralentizar INSERT, UPDATE y DELETE. ⚖️',
    'Muchos sistemas guardan las contraseñas como hash, nunca en texto plano. 🔒',
    'Dos tablas con relación N:M se resuelven con una tabla intermedia que guarda ambas claves. 🔗'
  ];
  const ANIMO = [
    '¡Tú puedes! Cada consulta que practicas te acerca a dominar las bases de datos. 💪',
    'Un paso a la vez: hoy una consulta, mañana un diseño completo. 🚀',
    'Equivocarte en SQL es normal; así se aprende. ¡Sigue! ✨',
    'Lo que hoy parece difícil, mañana será tu rutina. 🌟'
  ];
  const TIPS = '📚 Consejos para estudiar BD:<br>• Practica escribiendo consultas, no solo leyendo.<br>• Dibuja el diagrama ER antes de crear tablas.<br>• Estudia en bloques de 25 min (Pomodoro).<br>• Inventa un caso (tienda, colegio) y modélalo.<br>• Repasa con el <b>quiz</b> 😉';

  function charla(t, texto) {
    // nombre
    let m = texto.match(/(?:me llamo|mi nombre es|ll[aá]mame)\s+([A-Za-zÁÉÍÓÚáéíóúñÑ]+)/i);
    if (m) {
      nombre = m[1].charAt(0).toUpperCase() + m[1].slice(1).toLowerCase();
      try { localStorage.setItem('cb-nombre', nombre); } catch (e) {}
      return `¡Mucho gusto, <b>${esc(nombre)}</b>! 😊 Ya te recordaré. ¿En qué te ayudo?`;
    }
    if (/\b(como me llamo|sabes mi nombre|cual es mi nombre)\b/.test(t))
      return nombre ? `Te llamas <b>${esc(nombre)}</b> 😄` : 'Aún no sé tu nombre. Dime: “me llamo …”.';
    if (/\b(olvida mi nombre|borra mi nombre)\b/.test(t)) {
      nombre = ''; try { localStorage.removeItem('cb-nombre'); } catch (e) {}
      return 'Listo, olvidé tu nombre. 🫥';
    }

    if (/^(hola|holi|buenas|hey|ey|hi|hello|buen dia|buenos dias|buenas tardes|buenas noches|que onda|alo)\b/.test(t))
      return pick([`¡Hola${nom()}! 👋 ¿Qué necesitas hoy?`, `¡Hey${nom()}! 😄 ¿Buscamos algún archivo o repasamos BD?`, `¡Buenas${nom()}! Estoy listo para ayudarte.`]);

    if (/\b(como estas|que tal|como te va|como andas|como te encuentras)\b/.test(t))
      return pick([`¡Muy bien${nom()}! Con todos mis bits en orden 😎 ¿Y tú?`, 'Funcionando al 100%, sin errores de sintaxis 😄 ¿Y tú cómo estás?']);
    if (t.split(/\s+/).length <= 4 && /^(estoy |me siento )?(bien|muy bien|genial|excelente|super|todo bien|feliz|contento|contenta)\b/.test(t))
      return pick(['¡Me alegra mucho! 🎉 ¿Hacemos un quiz o buscas algo?', '¡Excelente! 😄 Aprovechemos esa energía: prueba el <b>quiz</b>.']);
    if (t.split(/\s+/).length <= 5 && /^(estoy |me siento )?(mal|triste|cansado|cansada|estresado|estresada|agotado|agotada|aburrido|aburrida)\b/.test(t))
      return `Ánimo${nom()} 🤗 ${pick(ANIMO)}<br>Si quieres, te doy consejos de estudio o un chiste.` + acciones([{ t: '😄 Chiste', say: 'chiste' }, { t: '📚 Consejos', say: 'consejos de estudio' }]);

    if (/\b(gracias|muchas gracias|te lo agradezco|thx|thanks)\b/.test(t))
      return pick([`¡De nada${nom()}! 😊`, '¡Para eso estoy! 🙌', 'Un placer ayudarte. ✨']);
    if (/\b(adios|chao|chau|hasta luego|nos vemos|bye|hasta pronto|me voy)\b/.test(t))
      return pick([`¡Hasta luego${nom()}! 👋 Éxitos con tus tareas.`, '¡Nos vemos! Vuelve cuando quieras. 🚀']);

    if (/\b(quien eres|que eres|como te llamas|tu nombre|presentate)\b/.test(t))
      return 'Soy el <b>asistente virtual</b> del repositorio de Jeremy 🤖. Te ayudo a encontrar trabajos, explicarte conceptos de Base de Datos, hacer quizzes y conversar un rato.';
    if (/\b(eres (una )?(ia|inteligencia|robot|bot|humano|persona|real)|chatgpt|claude)\b/.test(t))
      return 'Soy un <b>programa</b>, no una persona 🙂. Funciono con reglas dentro de esta página (sin IA en la nube), así que sé de lo que me enseñaron: archivos, BD y charla básica.';
    if (/\b(quien te (creo|hizo|programo|desarrollo)|quien es tu creador)\b/.test(t))
      return 'Fui creado para este portafolio de <b>Jeremy García</b>, como parte de su repositorio de Base de Datos 2026-II. 🛠️';
    if (/\b(quien es jeremy|sobre jeremy|dueno|autor)\b/.test(t))
      return '👤 <b>Jeremy García</b> es estudiante de Base de Datos 2026-II y el autor de este repositorio de trabajos.';
    if (/\b(que curso|de que trata|sobre el curso|ciclo|2026)\b/.test(t) && !/archivo|buscar/.test(t))
      return '🎓 Este repositorio es del curso <b>Base de Datos 2026-II</b>: 4 unidades de 4 semanas cada una.' + acciones([{ t: '📊 Ver resumen', say: 'resumen' }]);
    if (/\b(te quiero|te amo|eres genial|eres el mejor|eres buen|buen bot|eres increible|me caes bien|crack)\b/.test(t))
      return pick(['¡Gracias, tú también eres genial! 🥰', 'Me hiciste el día 😊', '¡Aww! Yo también te aprecio, humano. 🤖💙']);
    if (/\b(tonto|estupido|inutil|idiota|malo|basura|feo)\b/.test(t))
      return 'Uy 😅 Seguro puedo mejorar. Dime qué esperabas y lo intento de nuevo.';
    if (/\b(cuantos anos tienes|que edad tienes|donde vives|donde estas)\b/.test(t))
      return 'Vivo dentro de esta página web ☁️. No cumplo años, pero cada vez que me actualizan nazco un poquito más listo.';
    if (/\b(que (te )?gusta|tu color favorito|comida favorita)\b/.test(t))
      return 'Me gustan los datos bien ordenados, las claves primarias y las consultas rápidas 😄';
    if (/\b(que hora es|hora actual|que horas son)\b/.test(t))
      return '🕒 Son las <b>' + new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' }) + '</b>.';
    if (/\b(que dia es|fecha de hoy|que fecha|dia de hoy)\b/.test(t))
      return '📅 Hoy es <b>' + new Date().toLocaleDateString('es-PE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) + '</b>.';

    if (/\b(chiste|chistes|hazme reir|algo gracioso|broma)\b/.test(t)) {
      ultimo = 'chiste';
      return pick(CHISTES) + acciones([{ t: '😂 Otro', say: 'otro chiste' }]);
    }
    if (/\b(dato curioso|dato|curiosidad|cuentame algo|sabias que)\b/.test(t)) {
      ultimo = 'dato';
      return '💡 ' + pick(DATOS) + acciones([{ t: '➕ Otro dato', say: 'otro dato' }]);
    }
    if (/\b(motivame|motivacion|animo|animame|frase motivadora|dame fuerzas)\b/.test(t)) {
      ultimo = 'animo';
      return pick(ANIMO) + acciones([{ t: '💪 Otra', say: 'otra frase' }]);
    }
    if (/\b(consejos?|tips?|como estudiar|estudiar mejor|tecnicas de estudio)\b/.test(t)) return TIPS;
    if (/\b(estoy aburrido|aburrido|aburrida|que hago)\b/.test(t))
      return 'Entonces… ¡juguemos! 🎮' + acciones([{ t: '🎲 Quiz de BD', say: 'quiz' }, { t: '😄 Chiste', say: 'chiste' }, { t: '💡 Dato curioso', say: 'dato curioso' }]);

    // "otro/otra/más"
    if (/^(otro|otra|otros|mas|dame otro|dame otra|siguiente|de nuevo|repite)\b/.test(t)) {
      if (ultimo === 'chiste') return pick(CHISTES) + acciones([{ t: '😂 Otro', say: 'otro chiste' }]);
      if (ultimo === 'dato') return '💡 ' + pick(DATOS) + acciones([{ t: '➕ Otro dato', say: 'otro dato' }]);
      if (ultimo === 'animo') return pick(ANIMO) + acciones([{ t: '💪 Otra', say: 'otra frase' }]);
      if (ultimo === 'quiz') { iniciarQuiz(); return null; }
      return '¿Otro qué? 😄 Puedo darte un <b>chiste</b>, un <b>dato</b> o un <b>quiz</b>.';
    }
    return undefined; // sin coincidencia
  }

  /* ---------- Funciones del repositorio ---------- */
  function listarSemanas(u, s) {
    const sems = semanasDe(u, s);
    if (!sems.length) return '❓ No encontré esa unidad o semana. El repositorio tiene 4 unidades de 4 semanas.';
    const ids = sems.map((x) => x.id);
    const lista = archivos.filter((a) => ids.includes(a.semana))
      .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es', { numeric: true }));
    const nombreSel = s ? etiquetaSemana(ids[0]) : (u ? UNIDADES[u - 1].titulo : 'todas las unidades');
    const botonIr = u ? acciones([{ t: `📍 Ir a ${UNIDADES[u - 1].titulo}`, go: UNIDADES[u - 1].id }]) : '';
    if (!lista.length) return `📂 <b>${esc(nombreSel)}</b> todavía no tiene archivos.<br>Súbelos a <code>Trabajos/${esc(ids[0])}/</code> en GitHub.` + botonIr;
    return `📂 <b>${esc(nombreSel)}</b>: ${lista.length} archivo(s).` + fileCards(lista) + botonIr;
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
  function buscarLista(q) {
    const palabras = q.split(/\s+/).filter(Boolean);
    return archivos.filter((a) => { const n = norm(a.nombre); return palabras.every((p) => n.includes(p)); });
  }

  /* ---------- Cerebro principal ---------- */
  function procesar(texto) {
    const t = norm(texto);
    if (!t) return;

    // Quiz activo
    if (quiz) {
      if (/\b(salir|terminar|cancelar|stop|basta|parar)\b/.test(t)) { quiz = null; return responder('Quiz cancelado. ¡Cuando quieras jugamos otra vez! 🎲'); }
      const mm = t.match(/^(?:opcion\s*)?([a-d1-4])\)?$/);
      if (mm) { const i = 'abcd'.indexOf(mm[1]) >= 0 ? 'abcd'.indexOf(mm[1]) : +mm[1] - 1; return contestar(i); }
      return responder('Estamos en el quiz 🎲 Responde con A, B, C o D, o escribe <b>salir</b>.');
    }

    // Comandos
    if (/^(limpiar|borrar chat|reiniciar|clear|nuevo chat)\b/.test(t)) {
      msgs.innerHTML = '';
      return responder('🧹 Chat limpio. ¿Qué hacemos ahora?');
    }
    if (/\b(quiz|trivia|preguntas|ponme a prueba|evaluame|examen de prueba|jugar)\b/.test(t)) return iniciarQuiz();

    if (/\b(ayuda|help|que puedes|que sabes|que haces|comandos|opciones|menu|funciones)\b/.test(t))
      return responder(`Puedo hacer muchas cosas${nom()}:<br>
        • 🔎 <b>buscar</b> <i>informe</i> — archivos por nombre<br>
        • 📂 <b>unidad 1</b>, <b>semana 2</b>, <b>u1s3</b><br>
        • 📄 <b>pdf</b>, <b>word</b>, <b>excel</b>, <b>imágenes</b>…<br>
        • 📊 <b>resumen</b> · 🏋️ <b>más pesado</b><br>
        • 📖 <b>explícame</b> <i>join / sql / normalización…</i><br>
        • 🎲 <b>quiz</b> de Base de Datos<br>
        • 😄 <b>chiste</b> · 💡 <b>dato curioso</b> · 💪 <b>motívame</b><br>
        • 🧮 cálculos: <b>5*(3+2)</b> · 🕒 <b>hora</b> / <b>fecha</b><br>
        • 🙋 dime <b>me llamo …</b> y te recordaré<br>
        • 🌓 <b>cambiar tema</b> · ✉️ <b>contacto</b> · 🐙 <b>github</b> · ⬆️ <b>cómo subir</b><br>
        • 🎤 usa el micrófono y 🔊 la voz`);

    // Cálculos
    const calc = texto.replace(/^(cuanto es|calcula|resuelve|cuanto da)\s*/i, '').replace(/[xX×]/g, '*').replace(/÷/g, '/').replace(/\^/g, '**').replace(/,/g, '.').replace(/=\s*\??$/, '').trim();
    if (/^[\d\s+\-*/().%]+$/.test(calc) && /\d\s*[+\-*/%]\s*[\d(]/.test(calc) && calc.length < 40) {
      try {
        const r = Function('"use strict";return (' + calc + ')')();
        if (Number.isFinite(r)) return responder(`🧮 ${esc(calc)} = <b>${+r.toFixed(6)}</b>`);
      } catch (e) {}
    }

    // Charla
    const c = charla(t, texto);
    if (c === null) return;
    if (c !== undefined) return responder(c);

    // Tema, contacto, github, subir
    if (/\b(tema|modo oscuro|modo claro|oscuro|claro|dark|light)\b/.test(t) && !/archivo/.test(t)) {
      $('btnTema').click();
      return responder('🌓 Listo, cambié el tema de la página.');
    }
    if (/\b(contacto|correo|email|mail|contactar)\b/.test(t))
      return responder('✉️ Puedes escribirle con el botón <b>Contáctame</b> de la parte superior.' + acciones([{ t: 'Ir al contacto', go: '#contacto' }]));
    if (/\b(github|codigo fuente|repo)\b/.test(t) && !/^(buscar|busca)/.test(t))
      return responder(`🐙 Repositorio: <a class="cb-link" href="https://github.com/${GITHUB_USUARIO}/${GITHUB_REPO}" target="_blank" rel="noopener">${esc(GITHUB_USUARIO)}/${esc(GITHUB_REPO)}</a>`);
    if (/\b(subir|agregar|anadir|cargar|nuevo trabajo|nueva tarea|como pongo|upload)\b/.test(t))
      return responder(`⬆️ Para agregar un trabajo:<br>
        1. Entra a tu repo en GitHub.<br>
        2. Abre <code>${esc(CARPETA_BASE)}/&lt;semana&gt;/</code>, por ejemplo <code>${esc(CARPETA_BASE)}/u1s2/</code>.<br>
        3. <b>Add file → Upload files</b> y haz <i>Commit</i>.<br>
        4. Recarga esta página y aparecerá solo.<br>
        <small style="color:var(--muted)">Las carpetas válidas son u1s1 … u4s4.</small>`);

    // Conocimiento de BD
    const esBusqueda = /^(buscar|busca|buscame|encuentra|encontrar|donde esta)\b/.test(t);
    const pideDef = /\b(que es|que son|explica|explicame|define|definicion|significa|para que sirve|como funciona|ejemplo|dime sobre|cuentame sobre)\b/.test(t);
    if (!esBusqueda && (pideDef || t.split(/\s+/).length <= 4)) {
      const e = buscarKB(t);
      if (e) { ultimo = 'kb'; return responder(e.a + acciones([{ t: '🎲 Ponme a prueba', say: 'quiz' }])); }
    }

    if (/\b(mas pesado|mas grande|pesa mas|mayor tamano)\b/.test(t)) {
      if (!archivos.length) return responder('Aún no hay archivos cargados.');
      const top = [...archivos].sort((a, b) => b.peso - a.peso).slice(0, 3);
      return responder('🏋️ Los más pesados:' + fileCards(top));
    }
    if (/\b(cuantos|total|resumen|estadistica|cantidad|cuantas)\b/.test(t)) return responder(resumen());

    // Por tipo de archivo
    const mapaTipo = [
      [/\bpdf/, 'pdf'], [/\b(word|docx?)\b/, 'doc'], [/\b(excel|xlsx?|csv|hoja)/, 'xls'],
      [/\b(powerpoint|pptx?|diapositiva|presentacion)/, 'ppt'], [/\b(imagen|imagenes|foto|fotos|png|jpe?g)/, 'img'],
      [/\bvideo/, 'vid'], [/\baudio/, 'aud'], [/\b(codigo|script|html|txt)\b/, 'code'], [/\b(zip|rar|comprimido)/, 'zip']
    ];
    if (!esBusqueda) for (const [re, cat] of mapaTipo) {
      if (re.test(t)) {
        const lista = archivos.filter((a) => categoriaDe(a.ext) === cat);
        const n = TIPOS_NOMBRE[cat][0];
        return responder(lista.length ? `📄 ${lista.length} ${n}:` + fileCards(lista) : `No hay ${n} en el repositorio todavía.`);
      }
    }

    // Unidad / semana
    const { u, s } = parseUS(t);
    if (u || s) {
      if (!archivos.length) return responder('⏳ Los archivos aún se están cargando desde GitHub. Intenta de nuevo en un momento.');
      return responder(listarSemanas(u, s));
    }

    // Buscar archivo
    const m = t.match(/^(?:buscar|busca|buscame|encuentra|encontrar|dame|abre|abrir|ver|donde esta)\s+(?:el|la|los|las|un|una)?\s*(?:archivo|trabajo|tarea|documento)?\s*(?:de|del)?\s*(.*)$/);
    if (m && !m[1]) return responder('🔎 ¿Qué archivo buscas? Escribe parte del nombre, por ejemplo: <b>buscar tarea</b>.');
    const consulta = m ? m[1] : t;

    if (!archivos.length && m) return responder('⏳ Los archivos aún no están cargados. Revisa tu conexión o el límite de GitHub.');
    const res = archivos.length ? buscarLista(consulta) : [];
    if (res.length) return responder(`🔍 ${res.length} resultado(s) para “${esc(consulta)}”:` + fileCards(res));
    if (m) return responder(`🔍 No encontré archivos con “${esc(consulta)}”. Prueba otra palabra o pide <b>resumen</b>.`);

    // Sugerencia por parecido
    const sug = sugerir(t);
    if (sug) return responder(`🤔 ¿Quisiste decir <b>${esc(sug)}</b>?` + acciones([{ t: `📖 Explícame ${sug}`, say: 'qué es ' + sug }]));

    responder(pick([
      '🤔 No estoy seguro de haber entendido. Prueba con <b>ayuda</b>, o pregúntame algo como “qué es un JOIN”.',
      'Mmm, eso no lo manejo todavía 😅 Puedo buscar archivos, explicar BD, hacer un quiz o contarte un chiste.',
      'No te entendí bien. ¿Quieres buscar un archivo o repasar un concepto de BD?'
    ]) + acciones([{ t: '❓ Ayuda', say: 'ayuda' }, { t: '🎲 Quiz', say: 'quiz' }, { t: '😄 Chiste', say: 'chiste' }]));
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
    const q = e.target.closest('[data-qz]');
    if (q) { contestar(+q.dataset.qz); return; }
    const b = e.target.closest('[data-say],[data-go]');
    if (!b) return;
    const go = b.dataset.go, say = b.dataset.say;
    if (go) {
      if (go.startsWith('#')) document.querySelector(go)?.scrollIntoView({ behavior: 'smooth' });
      else irAUnidad(go);
    }
    if (say) enviar(say);
  });

  // Voz: leer respuestas
  const btnTts = $('cbTts');
  if (!('speechSynthesis' in window)) btnTts.style.display = 'none';
  btnTts.addEventListener('click', () => {
    ttsOn = !ttsOn;
    btnTts.classList.toggle('on', ttsOn);
    if (!ttsOn) { try { speechSynthesis.cancel(); } catch (e) {} }
    else hablar('Voz activada');
  });

  // Voz: dictado
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const btnMic = $('cbMic');
  if (!SR) btnMic.style.display = 'none';
  else {
    const rec = new SR();
    rec.lang = 'es-PE';
    rec.interimResults = false;
    let escuchando = false;
    rec.onresult = (ev) => {
      const txt = ev.results[0][0].transcript;
      if (txt) enviar(txt);
    };
    rec.onend = () => { escuchando = false; btnMic.classList.remove('on'); };
    rec.onerror = () => { escuchando = false; btnMic.classList.remove('on'); };
    btnMic.addEventListener('click', () => {
      if (escuchando) { rec.stop(); return; }
      try { rec.start(); escuchando = true; btnMic.classList.add('on'); } catch (e) {}
    });
  }

  const CHIPS = [
    ['📖 Explícame SQL', 'qué es sql'], ['🎲 Quiz', 'quiz'], ['😄 Chiste', 'chiste'],
    ['📊 Resumen', 'resumen'], ['🔎 Buscar', 'buscar'], ['📂 Unidad 1', 'unidad 1'], ['❓ Ayuda', 'ayuda']
  ];
  $('cbChips').innerHTML = CHIPS.map(([l, s]) => `<button type="button" class="cb-mini" data-say="${esc(s)}">${esc(l)}</button>`).join('');

  addMsg(nombre
    ? `¡Hola de nuevo, <b>${esc(nombre)}</b>! 👋 ¿Buscamos un archivo, repasamos BD o hacemos un quiz?`
    : '¡Hola! 👋 Soy el asistente de tu repositorio. Puedo <b>buscar archivos</b>, <b>explicarte Base de Datos</b>, hacer un <b>quiz</b> y charlar un rato. Dime tu nombre con “me llamo …” o toca una opción.', 'bot');
})();

