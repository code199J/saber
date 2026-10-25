#!/usr/bin/env python3
"""Baja imágenes de Wikimedia Commons con licencia libre para las lecciones.

- Solo acepta dominio público, CC0, CC BY y CC BY-SA (con atribución).
- Recorta a 16:9 y guarda WebP de 720 px de ancho.
- Escribe credits.json con autor, licencia y enlace a la ficha del archivo.

Uso: python3 herramientas/bajar-imagenes.py
"""

import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request

from PIL import Image

API = "https://commons.wikimedia.org/w/api.php"
UA = "Saber/1.0 (app personal; contacto: code199J)"
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SALIDA = os.path.join(RAIZ, "images")
CREDITOS = os.path.join(RAIZ, "credits.json")
ESPERA = 2.0  # Commons pide moderación: una petición cada 2 s

# Lección → consulta de búsqueda (o nombre exacto de archivo, con prefijo "=").
OBJETIVOS = {
    "h1": "=Prise de la Bastille.jpg",
    "h2": "=The Mule Room in the New Bedford Cotton Mill. Some small boys are employes in mule rooms. LOC nclc.02476.jpg",
    "h3": "=19170704 Riot on Nevsky prosp Petrograd.jpg",
    "h4": "=November The Wall Berlin - Germany Photography 1989 - panoramio.jpg",
    "c1": "=WMAP 2012.png",
    "c2": "=Einstein 1921 by F Schmutzer - restoration.jpg",
    "c3": "=Charles Darwin seated crop.jpg",
    "c4": "=DNA Double Helix by NHGRI.jpg",
    "f1": "Socrates bust Louvre",
    "f2": "=Plato Silanion Musei Capitolini MC1377.jpg",
    "f3": "=Aristotle Altemps Inv8575.jpg",
    "f4": "Marcus Aurelius bust",
    "e1": "United States one dollar bill obverse",
    "e2": "German inflation 1923 banknotes",
    "e3": "Eccles Building Federal Reserve",
    "e4": "1000 francs bond certificate Chargeurs Reunis",
    "g1": "=Yalta Conference (Churchill, Roosevelt, Stalin) (B&W).jpg",
    "g2": "=Lucas gusher (Spindletop, Beaumont, Port Arthur, and vicinity, Texas - oil industry). LCCN2010649511.jpg",
    "g3": "=20201112 The skyline at Shenzhen Bay.jpg",
    "g4": "United Nations General Assembly hall",
}

PERMITIDAS = (
    "public domain", "cc0", "cc by 4.0", "cc by-sa 4.0", "cc by 3.0",
    "cc by-sa 3.0", "cc by 2.5", "cc by-sa 2.5", "cc by 2.0", "cc by-sa 2.0",
)


def api(params):
    params = dict(params, format="json")
    url = API + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    for intento in range(5):
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                return json.load(r)
        except urllib.error.HTTPError as e:
            if e.code != 429:
                raise
            espera = 5 * (intento + 1)
            print("  … límite de peticiones, esperando", espera, "s")
            time.sleep(espera)
    raise RuntimeError("Commons sigue limitando las peticiones")


def bajar(url, destino):
    for intento in range(4):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=60) as r:
                with open(destino, "wb") as f:
                    f.write(r.read())
            return True
        except urllib.error.HTTPError as e:
            if e.code != 429:
                raise
            time.sleep(6 * (intento + 1))
    return False


def limpiar_html(texto):
    texto = re.sub(r"<[^>]+>", "", texto or "")
    return re.sub(r"\s+", " ", texto).strip()


def licencia_ok(em):
    nombre = limpiar_html(em.get("LicenseShortName", {}).get("value", "")).lower()
    if nombre.startswith("pd") or "public domain" in nombre:
        return True
    return any(nombre.startswith(p) for p in PERMITIDAS)


def datos_archivo(titulo):
    if not titulo.startswith("File:"):
        titulo = "File:" + titulo
    r = api({
        "action": "query", "titles": titulo, "prop": "imageinfo",
        "iiprop": "url|extmetadata|size", "iiurlwidth": "1200",
    })
    paginas = r.get("query", {}).get("pages", {})
    for p in paginas.values():
        if "imageinfo" not in p:
            return None
        ii = p["imageinfo"][0]
        em = ii.get("extmetadata", {})
        if not licencia_ok(em):
            continue
        if ii.get("width", 0) < 800:
            continue
        return {
            "titulo": p["title"],
            "url": ii.get("thumburl") or ii["url"],
            "ancho": ii["width"],
            "alto": ii["height"],
            "licencia": limpiar_html(em.get("LicenseShortName", {}).get("value", "")),
            "autor": limpiar_html(em.get("Artist", {}).get("value", ""))[:120],
            "pagina": ii.get("descriptionurl", ""),
        }
    return None


def buscar(consulta, limite=8):
    r = api({
        "action": "query", "list": "search",
        "srsearch": "filetype:bitmap " + consulta,
        "srnamespace": "6", "srlimit": str(limite),
    })
    return [x["title"] for x in r.get("query", {}).get("search", [])]


def recortar(img):
    """Recorte 16:9 con sesgo hacia arriba, para no cortar caras en retratos."""
    w, h = img.size
    objetivo = 16 / 9
    if w / h > objetivo:
        nuevo_w = int(h * objetivo)
        x0 = (w - nuevo_w) // 2
        caja = (x0, 0, x0 + nuevo_w, h)
    else:
        nuevo_h = int(w / objetivo)
        y0 = int((h - nuevo_h) * 0.35)
        caja = (0, y0, w, y0 + nuevo_h)
    return img.crop(caja).resize((720, 405), Image.LANCZOS)


def main():
    os.makedirs(SALIDA, exist_ok=True)
    creditos = {}
    if os.path.exists(CREDITOS):
        with open(CREDITOS, encoding="utf-8") as f:
            creditos = json.load(f)

    fallos = []
    for lec, consulta in OBJETIVOS.items():
        destino = os.path.join(SALIDA, lec + ".webp")
        if os.path.exists(destino):
            print("·", lec, "ya existe")
            continue

        candidatos = [consulta[1:]] if consulta.startswith("=") else buscar(consulta)
        elegido = None
        for titulo in candidatos:
            try:
                elegido = datos_archivo(titulo)
            except Exception as e:
                print("  !", titulo, e)
                elegido = None
            time.sleep(ESPERA)
            if elegido:
                break

        if not elegido:
            fallos.append(lec)
            print("✗", lec, "sin candidato libre")
            continue

        try:
            tmp = "/tmp/img-" + lec
            if not bajar(elegido["url"], tmp):
                raise RuntimeError("descarga rechazada")
            with Image.open(tmp) as img:
                recortar(img.convert("RGB")).save(destino, "WEBP", quality=78, method=6)
            os.remove(tmp)
        except Exception as e:
            fallos.append(lec)
            print("✗", lec, "error bajando:", e)
            continue

        creditos[lec] = {k: elegido[k] for k in ("titulo", "autor", "licencia", "pagina")}
        print("✓", lec, "→", elegido["licencia"], "|", elegido["autor"][:50])

    with open(CREDITOS, "w", encoding="utf-8") as f:
        json.dump(creditos, f, ensure_ascii=False, indent=2)

    print("\nlistas:", len(creditos), "| fallos:", fallos)
    return 1 if fallos else 0


if __name__ == "__main__":
    sys.exit(main())
