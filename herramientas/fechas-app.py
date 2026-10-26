#!/usr/bin/env python3
# -*- coding: utf-8 -*-
p = "js/app.js"
lineas = open(p, encoding="utf-8").readlines()

out = []
for ln in lineas:
    # 1. Insertar función fechasHtml después del bloque leccionPorId
    if "return c ? c.lecciones.find((l) => l.id === lecId) : null;" in ln:
        out.append(ln)
        out.append("""

function fechasHtml(t) {
  return t
    .replace(/(\\b\\d{1,2} de [a-za-záéíóúñ]+ de \\d{4}\\b)/gi, "<strong class='fecha'>$1</strong>")
    .replace(/(?<![\\d.,])(\\b(?:1\\d{3}|2\\d{3})\\b)(?![\\d.,%])/g, "<strong class='fecha'>$1</strong>")
    .replace(/(siglo\\s+[a-za-záéíóúñ]+)/gi, "<strong class='fecha'>$1</strong>");
}
""")
        continue

    # 2. Lección: textContent -> innerHTML
    if "    el.textContent = p;" in ln:
        ln = ln.replace("el.textContent = p;", "el.innerHTML = fechasHtml(p);")

    # 3. Pregunta
    if '$("#pregunta").textContent = p.q;' in ln:
        ln = ln.replace('$("#pregunta").textContent = p.q;', '$("#pregunta").innerHTML = fechasHtml(p.q);')

    # 4. Opciones
    if "b.innerHTML = '<span class=\"letra\">'" in ln:
        ln = ln.replace('+ texto + "', '+ fechasHtml(texto) + "')

    # 5. Explicación
    if '$("#explica").textContent = acierto' in ln:
        ln = ln.replace('$("#explica").textContent = acierto', '$("#explica").innerHTML = fechasHtml(acierto')

    out.append(ln)

s = "".join(out)
open(p, "w", encoding="utf-8").write(s)
print("app.js modificado")
