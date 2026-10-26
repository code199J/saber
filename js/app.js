/* Saber — lógica. Sin frameworks, sin red, sin dependencias.
   Modelo: cursos → lecciones (lectura + test) y un reto diario de preguntas sueltas. */

const $  = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));

const CLAVE = "saber.v1";
const SEGUNDOS = 25;
const PREGUNTAS_RETO = 10;
const XP_LECTURA = 10;
const XP_TEST = 30;
const XP_ACIERTO = 10;
const XP_NIVEL = 150;

/* ── Almacenamiento ─────────────────────────────────────────── */

const POR_DEFECTO = {
  xp: 0,
  racha: 0,
  mejorRacha: 0,
  ultimoDia: null,
  diario: null,          // { dia, aciertos, total }
  minutos: null,         // { dia, total }
  vistas: {},            // { idLeccion: true }
  tests: {},             // { idLeccion: aciertos }
  partidas: 0,
  aciertos: 0,
  total: 0,
  tiempo: true
};

function cargarDatos() {
  let guardado = {};
  try { guardado = JSON.parse(localStorage.getItem(CLAVE)) || {}; } catch (e) { guardado = {}; }
  const d = Object.assign({}, POR_DEFECTO, guardado);
  if (d.ultimoDia && d.ultimoDia !== hoy() && d.ultimoDia !== ayer()) d.racha = 0;
  return d;
}

function minutosHoy() {
  return datos.minutos && datos.minutos.dia === hoy() ? datos.minutos.total : 0;
}

function sumarMinutos(n) {
  if (!datos.minutos || datos.minutos.dia !== hoy()) datos.minutos = { dia: hoy(), total: 0 };
  datos.minutos.total += n;
}

function guardarDatos() {
  try { localStorage.setItem(CLAVE, JSON.stringify(datos)); } catch (e) { /* modo privado */ }
}

let datos = cargarDatos();

/* ── Fechas y azar ──────────────────────────────────────────── */

function fechaISO(d) {
  return d.getFullYear() + "-" +
    String(d.getMonth() + 1).padStart(2, "0") + "-" +
    String(d.getDate()).padStart(2, "0");
}
// Declaraciones de función a propósito: cargarDatos() corre antes que esta línea.
function hoy()  { return fechaISO(new Date()); }
function ayer() { return fechaISO(new Date(Date.now() - 86400000)); }

function hashSemilla(texto) {
  let h = 2166136261;
  for (let i = 0; i < texto.length; i++) {
    h ^= texto.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function generador(semilla) {
  let a = semilla >>> 0;
  return function () {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function mezclar(lista, azar = Math.random) {
  const a = lista.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(azar() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ── Catálogo de cursos ─────────────────────────────────────── */

function cursoPorId(id) { return window.CURSOS.find((c) => c.id === id); }

function leccionPorId(cursoId, lecId) {
  const c = cursoPorId(cursoId);
  return c ? c.lecciones.find((l) => l.id === lecId) : null;
}

function totalLecciones() {
  return window.CURSOS.reduce((n, c) => n + c.lecciones.length, 0);
}

function aprobadas(curso) {
  return curso.lecciones.filter((l) => datos.tests[l.id] >= 2).length;
}

// Primera lección sin test aprobado, en orden de biblioteca.
function siguientePendiente() {
  for (const c of window.CURSOS) {
    for (const l of c.lecciones) {
      if (!(datos.tests[l.id] >= 2)) return { curso: c, leccion: l };
    }
  }
  return null;
}

function siguienteEnCurso(cursoId, lecId) {
  const c = cursoPorId(cursoId);
  if (!c) return null;
  const i = c.lecciones.findIndex((l) => l.id === lecId);
  return i >= 0 && i + 1 < c.lecciones.length ? c.lecciones[i + 1] : null;
}

function nivel() { return 1 + Math.floor(datos.xp / XP_NIVEL); }

/* ── Actividad y XP ─────────────────────────────────────────── */

function sumarXP(cantidad) {
  datos.xp += cantidad;
  guardarDatos();
}

function registrarActividad() {
  if (datos.ultimoDia === hoy()) return;
  datos.racha = (datos.ultimoDia === ayer()) ? datos.racha + 1 : 1;
  datos.ultimoDia = hoy();
  datos.mejorRacha = Math.max(datos.mejorRacha, datos.racha);
}

/* ── Vistas ─────────────────────────────────────────────────── */

const VISTAS = ["inicio", "curso", "leccion", "juego", "resultado"];

function mostrar(vista) {
  VISTAS.forEach((v) => $("#vista-" + v).classList.toggle("oculto", v !== vista));
  window.scrollTo(0, 0);
}

function ponerImagen(selector, ruta, alt) {
  const img = $(selector);
  if (!img || !ruta) return;
  if (img.getAttribute("src") !== ruta) img.src = ruta;
  img.alt = alt || "";
}

/* ── Inicio ─────────────────────────────────────────────────── */

let cursoAbierto = null;
let leccionAbierta = null;

function pintarInicio() {
  $("#racha-num").textContent = datos.racha;
  $("#racha-txt").textContent = datos.racha === 1 ? "día seguido" : "días seguidos";
  $("#nivel-num").textContent = nivel();
  $("#nivel-txt").textContent = "nivel · " + datos.xp + " XP";

  // Continuar
  const pend = siguientePendiente();
  if (pend) {
    $("#continuar-tag").textContent = "Continuar";
    $("#continuar-titulo").textContent = pend.leccion.titulo;
    $("#continuar-sub").textContent = pend.curso.tema + " · " + pend.leccion.min + " min de lectura";
    ponerImagen("#continuar-img", pend.leccion.img, pend.leccion.titulo);
    const pct = (aprobadas(pend.curso) / pend.curso.lecciones.length) * 100;
    $("#continuar-barra").style.width = pct + "%";
    $("#btn-continuar").onclick = () => abrirLeccion(pend.curso.id, pend.leccion.id);
  } else {
    $("#continuar-tag").textContent = "Biblioteca completa";
    $("#continuar-titulo").textContent = "Repasar un curso";
    $("#continuar-sub").textContent = "Ya aprobaste todos los tests. Vuelve cuando quieras.";
    ponerImagen("#continuar-img", window.CURSOS[0].lecciones[0].img, "");
    $("#continuar-barra").style.width = "100%";
    $("#btn-continuar").onclick = () => abrirCurso(window.CURSOS[0].id);
  }

  // Cursos
  const cont = $("#cursos");
  cont.innerHTML = "";
  window.CURSOS.forEach((c) => {
    const ok = aprobadas(c);
    const pct = Math.round((ok / c.lecciones.length) * 100);
    const b = document.createElement("button");
    b.type = "button";
    b.className = "curso";
    b.innerHTML =
      '<span class="curso-media"><img src="' + (c.portada || c.lecciones[0].img) + '" alt="" width="720" height="405" loading="lazy" decoding="async"></span>' +
      '<span class="curso-cuerpo">' +
        '<span class="curso-tema">' + c.tema + "</span>" +
        '<span class="curso-nombre">' + c.titulo + "</span>" +
        '<span class="curso-sub">' + c.sub + "</span>" +
        '<span class="barra-mini"><span style="width:' + pct + '%"></span></span>' +
        '<span class="curso-pie">' + ok + " de " + c.lecciones.length + " tests aprobados</span>" +
      "</span>";
    b.addEventListener("click", () => abrirCurso(c.id));
    cont.appendChild(b);
  });

  // Reto diario
  const hecho = datos.diario && datos.diario.dia === hoy();
  if (hecho) {
    $("#diario-tag").textContent = "Reto de hoy · hecho";
    $("#diario-titulo").textContent = "Jugar una ronda libre";
    $("#diario-sub").textContent = "Hoy acertaste " + datos.diario.aciertos + " de " + datos.diario.total;
  } else {
    $("#diario-tag").textContent = "Reto de hoy";
    $("#diario-titulo").textContent = PREGUNTAS_RETO + " preguntas sueltas";
    $("#diario-sub").textContent = "Suma XP una vez al día";
  }

  const precision = datos.total ? Math.round((datos.aciertos / datos.total) * 100) : 0;
  const leidas = Object.keys(datos.vistas).length;
  $("#stats").innerHTML =
    bloqueStat(leidas + "/" + totalLecciones(), "lecciones") +
    bloqueStat(precision + "%", "aciertos") +
    bloqueStat(minutosHoy() + " min", "hoy");

  $("#btn-tiempo").textContent = datos.tiempo ? "Tiempo: " + SEGUNDOS + " s" : "Tiempo: libre";
}

function bloqueStat(valor, etiqueta) {
  return '<div class="stat"><b>' + valor + "</b><span>" + etiqueta + "</span></div>";
}

/* ── Curso ──────────────────────────────────────────────────── */

function abrirCurso(cursoId) {
  const c = cursoPorId(cursoId);
  if (!c) return;
  cursoAbierto = c.id;

  $("#curso-tema").textContent = c.tema;
  $("#curso-titulo").textContent = c.titulo;
  $("#curso-desc").textContent = c.desc;
  ponerImagen("#curso-img", c.portada || c.lecciones[0].img, c.titulo);

  const ok = aprobadas(c);
  $("#curso-progreso-txt").textContent = ok + " / " + c.lecciones.length;
  $("#curso-barra").style.width = Math.round((ok / c.lecciones.length) * 100) + "%";

  const cont = $("#lista-lecciones");
  cont.innerHTML = "";
  c.lecciones.forEach((l) => {
    const visto = !!datos.vistas[l.id];
    const nota = datos.tests[l.id];
    const hecho = nota >= 2;
    const b = document.createElement("button");
    b.type = "button";
    b.className = "leccion-item" + (hecho ? " hecha" : visto ? " vista" : "");
    b.innerHTML =
      '<img class="miniatura" src="' + l.img + '" alt="" width="62" height="62" loading="lazy" decoding="async">' +
      '<span class="cuerpo"><span class="titulo">' + l.titulo + "</span>" +
      '<span class="meta">' + l.min + " min · " + l.quiz.length + " preguntas" +
      (hecho ? " · aprobada" : visto ? " · leída" : "") + "</span></span>" +
      '<span class="marca">' + (hecho ? "✓" : "›") + "</span>";
    b.addEventListener("click", () => abrirLeccion(c.id, l.id));
    cont.appendChild(b);
  });

  mostrar("curso");
}

/* ── Lección ────────────────────────────────────────────────── */

function abrirLeccion(cursoId, lecId) {
  const c = cursoPorId(cursoId);
  const l = leccionPorId(cursoId, lecId);
  if (!c || !l) return;

  cursoAbierto = c.id;
  leccionAbierta = l.id;

  const i = c.lecciones.indexOf(l);
  $("#leccion-progreso-txt").textContent = "Lección " + (i + 1) + " de " + c.lecciones.length;
  $("#leccion-tema").textContent = c.tema + " · " + c.titulo;
  $("#leccion-titulo").textContent = l.titulo;
  $("#leccion-meta").textContent = "Unos " + l.min + " minutos de lectura";
  ponerImagen("#leccion-img", l.img, l.titulo);

  const art = $("#leccion-texto");
  art.innerHTML = "";
  l.texto.forEach((p) => {
    const el = document.createElement("p");
    el.textContent = p;
    art.appendChild(el);
  });

  if (!datos.vistas[l.id]) {
    datos.vistas[l.id] = true;
    sumarXP(XP_LECTURA);
    registrarActividad();
    guardarDatos();
  }

  mostrar("leccion");
}

/* ── Preparación de preguntas ───────────────────────────────── */

function preparar(p, azar = Math.random) {
  const correctaTexto = p.o[p.a];
  const opciones = mezclar(p.o, azar);
  return {
    q: p.q,
    e: p.e,
    opciones: opciones,
    correcta: opciones.indexOf(correctaTexto)
  };
}

function rondaDiaria() {
  const azar = generador(hashSemilla("saber-" + hoy()));
  return mezclar(window.BANCO, azar).slice(0, PREGUNTAS_RETO).map((p) => preparar(p, azar));
}

function rondaLibre() {
  return mezclar(window.BANCO).slice(0, PREGUNTAS_RETO).map((p) => preparar(p));
}

/* ── Partida ────────────────────────────────────────────────── */

const partida = {
  preguntas: [],
  indice: 0,
  aciertos: 0,
  fallos: [],
  modo: "diario",       // diario | libre | leccion
  cursoId: null,
  leccionId: null,
  etiqueta: "",
  bloqueado: false,
  temporizador: null,
  restante: 0,
  xpGanada: 0
};

function empezarReto(libre) {
  const yaHecho = datos.diario && datos.diario.dia === hoy();
  partida.preguntas = (libre || yaHecho) ? rondaLibre() : rondaDiaria();
  partida.modo = (libre || yaHecho) ? "libre" : "diario";
  partida.cursoId = null;
  partida.leccionId = null;
  partida.etiqueta = partida.modo === "diario" ? "Reto del día" : "Ronda libre";
  arrancar();
}

function empezarTest(cursoId, lecId) {
  const l = leccionPorId(cursoId, lecId);
  if (!l) return;
  partida.preguntas = l.quiz.map((p) => preparar(p));
  partida.modo = "leccion";
  partida.cursoId = cursoId;
  partida.leccionId = lecId;
  partida.etiqueta = "Test · " + cursoPorId(cursoId).tema;
  arrancar();
}

function arrancar() {
  Object.assign(partida, {
    indice: 0,
    aciertos: 0,
    fallos: [],
    bloqueado: false,
    xpGanada: 0
  });
  mostrar("juego");
  pintarPregunta();
}

function pintarPregunta() {
  const p = partida.preguntas[partida.indice];
  const n = partida.preguntas.length;

  $("#progreso-txt").textContent = (partida.indice + 1) + " / " + n;
  $("#puntos-txt").textContent = partida.xpGanada ? "+" + partida.xpGanada + " XP" : "";
  $("#etiqueta-cat").textContent = partida.etiqueta;
  $("#pregunta").textContent = p.q;
  $("#barra-progreso").style.width = (partida.indice / n * 100) + "%";

  const cont = $("#opciones");
  cont.innerHTML = "";
  const letras = ["A", "B", "C", "D"];

  p.opciones.forEach((texto, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "opcion";
    b.innerHTML = '<span class="letra">' + letras[i] + "</span><span>" + texto + "</span>";
    b.addEventListener("click", () => responder(i));
    cont.appendChild(b);
  });

  $("#feedback").classList.add("oculto");
  partida.bloqueado = false;
  arrancarTiempo();
}

function arrancarTiempo() {
  pararTiempo();
  const barra = $("#barra-tiempo");
  barra.classList.remove("urgente");

  // El test de una lección no lleva reloj: es para aprender, no para competir.
  if (!datos.tiempo || partida.modo === "leccion") {
    barra.style.width = "0%";
    return;
  }

  partida.restante = SEGUNDOS * 1000;
  barra.style.width = "100%";

  const inicio = performance.now();
  partida.temporizador = setInterval(() => {
    const queda = Math.max(0, partida.restante - (performance.now() - inicio));
    const pct = (queda / partida.restante) * 100;
    barra.style.width = pct + "%";
    barra.classList.toggle("urgente", pct < 30);
    if (queda <= 0) {
      pararTiempo();
      responder(-1);
    }
  }, 100);
}

function pararTiempo() {
  if (partida.temporizador) {
    clearInterval(partida.temporizador);
    partida.temporizador = null;
  }
}

function responder(elegida) {
  if (partida.bloqueado) return;
  partida.bloqueado = true;
  pararTiempo();

  const p = partida.preguntas[partida.indice];
  const n = partida.preguntas.length;
  const acierto = elegida === p.correcta;

  $$("#opciones .opcion").forEach((b, i) => {
    b.disabled = true;
    if (i === p.correcta) b.classList.add("elegida-bien");
    else if (i === elegida) b.classList.add("elegida-mal");
    else b.classList.add("apagada");
  });

  if (acierto) {
    partida.aciertos++;
    partida.xpGanada += XP_ACIERTO;
    $("#puntos-txt").textContent = "+" + partida.xpGanada + " XP";
  } else {
    partida.fallos.push({
      q: p.q,
      correcta: p.opciones[p.correcta],
      elegida: elegida >= 0 ? p.opciones[elegida] : null
    });
  }

  $("#barra-progreso").style.width = ((partida.indice + 1) / n * 100) + "%";

  const veredicto = $("#veredicto");
  veredicto.textContent = acierto ? "Correcto" : (elegida < 0 ? "Se acabó el tiempo" : "Incorrecto");
  veredicto.className = "veredicto " + (acierto ? "bien" : "mal");
  $("#explica").textContent = acierto
    ? p.e
    : "La respuesta era " + p.opciones[p.correcta] + ". " + p.e;

  $("#feedback").classList.remove("oculto");
  $("#btn-siguiente").textContent = (partida.indice + 1 === n) ? "Ver resultado" : "Siguiente";
  $("#btn-siguiente").focus();
}

function siguiente() {
  partida.indice++;
  if (partida.indice >= partida.preguntas.length) terminar();
  else pintarPregunta();
}

/* ── Cierre de ronda ────────────────────────────────────────── */

function terminar() {
  pararTiempo();

  const total = partida.preguntas.length;
  const aciertos = partida.aciertos;
  const aprobado = partida.modo === "leccion" ? aciertos >= 2 : aciertos >= Math.ceil(total / 2);

  datos.partidas++;
  datos.aciertos += aciertos;
  datos.total += total;

  let extra = 0;

  if (partida.modo === "leccion") {
    const previo = datos.tests[partida.leccionId] || 0;
    datos.tests[partida.leccionId] = Math.max(previo, aciertos);
    if (aprobado && previo < 2) extra = XP_TEST;
    registrarActividad();
  } else if (partida.modo === "diario" && !(datos.diario && datos.diario.dia === hoy())) {
    datos.diario = { dia: hoy(), aciertos: aciertos, total: total };
    registrarActividad();
  } else {
    // Ronda libre: sin XP extra, pero cuenta para las estadísticas.
    partida.xpGanada = 0;
  }

  partida.xpGanada += extra;
  datos.xp += partida.xpGanada;

  const lec = partida.modo === "leccion" ? leccionPorId(partida.cursoId, partida.leccionId) : null;
  sumarMinutos(lec && lec.min ? lec.min : 2);
  guardarDatos();

  $("#resultado-etiqueta").textContent = partida.modo === "leccion"
    ? (cursoPorId(partida.cursoId).tema + " · test de la lección")
    : (partida.modo === "diario" ? "Reto del día" : "Ronda libre");

  $("#aciertos").textContent = aciertos;
  $("#total-marcador").textContent = "/" + total;

  const razon = aciertos / total;
  let frase;
  if (partida.modo === "leccion") {
    frase = aprobado
      ? "Test aprobado. La lección queda marcada."
      : "Necesitas 2 de 3 para aprobar. Vuelve al texto y repítelo: no es un castigo, es cómo se aprende.";
  } else if (razon === 1)      frase = "Ronda perfecta. No hay nada que corregir.";
  else if (razon >= 0.7)       frase = "Bien. Te faltan detalles, no bases.";
  else if (razon >= 0.4)       frase = "A la mitad. Repasa lo que falló y vuelve.";
  else                          frase = "Flojo, pero ya sabes dónde está el hueco.";
  $("#veredicto-final").textContent = frase;

  $("#xp-ganada").textContent = partida.xpGanada > 0 ? "+" + partida.xpGanada + " XP" : "";

  const mins = minutosHoy();
  $("#cierre").textContent = mins >= 15
    ? "Llevas " + mins + " min hoy. Más que suficiente: ciérralo y mañana seguimos."
    : "Sesión completa · hoy llevas " + mins + " min. Mañana hay otra lección.";

  // Fallos
  const cont = $("#fallos");
  cont.innerHTML = "";
  if (partida.fallos.length === 0) {
    cont.innerHTML = '<p class="veredicto-final">Sin fallos.</p>';
  } else {
    partida.fallos.forEach((f) => {
      const div = document.createElement("div");
      div.className = "fallo";
      div.innerHTML =
        '<p class="pregunta-fallo">' + f.q + "</p>" +
        '<p class="respuesta">' + f.correcta + "</p>" +
        (f.elegida ? '<p class="veredicto-final">Elegiste: ' + f.elegida + "</p>" : "");
      cont.appendChild(div);
    });
  }

  // Botones
  const btnOtra = $("#btn-otra");
  if (partida.modo === "leccion") {
    const sig = siguienteEnCurso(partida.cursoId, partida.leccionId);
    btnOtra.textContent = sig ? "Siguiente lección" : "Volver al curso";
    btnOtra.onclick = () => {
      if (sig) abrirLeccion(partida.cursoId, sig.id);
      else abrirCurso(partida.cursoId);
    };
  } else {
    btnOtra.textContent = "Otra ronda";
    btnOtra.onclick = () => empezarReto(true);
  }

  mostrar("resultado");
}

/* ── Eventos ────────────────────────────────────────────────── */

$("#btn-continuar").addEventListener("click", () => {
  const p = siguientePendiente();
  if (p) abrirLeccion(p.curso.id, p.leccion.id);
  else abrirCurso(window.CURSOS[0].id);
});

$("#btn-diario").addEventListener("click", () => empezarReto(false));
$("#btn-siguiente").addEventListener("click", siguiente);
$("#btn-inicio").addEventListener("click", () => { pintarInicio(); mostrar("inicio"); });
$("#btn-curso-salir").addEventListener("click", () => { pintarInicio(); mostrar("inicio"); });$("#btn-leccion-salir").addEventListener("click", () => abrirCurso(cursoAbierto));
$("#btn-volver-curso").addEventListener("click", () => abrirCurso(cursoAbierto));
$("#btn-test").addEventListener("click", () => empezarTest(cursoAbierto, leccionAbierta));

$("#btn-salir").addEventListener("click", () => {
  pararTiempo();
  pintarInicio();
  mostrar("inicio");
});

$("#btn-tiempo").addEventListener("click", () => {
  datos.tiempo = !datos.tiempo;
  guardarDatos();
  pintarInicio();
});

$("#btn-reset").addEventListener("click", () => {
  if (!confirm("¿Borrar racha, XP y progreso de los cursos? No se puede deshacer.")) return;
  datos = Object.assign({}, POR_DEFECTO);
  datos.vistas = {};
  datos.tests = {};
  guardarDatos();
  pintarInicio();
});

document.addEventListener("keydown", (e) => {
  if ($("#vista-juego").classList.contains("oculto")) return;
  if (e.key >= "1" && e.key <= "4") {
    const b = $$("#opciones .opcion")[Number(e.key) - 1];
    if (b && !b.disabled) b.click();
  }
  if (e.key === "Enter" && !$("#feedback").classList.contains("oculto")) {
    e.preventDefault();
    siguiente();
  }
});

/* ── Arranque ───────────────────────────────────────────────── */

pintarInicio();
mostrar("inicio");

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => { /* offline opcional */ });
  });
}
