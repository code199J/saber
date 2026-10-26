#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Añade función fechasHtml() y la usa en el renderizado de lecciones, preguntas y explicaciones.
"""

p = "js/app.js"
s = open(p, encoding="utf-8").read()

# 1. Añadir función fechasHtml después de leccionPorId
anclaje = """function leccionPorId(cursoId, lecId) {
  const c = cursoPorId(cursoId);
  return c ? c.lecciones.find((l) => l.id === lecId) : null;
}
"""

funcion = anclaje + """

// ── Fechas destacadas ─────────────────────────────────────────
// Envuelve años (1000-2999), fechas tipo "14 de julio de 1789" y siglos
// en <strong class="fecha"> para que resalten al leer.
function fechasHtml(texto) {
  return texto
    // Fechas completas primero: "14 de julio de 1789"
    .replace(/(\b\d{1,2} de [a-záéíóúñ]+ de \d{4}\b)/gi, "<strong class='fecha'>$1</strong>")
    // Años sueltos de 4 dígitos (1000-2999), no parte de números mayores
    .replace(/(?<![\d.,])(\b(?:1\d{3}|2\d{3})\b)(?![\d.,%])/g, "<strong class='fecha'>$1</strong>")
    // Siglos: "siglo XVIII", "siglo XV"
    .replace(/(siglo\s+[a-záéíóúñ]+)/gi, "<strong class='fecha'>$1</strong>");
}
"""

assert s.count(anclaje) == 1, "no se encontro anclaje leccionPorId"
s = s.replace(anclaje, funcion)

# 2. Lección: textContent -> innerHTML con fechasHtml
anclaje2 = """  l.texto.forEach((p) => {
    const el = document.createElement("p");
    el.textContent = p;
    art.appendChild(el);
  });"""
reemplazo2 = """  l.texto.forEach((p) => {
    const el = document.createElement("p");
    el.innerHTML = fechasHtml(p);
    art.appendChild(el);
  });"""
assert s.count(anclaje2) == 1, "no se encontro renderizado de leccion"
s = s.replace(anclaje2, reemplazo2)

# 3. Pregunta: textContent -> innerHTML con fechasHtml
anclaje3 = '  $("#pregunta").textContent = p.q;'
reemplazo3 = '  $("#pregunta").innerHTML = fechasHtml(p.q);'
assert s.count(anclaje3) == 1, "no se encontro renderizado de pregunta"
s = s.replace(anclaje3, reemplazo3)

# 4. Opciones: envolver texto de opción con fechasHtml
anclaje4 = '    b.innerHTML = \'<span class="letra">' + "'" + ''' + letras[i] + "</span><span>" + texto + "</span>';'''
# Buscar la línea exacta de opciones
linea_opciones = '    b.innerHTML = \'<span class="letra">' + letras[i] if False else None

# Buscar de forma más robusta
anclaje4b = 'b.innerHTML = '
reemplazo4b = 'b.innerHTML = \'<span class="letra">' + letras[i] + '</span><span>" + fechasHtml(texto) + "</span>\';'

# La línea original es:
# b.innerHTML = '<span class="letra">' + letras[i] + "</span><span>" + texto + "</span>";
anclaje4c = 'b.inner_html_marker'
# Vamos a hacer replace directo de la linea completa
linea_original = '    b.innerHTML = \'<span class="letra">' + " '" + ''' + letras[i] + "</span><span>" + texto + "</span>';'''
# Mejor buscar por substring unico
if "'<span class=\"letra\">' + letras[i] + \"</span><span>\" + texto + \"</span>\"" in s:
    s = s.replace(
        "'<span class=\"letra\">' + letras[i] + \"</span><span>\" + texto + \"</span>\"",
        "'<span class=\"letra\">' + letras[i] + \"</span><span>\" + fechasHtml(texto) + \"</span>\""
    )
    print("opciones reemplazado")
else:
    print("NO SE ENCONTRO linea de opciones")

# 5. Explicación: textContent -> innerHTML con fechasHtml
anclaje5a = '    ? p.e'
anclaje5b = ': "La respuesta era " + p.opciones[p.correcta] + ". " + p.e;'
# Buscar el bloque completo
bloque_explica = '''  $("#explica").textContent = acierto
    ? p.e
    : "La respuesta era " + p.opciones[p.correcta] + ". " + p.e;'''
bloque_nuevo = '''  $("#explica").innerHTML = fechasHtml(acierto
    ? p.e
    : "La respuesta era " + p.opciones[p.correcta] + ". " + p.e);'''
assert s.count(bloque_explica) == 1, "no se encontro bloque explica"
s = s.replace(bloque_explica, bloque_nuevo)

open(p, "w", encoding="utf-8").write(s)
print("app.js modificado")
