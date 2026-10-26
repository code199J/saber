#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Reemplazos dirigidos con gramática correcta en cursos.js y questions.js.
"""
import re

CAMBIOS = [
    # (archivo, buscar, reemplazar)
    ("js/cursos.js", "el clero, la nobleza", "la gente de la iglesia, la nobleza"),
    ("js/cursos.js", "por estamento", "por grupo social"),
    ("js/cursos.js", "la soberanía no viene", "el poder propio no viene"),
    ("js/cursos.js", "una nomenclatura envejecida", "un grupo dirigente envejecido"),
    ("js/cursos.js", "una utopía incómoda", "una idea difícil de alcanzar"),
    ("js/cursos.js", "es fiduciario", "es basado en la confianza"),
    ("js/cursos.js", "esa convertibilidad", "ese cambio por oro"),
    ("js/cursos.js", "la convertibilidad en oro", "el cambio por oro en oro"),
    ("js/cursos.js", "el dinero es fiduciario", "el dinero es basado en la confianza"),
    ("js/cursos.js", "dinero fiduciario", "dinero basado en la confianza"),
    ("js/cursos.js", "una canasta de bienes", "una lista de bienes"),
    ("js/cursos.js", "que se pondera según", "que se considera según"),
    ("js/cursos.js", "aparece la hiperinflación", "aparece una inflación descontrolada"),
    ("js/cursos.js", "la hiperinflación de 2017", "una inflación descontrolada de 2017"),
    ("js/cursos.js", "la indexación, ajustar", "el ajuste por inflación, ajustar"),
    ("js/cursos.js", "de una canasta", "de una lista"),
    ("js/cursos.js", "sigue una canasta", "sigue una lista"),
    ("js/cursos.js", "Una deflación", "Una bajada de precios"),
    ("js/cursos.js", "Una hiperinflación", "Una inflación descontrolada"),
    ("js/cursos.js", "Un default", "Un impago de deuda"),
    ("js/cursos.js", "El default es", "Un impago de deuda es"),
    ("js/cursos.js", "entró en default", "entró en impago de deuda"),
    ("js/cursos.js", "¿Qué es un default?", "¿Qué es un impago de deuda?"),
    ("js/cursos.js", "evita el default", "evita el impago de deuda"),
    ("js/cursos.js", "la macroeconomía mundial", "la economía en conjunto mundial"),
    ("js/cursos.js", "sin aranceles altos", "sin impuestos de importación altos"),
    ("js/cursos.js", "aranceles, prohibiciones", "impuestos de importación, prohibiciones"),
    ("js/questions.js", "países soberanos", "países independientes"),
]

for archivo, buscar, reemplazar in CAMBIOS:
    with open(archivo, "r", encoding="utf-8") as f:
        contenido = f.read()
    conteo = contenido.count(buscar)
    if conteo == 0:
        print(f"NO ENCONTRADO en {archivo}: {buscar[:50]}")
    else:
        contenido = contenido.replace(buscar, reemplazar)
        with open(archivo, "w", encoding="utf-8") as f:
            f.write(contenido)
        print(f"{archivo}: '{buscar[:40]}...' -> {conteo}x")

print("\nVerificando sintaxis JS...")
