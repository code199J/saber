#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Simplifica palabras rebuscadas en los textos de cursos.js y questions.js.
Solo reemplaza dentro de strings de contenido (texto de lecciones, preguntas, explicaciones).
"""
import re
import sys

# Diccionario: palabra complicada -> palabra simple
REMPLAZOS = [
    (r"\bnomenklatura\b", "grupo dirigente"),
    (r"\bnomenclatura\b", "grupo dirigente"),
    (r"\bsoberanía\b", "poder propio"),
    (r"\bsoberano\b", "independiente"),
    (r"\bestamento\b", "grupo social"),
    (r"\bestamentos\b", "grupos sociales"),
    (r"\bclero\b", "gente de la iglesia"),
    (r"\bfiduciario\b", "basado en la confianza"),
    (r"\bconvertibilidad\b", "cambio por oro"),
    (r"\bcanasta\b", "lista"),
    (r"\bpondera\b", "considera"),
    (r"\bindexación\b", "ajuste por inflación"),
    (r"\bdeflación\b", "bajada de precios"),
    (r"\butopía\b", "idea difícil de alcanzar"),
    (r"\butópica\b", "difícil de alcanzar"),
    (r"\bmacroeconomía\b", "economía en conjunto"),
    (r"\bhiperinflación\b", "inflación descontrolada"),
    (r"\barancel\b", "impuesto de importación"),
    (r"\baranceles\b", "impuestos de importación"),
    (r"\bdefault\b", "impago de deuda"),
    (r"\bdisuasión\b", "disuadir"),
    (r"\bpermeable\b", "que deja pasar"),
    (r"\bdisuasorio\b", "que disuade"),
    (r"\bpermeabilidad\b", "capacidad de dejar pasar"),
]

def simplificar_texto(texto):
    for patron, reemplazo in REMPLAZOS:
        texto = re.sub(patron, reemplazo, texto, flags=re.IGNORECASE)
    return texto

def procesar_archivo(ruta):
    with open(ruta, "r", encoding="utf-8") as f:
        contenido = f.read()

    # Encontrar todos los strings de texto entre comillas dobles (contenido)
    # Patrón: "contenido" o 'contenido'
    def reemplazar_en_string(m):
        interior = m.group(1)
        nuevo = simplificar_texto(interior)
        return '"' + nuevo + '"'

    # Reemplazar dentro de strings simples "texto" (no en URLs ni código)
    nuevo_contenido = re.sub(r'"([^"\\]*(?:\\.[^"\\]*)*)"', reemplazar_en_string, contenido)

    with open(ruta, "w", encoding="utf-8") as f:
        f.write(nuevo_contenido)

    print(f"Procesado: {ruta}")

if __name__ == "__main__":
    for ruta in sys.argv[1:]:
        procesar_archivo(ruta)
