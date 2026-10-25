/* Saber — lógica de la app. Sin frameworks, sin red, sin dependencias. */

const $  = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));

const CLAVE = "saber.v1";
const MINUTOS = 25;          // segundos por pregunta
const POR_RONDA = 10;        // preguntas por partida

/* ── Almacenamiento ─────────────────────────────────────────── */

const POR_DEFECTO = {
  partidas: 0,
  aciertos: 0,
  total: 0,
  racha: 0,
  mejorRacha: 0,
  ultimoDia: null,
  diario: null,        // { dia, aciertos, total }
  tiempo: true
};

function cargarDatos() {
  let guardado = {};
  try { guardado = JSON.parse(localStorage.getItem(CLAVE)) || {}; } catch (e) { guardado = {}; }
  const d = Object.assign({}, POR_DEFECTO, guardado);

  // La racha se rompe si el último día jugado no fue hoy ni ayer.
  if (d.ultimoDia && d.ultimoDia !== hoy() && d.ultimoDia !== ayer()) d.racha = 0;
  return d;
}

function guardarDatos() {
  try { localStorage.setItem(CLAVE, JSON.stringify(datos)); } catch (e) { /* modo privado */ }
}

let datos = cargarDatos();

/* ── Fechas y azar reproducible ─────────────────────────────── */

function fechaISO(d) {
  return d.getFullYear() + "-" +
    String(d.getMonth() + 1).padStart(2, "0") + "-" +
    String(d.getDate()).padStart(2, "0");
}
// Declaraciones de función (no `const`) a propósito: se usan desde
// cargarDatos(), que corre antes de esta línea.
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

/* ── Preparación de preguntas ───────────────────────────────── */

// Convierte una entrada del banco en algo jugable: opciones barajadas y
// la posición de la respuesta correcta recalculada.
function preparar(p, azar = Math.random) {
  const correctaTexto = p.o[p.a];
  const opciones = mezclar(p.o, azar);
  return {
    cat: p.c,
    q: p.q,
    e: p.e,
    opciones: opciones,
    correcta: opciones.indexOf(correctaTexto)
  };
}

function nombreCategoria(id) {
  const c = window.CATEGORIAS.find((x) => x.id === id);
  return c ? c.nombre : id;
}

function rondaDiaria() {
  const azar = generador(hashSemilla("saber-" + hoy()));
  return mezclar(window.BANCO, azar).slice(0, POR_RONDA).map((p) => preparar(p, azar));
}

function rondaLibre() {
  return mezclar(window.BANCO).slice(0, POR_RONDA).map((p) => preparar(p));
}

function rondaDeCategoria(cat) {
  const delTema = window.BANCO.filter((p) => p.c === cat);
  return mezclar(delTema).slice(0, POR_RONDA).map((p) => preparar(p));
}

/* ── Estado de la partida ───────────────────────────────────── */

const partida = {
  preguntas: [],
  indice: 0,
  aciertos: 0,
  puntos: 0,
  fallos: [],
  modo: "diario",
  categoria: null,
  bloqueado: false,
  temporizador: null,
  restante: 0
};

/* ── Vistas ─────────────────────────────────────────────────── */

function mostrar(vista) {
  ["inicio", "juego", "resultado"].forEach((v) => {
    $("#vista-" + v).classList.toggle("oculto", v !== vista);
  });
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
}

function pintarInicio() {
  $("#racha-num").textContent = datos.racha;
  $("#racha-txt").textContent = datos.racha === 1 ? "día seguido" : "días seguidos";

  const yaJugo = datos.diario && datos.diario.dia === hoy();
  if (yaJugo) {
    $("#diario-tag").textContent = "Reto de hoy · hecho";
    $("#diario-titulo").textContent = "Jugar una ronda libre";
    $("#diario-sub").textContent = "Hoy acertaste " + datos.diario.aciertos + " de " + datos.diario.total;
  } else {
    $("#diario-tag").textContent = "Reto de hoy";
    $("#diario-titulo").textContent = "Jugar " + POR_RONDA + " preguntas";
    $("#diario-sub").textContent = "Un tema distinto cada día";
  }

  // Temas
  const cont = $("#temas");
  cont.innerHTML = "";
  window.CATEGORIAS.forEach((c) => {
    const cuantas = window.BANCO.filter((p) => p.c === c.id).length;
    const b = document.createElement("button");
    b.className = "tema";
    b.type = "button";
    b.innerHTML = "<span>" + c.nombre + "</span><small>" + cuantas + " preguntas</small>";
    b.addEventListener("click", () => empezar("categoria", c.id));
    cont.appendChild(b);
  });

  // Estadísticas
  const precision = datos.total ? Math.round((datos.aciertos / datos.total) * 100) : 0;
  $("#stats").innerHTML =
    bloqueStat(datos.partidas, datos.partidas === 1 ? "ronda" : "rondas") +
    bloqueStat(precision + "%", "aciertos") +
    bloqueStat(datos.mejorRacha, "mejor racha");

  $("#btn-tiempo").textContent = datos.tiempo ? "Tiempo: " + MINUTOS + " s" : "Tiempo: libre";
}

function bloqueStat(valor, etiqueta) {
  return '<div class="stat"><b>' + valor + "</b><span>" + etiqueta + "</span></div>";
}

/* ── Partida ────────────────────────────────────────────────── */

function empezar(modo, categoria) {
  if (modo === "categoria") {
    partida.preguntas = rondaDeCategoria(categoria);
  } else if (modo === "diario" && !(datos.diario && datos.diario.dia === hoy())) {
    partida.preguntas = rondaDiaria();
  } else {
    partida.preguntas = rondaLibre();
  }

  Object.assign(partida, {
    indice: 0,
    aciertos: 0,
    puntos: 0,
    fallos: [],
    modo: modo,
    categoria: categoria || null,
    bloqueado: false
  });

  mostrar("juego");
  pintarPregunta();
}

function pintarPregunta() {
  const p = partida.preguntas[partida.indice];
  const n = partida.preguntas.length;

  $("#progreso-txt").textContent = (partida.indice + 1) + " / " + n;
  $("#puntos-txt").textContent = partida.puntos + " pts";
  $("#etiqueta-cat").textContent = nombreCategoria(p.cat);
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
    b.addEventListener("click", () => responder(i, b));
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

  if (!datos.tiempo) {
    barra.style.width = "0%";
    return;
  }

  partida.restante = MINUTOS * 1000;
  barra.style.width = "100%";

  const inicio = performance.now();
  partida.temporizador = setInterval(() => {
    const pasado = performance.now() - inicio;
    const queda = Math.max(0, partida.restante - pasado);
    const pct = (queda / partida.restante) * 100;
    barra.style.width = pct + "%";
    barra.classList.toggle("urgente", pct < 30);

    if (queda <= 0) {
      pararTiempo();
      responder(-1, null);
    }
  }, 100);
}

function pararTiempo() {
  if (partida.temporizador) {
    clearInterval(partida.temporizador);
    partida.temporizador = null;
  }
}

function responder(elegida, boton) {
  if (partida.bloqueado) return;
  partida.bloqueado = true;
  pararTiempo();

  const p = partida.preguntas[partida.indice];
  const n = partida.preguntas.length;
  const acierto = elegida === p.correcta;
  const botones = $$("#opciones .opcion");

  botones.forEach((b, i) => {
    b.disabled = true;
    if (i === p.correcta) b.classList.add("elegida-bien");
    else if (i === elegida) b.classList.add("elegida-mal");
    else b.classList.add("apagada");
  });

  // Puntos: 100 por acierto + bonus por rapidez (hasta 50).
  if (acierto) {
    partida.aciertos++;
    let bonus = 0;
    if (datos.tiempo) {
      const barra = $("#barra-tiempo");
      const pct = parseFloat(barra.style.width) || 0;
      bonus = Math.round((pct / 100) * 50);
    }
    partida.puntos += 100 + bonus;
    $("#puntos-txt").textContent = partida.puntos + " pts";
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
  if (partida.indice >= partida.preguntas.length) {
    terminar();
    return;
  }
  pintarPregunta();
}

function terminar() {
  pararTiempo();

  const total = partida.preguntas.length;
  const aciertos = partida.aciertos;

  datos.partidas++;
  datos.aciertos += aciertos;
  datos.total += total;

  // Racha y registro del reto diario solo cuentan la primera vez del día.
  if (partida.modo === "diario" && !(datos.diario && datos.diario.dia === hoy())) {
    datos.racha = (datos.ultimoDia === ayer()) ? datos.racha + 1 : 1;
    datos.ultimoDia = hoy();
    datos.mejorRacha = Math.max(datos.mejorRacha, datos.racha);
    datos.diario = { dia: hoy(), aciertos: aciertos, total: total };
  }

  guardarDatos();

  $("#aciertos").textContent = aciertos;
  $("#total-marcador").textContent = "/" + total;

  const razon = aciertos / total;
  let frase;
  if (razon === 1)          frase = "Ronda perfecta. No hay nada que corregir.";
  else if (razon >= 0.8)    frase = "Muy bien. Te faltan detalles, no bases.";
  else if (razon >= 0.5)    frase = "Vas a la mitad. Repasa lo que falló y vuelve.";
  else if (razon >= 0.3)    frase = "Flojo, pero ya sabes dónde está el hueco.";
  else                      frase = "Toca estudiar. Empieza por los fallos de abajo.";
  $("#veredicto-final").textContent = frase;

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

  $("#btn-otra").textContent = partida.modo === "categoria"
    ? "Otra de " + nombreCategoria(partida.categoria)
    : "Otra ronda";

  mostrar("resultado");
}

/* ── Eventos ────────────────────────────────────────────────── */

$("#btn-diario").addEventListener("click", () => empezar("diario"));
$("#btn-siguiente").addEventListener("click", siguiente);
$("#btn-inicio").addEventListener("click", () => { pintarInicio(); mostrar("inicio"); });

$("#btn-otra").addEventListener("click", () => {
  if (partida.modo === "categoria") empezar("categoria", partida.categoria);
  else empezar("libre");
});

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
  if (!confirm("¿Borrar racha, estadísticas y progreso? No se puede deshacer.")) return;
  datos = Object.assign({}, POR_DEFECTO);
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
