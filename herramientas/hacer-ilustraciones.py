#!/usr/bin/env python3
"""Genera las ilustraciones de Saber: una escena vectorial por lección.

Estilo: serigrafía editorial. Fondo tinta con degradado, siluetas planas y
dos acentos (ámbar y coral). Todo se dibuja a 3x y se reduce, así los bordes
quedan limpios. Salida: images/<id>.webp de 720x405.

Uso:
    python3 herramientas/hacer-ilustraciones.py            # todas
    python3 herramientas/hacer-ilustraciones.py h1 t3      # solo algunas
"""

import math
import os
import random
import sys

from PIL import Image, ImageDraw, ImageFilter

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SALIDA = os.path.join(RAIZ, "images")

W, H = 720, 405
S = 3  # supermuestreo

TINTA = (11, 23, 27)
FONDO_A = (12, 30, 36)
FONDO_B = (24, 58, 68)
CREMA = (242, 237, 227)
AMBAR = (228, 163, 60)
TEAL = (94, 154, 162)
CORAL = (201, 97, 74)
GRIS = (39, 80, 90)
NEGRO = (7, 16, 19)


def mescla(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


class Lienzo:
    def __init__(self, arriba=FONDO_A, abajo=FONDO_B):
        self.img = Image.new("RGB", (W * S, H * S), TINTA)
        d = ImageDraw.Draw(self.img)
        for y in range(H * S):
            t = y / (H * S - 1)
            d.line([(0, y), (W * S, y)], fill=mescla(arriba, abajo, t ** 0.9))
        self.d = d

    def fondo(self, arriba, abajo):
        for y in range(H * S):
            t = y / (H * S - 1)
            self.d.line([(0, y), (W * S, y)], fill=mescla(arriba, abajo, t ** 0.9))

    # ── primitivas (coordenadas en espacio 720x405) ──────────────────
    def poly(self, pts, fill=None, outline=None, ancho=1):
        pts = [(x * S, y * S) for x, y in pts]
        self.d.polygon(pts, fill=fill, outline=outline)
        if outline and ancho > 1:
            self.d.line(pts + [pts[0]], fill=outline, width=int(ancho * S), joint="curve")

    def rect(self, x0, y0, x1, y1, fill=None, outline=None, ancho=1, radio=0):
        caja = [x0 * S, y0 * S, x1 * S, y1 * S]
        if radio:
            self.d.rounded_rectangle(caja, radius=radio * S, fill=fill, outline=outline, width=int(ancho * S))
        else:
            self.d.rectangle(caja, fill=fill, outline=outline, width=int(ancho * S))

    def circ(self, cx, cy, r, fill=None, outline=None, ancho=1):
        self.d.ellipse([(cx - r) * S, (cy - r) * S, (cx + r) * S, (cy + r) * S],
                       fill=fill, outline=outline, width=int(ancho * S))

    def elip(self, cx, cy, rx, ry, fill=None, outline=None, ancho=1):
        self.d.ellipse([(cx - rx) * S, (cy - ry) * S, (cx + rx) * S, (cy + ry) * S],
                       fill=fill, outline=outline, width=int(ancho * S))

    def linea(self, pts, fill=CREMA, ancho=2):
        self.d.line([(x * S, y * S) for x, y in pts], fill=fill,
                    width=int(ancho * S), joint="curve")

    def arco(self, caja, inicio, fin, fill=CREMA, ancho=2):
        self.d.arc([v * S for v in caja], inicio, fin, fill=fill, width=int(ancho * S))

    def punto(self, x, y, r=3, fill=AMBAR):
        self.circ(x, y, r, fill=fill)

    def grano(self, fuerza=10):
        ruido = Image.effect_noise((W * S, H * S), fuerza).convert("L")
        self.img = Image.composite(Image.new("RGB", self.img.size, (255, 255, 255)),
                                   self.img, ruido.point(lambda v: int(v * 0.10)))

    def guardar(self, nombre):
        final = self.img.resize((W, H), Image.LANCZOS)
        final = final.filter(ImageFilter.UnsharpMask(radius=1.1, percent=45, threshold=2))
        ruta = os.path.join(SALIDA, nombre + ".webp")
        final.save(ruta, "WEBP", quality=82, method=6)
        return ruta


# ── piezas reutilizables ────────────────────────────────────────────

def estrella(c, cx, cy, r, fill=AMBAR, puntas=5, giro=-90):
    pts = []
    for i in range(puntas * 2):
        radio = r if i % 2 == 0 else r * 0.42
        a = math.radians(giro + i * 180 / puntas)
        pts.append((cx + radio * math.cos(a), cy + radio * math.sin(a)))
    c.poly(pts, fill=fill)


def nube_humo(c, cx, cy, r, color=GRIS, n=4):
    for i in range(n):
        dx = math.sin(i * 1.7) * r * 0.55
        dy = -i * r * 0.42
        c.circ(cx + dx, cy + dy, r * (1 - i * 0.12), fill=color)


def multitud(c, y, color=NEGRO, filas=2, ancho=W):
    """Cabezas y hombros en silueta a lo largo del borde inferior."""
    random.seed(7)
    for fila in range(filas):
        yy = y + fila * 16
        x = -10 + fila * 9
        while x < ancho + 12:
            r = 7 + random.random() * 2.5
            c.circ(x, yy, r, fill=color)
            c.rect(x - r - 2, yy + r * 0.7, x + r + 3, yy + 34, fill=color)
            x += r * 2.6 + random.random() * 9


def fabrica(c, x, base, ancho, alto, color=NEGRO):
    c.rect(x, base - alto, x + ancho, base, fill=color)
    # techo en diente de sierra
    paso = ancho / 4
    for i in range(4):
        x0 = x + i * paso
        c.poly([(x0, base - alto), (x0 + paso, base - alto - 12), (x0 + paso, base - alto)], fill=color)
    # ventanas
    for fila in range(2):
        for col in range(4):
            c.rect(x + 8 + col * (ancho - 16) / 4, base - alto + 14 + fila * 20,
                   x + 8 + col * (ancho - 16) / 4 + 12, base - alto + 24 + fila * 20, fill=AMBAR)


def columna(c, x, base, alto, ancho=26, color=None):
    color = color or (221, 214, 201)
    c.rect(x, base - alto, x + ancho, base, fill=color)
    c.rect(x - 5, base - alto - 9, x + ancho + 5, base - alto, fill=color)
    c.rect(x - 5, base - 8, x + ancho + 5, base, fill=color)
    for i in range(3):
        xx = x + 5 + i * (ancho - 10) / 2
        c.linea([(xx, base - alto + 8), (xx, base - 10)], fill=(198, 190, 176), ancho=1)


def globo(c, cx, cy, r, color=TEAL):
    c.circ(cx, cy, r, fill=color)
    for k in (-0.6, -0.3, 0, 0.3, 0.6):
        rx = r * math.sqrt(max(0.0, 1 - k * k))
        c.arco([cx - rx, cy + r * k - 2, cx + rx, cy + r * k + 2], 0, 180, fill=NEGRO, ancho=1)
    for ang in (0, 45, 90, 135):
        a = math.radians(ang)
        c.linea([(cx - r * math.cos(a), cy - r * math.sin(a)),
                 (cx + r * math.cos(a), cy + r * math.sin(a))], fill=NEGRO, ancho=1)


def chip(c, cx, cy, lado, color=AMBAR):
    c.rect(cx - lado / 2, cy - lado / 2, cx + lado / 2, cy + lado / 2, fill=color, radio=6)
    c.rect(cx - lado / 2 + 10, cy - lado / 2 + 10, cx + lado / 2 - 10, cy + lado / 2 - 10,
           outline=NEGRO, ancho=2, radio=4)
    for i in range(4):
        off = -lado / 2 + lado * (i + 1) / 5
        c.rect(cx + off - 3, cy - lado / 2 - 9, cx + off + 3, cy - lado / 2, fill=color)
        c.rect(cx + off - 3, cy + lado / 2, cx + off + 3, cy + lado / 2 + 9, fill=color)
        c.rect(cx - lado / 2 - 9, cy + off - 3, cx - lado / 2, cy + off + 3, fill=color)
        c.rect(cx + lado / 2, cy + off - 3, cx + lado / 2 + 9, cy + off + 3, fill=color)


# ── escenas ─────────────────────────────────────────────────────────

def h1(c):
    """1789: la Bastilla."""
    c.fondo((13, 31, 39), (138, 92, 64))
    c.circ(360, 296, 132, fill=(232, 166, 90))
    nube_humo(c, 200, 116, 42, color=(64, 80, 82))
    nube_humo(c, 140, 146, 30, color=(64, 80, 82))
    base = 342
    tinta = (19, 39, 47)
    # muralla y almenas
    c.rect(46, base - 116, 674, base, fill=tinta)
    for i in range(15):
        c.rect(48 + i * 42, base - 138, 48 + i * 42 + 26, base - 116, fill=tinta)
    # torre del homenaje
    c.rect(302, base - 250, 418, base, fill=tinta)
    for i in range(3):
        c.rect(302 + i * 40, base - 272, 302 + i * 40 + 28, base - 250, fill=tinta)
    # torres redondas
    for cx in (128, 592):
        c.rect(cx - 56, base - 208, cx + 56, base, fill=tinta)
        c.circ(cx, base - 208, 56, fill=tinta)
        for i in range(4):
            c.rect(cx - 50 + i * 28, base - 262, cx - 32 + i * 28, base - 236, fill=tinta)
    # ventanas y portón
    for (x, y) in ((330, 132), (368, 132), (330, 184), (368, 184), (112, 214), (576, 214)):
        c.rect(x, y, x + 14, y + 30, fill=AMBAR)
    c.rect(344, base - 92, 376, base, fill=(9, 19, 23))
    c.circ(360, base - 92, 16, fill=(9, 19, 23))
    # multitud con picas
    for i in range(9):
        x = 40 + i * 78
        c.linea([(x, base + 40), (x - 4, base - 74)], fill=(150, 140, 128), ancho=2)
    multitud(c, base + 8, filas=2)
    # bandera
    c.linea([(650, base + 20), (650, 150)], fill=CREMA, ancho=3)
    c.poly([(650, 152), (712, 168), (650, 190)], fill=CORAL)


def h2(c):
    """1830: la fábrica."""
    base = 320
    for x, alto in ((70, 120), (260, 170), (440, 100)):
        fabrica(c, x, base, 150, alto)
    for x in (95, 285, 465):
        c.rect(x, base - 175, x + 18, base - 120, fill=NEGRO)
        nube_humo(c, x + 9, base - 195, 20, n=3)
    # engranajes
    for (cx, cy, r, col) in ((600, 250, 46, AMBAR), (655, 305, 30, TEAL)):
        c.circ(cx, cy, r, outline=col, ancho=6)
        c.circ(cx, cy, r * 0.35, outline=col, ancho=4)
        for i in range(10):
            a = math.radians(i * 36)
            c.linea([(cx + r * math.cos(a), cy + r * math.sin(a)),
                     (cx + (r + 9) * math.cos(a), cy + (r + 9) * math.sin(a))], fill=col, ancho=6)
    c.linea([(0, base), (W, base)], fill=CREMA, ancho=2)


def h3(c):
    """1917: el imperio que cae."""
    estrella(c, 360, 110, 74)
    for i in range(12):
        a = math.radians(i * 30)
        c.linea([(360 + 90 * math.cos(a), 110 + 90 * math.sin(a)),
                 (360 + 165 * math.cos(a), 110 + 165 * math.sin(a))], fill=(150, 92, 60), ancho=2)
    c.rect(120, 205, 600, 245, fill=CORAL)
    c.rect(120, 205, 600, 245, outline=NEGRO, ancho=2)
    for i in range(6):
        c.rect(150 + i * 75, 215, 195 + i * 75, 235, fill=NEGRO)
    multitud(c, 300, filas=3)
    c.rect(0, 380, W, H, fill=NEGRO)


def h4(c):
    """1989: el muro."""
    base = 340
    c.rect(0, base, W, H, fill=(9, 20, 24))
    # muro: bloques legibles
    for i, x in enumerate((40, 132, 224, 316, 408)):
        alto = 196 + (i % 2) * 10
        c.rect(x, base - alto, x + 86, base, fill=(30, 63, 72))
        c.rect(x, base - alto, x + 86, base, outline=(74, 118, 128), ancho=2)
        for f in range(3):
            c.linea([(x + 4, base - alto + 44 + f * 50), (x + 82, base - alto + 44 + f * 50)],
                    fill=(22, 48, 56), ancho=2)
    # el hueco con luz
    c.rect(494, base - 210, 560, base, fill=(242, 199, 122))
    for i in range(5):
        c.linea([(496, base - 200 + i * 44), (558, base - 176 + i * 44)], fill=(210, 160, 92), ancho=2)
    # figura que cruza
    c.circ(527, base - 128, 11, fill=(16, 34, 40))
    c.poly([(516, base - 40), (540, base - 40), (536, base - 106), (520, base - 106)], fill=(16, 34, 40))
    # bloques caídos
    c.poly([(596, 300), (672, 282), (686, 330), (610, 348)], fill=(30, 63, 72), outline=(74, 118, 128), ancho=2)
    c.poly([(620, 262), (664, 252), (672, 284), (628, 294)], fill=(30, 63, 72), outline=(74, 118, 128), ancho=2)
    c.linea([(560, base), (W, base)], fill=(74, 118, 128), ancho=2)


def c1(c):
    """Big Bang."""
    cx, cy = 360, 210
    for i in range(9):
        r = 26 + i * 21
        c.circ(cx, cy, r, outline=mescla(AMBAR, TEAL, i / 9), ancho=max(1, 4 - i // 3))
    c.circ(cx, cy, 18, fill=CREMA)
    random.seed(3)
    for i in range(90):
        a = random.random() * math.tau
        d = 40 + random.random() * 240
        rr = 1 + random.random() * 2.6
        c.circ(cx + math.cos(a) * d, cy + math.sin(a) * d, rr,
               fill=AMBAR if i % 3 else TEAL)


def c2(c):
    """Relatividad: la rejilla que se hunde."""
    def hundir(x, y):
        dx, dy = x - 360, y - 205
        d = math.hypot(dx, dy)
        f = 1 - 120 / (d + 160)
        return 360 + dx * f, 205 + dy * f * 0.92

    for x in range(0, 800, 40):
        c.linea([hundir(x, y) for y in range(0, 420, 14)], fill=(46, 88, 98), ancho=1)
    for y in range(0, 420, 40):
        c.linea([hundir(x, y) for x in range(0, 740, 13)], fill=(46, 88, 98), ancho=1)
    c.circ(360, 205, 44, fill=AMBAR)
    c.circ(360, 205, 44, outline=CREMA, ancho=2)
    c.linea([(40, 90), (250, 120), (340, 160)], fill=CREMA, ancho=2)
    c.linea([(340, 160), (420, 205), (500, 250)], fill=CREMA, ancho=2)
    c.linea([(500, 250), (690, 280)], fill=CREMA, ancho=2)


def c3(c):
    """Evolución: un árbol que se ramifica."""
    c.linea([(0, 352), (W, 352)], fill=CREMA, ancho=2)
    c.linea([(360, 352), (360, 250)], fill=CREMA, ancho=7)

    def rama(x, y, ang, largo, nivel):
        if nivel == 0:
            c.circ(x, y, 5, fill=AMBAR)
            return
        x2 = x + math.cos(ang) * largo
        y2 = y - math.sin(ang) * largo
        c.linea([(x, y), (x2, y2)], fill=CREMA, ancho=max(1, nivel))
        rama(x2, y2, ang + 0.52, largo * 0.74, nivel - 1)
        rama(x2, y2, ang - 0.34, largo * 0.68, nivel - 1)

    rama(360, 250, math.pi / 2, 76, 5)
    for (bx, by, s) in ((520, 110, 1), (575, 90, 0.8), (620, 120, 0.7)):
        c.linea([(bx - 10 * s, by), (bx, by + 5 * s), (bx + 10 * s, by)], fill=TEAL, ancho=2)


def c4(c):
    """ADN: doble hélice."""
    pts1 = []
    for i in range(140):
        x = 20 + i * 5
        y = 205 + 112 * math.sin(x / 52.0)
        pts1.append((x, y))
    pts2 = [(x, 410 - y) for x, y in pts1]
    for i in range(4, len(pts1), 4):
        x, y1 = pts1[i]
        y2 = 410 - y1
        if abs(y2 - y1) > 44:
            c.linea([(x, y1), (x, y2)], fill=(38, 76, 86), ancho=3)
            c.punto(x, y1, 3.4, AMBAR)
            c.punto(x, y2, 3.4, TEAL)
    c.linea(pts1, fill=AMBAR, ancho=7)
    c.linea(pts2, fill=TEAL, ancho=7)


def f1(c):
    """Sócrates: el que pregunta."""
    for x in (24, 92, 602, 670):
        columna(c, x, 366, 206)
    c.linea([(0, 366), (W, 366)], fill=(52, 94, 104), ancho=2)

    def figura(cx, hacia):
        c.circ(cx, 244, 25, fill=(234, 227, 212))
        c.poly([(cx - 36, 366), (cx + 36, 366), (cx + 27, 282), (cx - 27, 282)],
               fill=(234, 227, 212))
        c.linea([(cx + 20 * hacia, 296), (cx + 52 * hacia, 258)], fill=(234, 227, 212), ancho=9)
        c.circ(cx + 52 * hacia, 258, 6, fill=(234, 227, 212))

    figura(272, 1)
    figura(448, -1)
    # arco de la conversación
    for i in range(13):
        x = 296 + i * 10.6
        y = 214 - 54 * math.sin(math.pi * i / 12)
        c.circ(x, y, 3.4, fill=AMBAR)


def f2(c):
    """Platón: la caverna."""
    c.rect(0, 0, W, H, fill=(10, 22, 27))
    # techo de la cueva
    c.poly([(0, 0), (W, 0), (W, 36), (600, 68), (360, 96), (120, 70), (0, 96)],
           fill=(17, 35, 41))
    # pared iluminada por el fuego
    c.rect(0, 96, W, 352, fill=(33, 66, 74))
    # suelo
    c.rect(0, 352, W, H, fill=(13, 28, 34))
    c.linea([(0, 352), (W, 352)], fill=(52, 94, 104), ancho=2)
    # sombras proyectadas
    for x, alto in ((50, 176), (146, 206), (240, 164)):
        c.circ(x, 352 - alto, 17, fill=(6, 14, 18))
        c.poly([(x - 18, 352), (x + 18, 352), (x + 13, 352 - alto + 22),
                (x - 13, 352 - alto + 22)], fill=(6, 14, 18))
        c.poly([(x - 18, 352), (x - 28, 352), (x - 23, 352 - alto + 48),
                (x - 13, 352 - alto + 28)], fill=(6, 14, 18))
    # fuego
    c.circ(566, 316, 108, fill=(48, 58, 50))
    c.circ(566, 316, 72, fill=(96, 80, 52))
    c.circ(566, 316, 42, fill=(214, 158, 82))
    c.poly([(544, 352), (588, 352), (582, 296), (566, 258), (556, 296)], fill=(240, 198, 120))
    # prisionero de espaldas al fuego
    c.circ(458, 300, 16, fill=(8, 18, 22))
    c.poly([(434, 352), (482, 352), (476, 314), (440, 314)], fill=(8, 18, 22))
    c.poly([(482, 330), (512, 342), (510, 352), (478, 348)], fill=(8, 18, 22))


def f3(c):
    """Aristóteles: el justo medio."""
    for x in (60, 150, 520, 610):
        columna(c, x, 370, 190)
    # balanza
    c.linea([(360, 340), (360, 140)], fill=CREMA, ancho=6)
    c.linea([(210, 150), (510, 150)], fill=CREMA, ancho=6)
    c.poly([(340, 340), (380, 340), (372, 356), (348, 356)], fill=CREMA)
    for x, y in ((210, 150), (510, 150)):
        c.linea([(x, y), (x - 34, y + 82)], fill=CREMA, ancho=2)
        c.linea([(x, y), (x + 34, y + 82)], fill=CREMA, ancho=2)
        c.arco([x - 40, y + 60, x + 40, y + 108], 0, 180, fill=AMBAR, ancho=4)
    c.circ(210, 116, 14, fill=AMBAR)
    c.circ(510, 116, 10, fill=TEAL)


def f4(c):
    """Estoicismo: la tormenta y el pórtico."""
    nube_humo(c, 140, 70, 40, color=(60, 88, 96), n=4)
    nube_humo(c, 600, 60, 46, color=(60, 88, 96), n=4)
    random.seed(11)
    for _ in range(70):
        x = random.uniform(0, W)
        y = random.uniform(30, 300)
        c.linea([(x, y), (x - 7, y + 20)], fill=(96, 130, 138), ancho=1)
    # pórtico
    c.rect(210, 130, 510, 150, fill=(214, 206, 192))
    c.poly([(190, 130), (530, 130), (510, 108), (210, 108)], fill=(226, 219, 206))
    for x in (230, 330, 430):
        c.rect(x, 150, x + 34, 360, fill=(221, 214, 201))
        c.rect(x + 10, 160, x + 24, 350, fill=(206, 199, 185))
    # figura serena
    c.circ(370, 270, 15, fill=NEGRO)
    c.poly([(352, 360), (388, 360), (382, 290), (358, 290)], fill=NEGRO)
    c.linea([(300, 360), (440, 360)], fill=CREMA, ancho=2)


def e1(c):
    """Dinero."""
    c.circ(360, 200, 108, fill=AMBAR)
    c.circ(360, 200, 84, outline=(150, 100, 34), ancho=3)
    c.circ(360, 200, 60, outline=(150, 100, 34), ancho=2)
    # símbolo abstracto
    c.rect(352, 155, 368, 245, fill=(150, 100, 34))
    c.rect(330, 190, 390, 206, fill=(150, 100, 34))
    # billetes al fondo
    c.rect(60, 120, 220, 220, fill=TEAL, radio=4)
    c.rect(60, 120, 220, 220, outline=CREMA, ancho=2, radio=4)
    c.circ(140, 170, 26, outline=CREMA, ancho=2)
    c.rect(80, 196, 200, 202, fill=CREMA)
    c.rect(470, 240, 660, 340, fill=CORAL, radio=4)
    c.rect(470, 240, 660, 340, outline=CREMA, ancho=2, radio=4)
    c.circ(565, 290, 26, outline=CREMA, ancho=2)
    c.rect(490, 316, 640, 322, fill=CREMA)


def e2(c):
    """Inflación: el billete que se va."""
    c.linea([(360, 250), (360, 340)], fill=(180, 170, 156), ancho=2)
    c.linea([(360, 340), (330, 360)], fill=(180, 170, 156), ancho=2)
    c.linea([(360, 340), (392, 362)], fill=(180, 170, 156), ancho=2)
    c.rect(250, 120, 470, 250, fill=CORAL, radio=8)
    c.rect(250, 120, 470, 250, outline=CREMA, ancho=3, radio=8)
    c.circ(360, 185, 34, outline=CREMA, ancho=3)
    c.rect(276, 212, 444, 220, fill=CREMA)
    c.rect(276, 232, 410, 238, fill=CREMA)
    # moneda que se encoge
    c.circ(150, 330, 26, fill=AMBAR)
    c.circ(150, 330, 16, outline=(140, 92, 30), ancho=2)
    c.circ(576, 330, 11, fill=AMBAR)
    # flecha
    c.linea([(560, 300), (620, 210)], fill=AMBAR, ancho=4)
    c.poly([(620, 210), (606, 214), (616, 226)], fill=AMBAR)


def e3(c):
    """Banco central: el freno y el acelerador."""
    c.rect(150, 180, 570, 340, fill=(214, 206, 192))
    c.poly([(130, 180), (590, 180), (560, 140), (160, 140)], fill=(226, 219, 206))
    c.rect(150, 180, 570, 190, fill=(200, 192, 178))
    for x in (185, 255, 325, 395, 465, 535):
        c.rect(x, 195, x + 26, 330, fill=(198, 190, 176))
        c.rect(x + 8, 205, x + 18, 320, fill=(214, 206, 192))
    c.rect(140, 330, 580, 344, fill=(178, 170, 156))
    # dial de tasa
    c.arco([520, 240, 700, 400], 180, 360, fill=AMBAR, ancho=6)
    c.linea([(610, 300), (662, 256)], fill=CREMA, ancho=4)
    c.circ(610, 300, 7, fill=CREMA)


def e4(c):
    """Deuda: la pila que crece."""
    base = 350
    alturas = (40, 70, 100, 135, 175)
    for i, alto in enumerate(alturas):
        x = 90 + i * 92
        c.rect(x, base - alto, x + 74, base, fill=TEAL if i % 2 else (74, 126, 134))
        for f in range(int(alto // 26)):
            c.linea([(x + 6, base - 20 - f * 26), (x + 68, base - 20 - f * 26)], fill=(18, 40, 46), ancho=2)
    c.linea([(70, base), (650, base)], fill=CREMA, ancho=2)
    c.linea([(80, 300), (600, 150)], fill=AMBAR, ancho=4)
    c.poly([(600, 150), (582, 152), (594, 168)], fill=AMBAR)


def g1(c):
    """Guerra Fría: dos bloques."""
    c.linea([(360, 40), (360, 370)], fill=CREMA, ancho=2)
    for cx, col in ((210, (58, 104, 112)), (510, CORAL)):
        c.circ(cx, 200, 110, fill=col)
        c.circ(cx, 200, 110, outline=CREMA, ancho=2)
        for rx in (34, 68):
            c.elip(cx, 200, rx, 110, outline=NEGRO, ancho=2)
        c.linea([(cx - 110, 200), (cx + 110, 200)], fill=NEGRO, ancho=2)
        c.elip(cx, 200, 110, 42, outline=NEGRO, ancho=2)
    for i in range(9):
        y = 130 + i * 16
        c.linea([(348, y), (372, y + 12)], fill=AMBAR, ancho=3)


def g2(c):
    """Petróleo: la torre."""
    base = 345
    c.circ(120, 90, 46, fill=AMBAR)
    c.linea([(0, base), (W, base)], fill=CREMA, ancho=2)
    # torre
    c.poly([(330, base), (390, base), (372, 120), (348, 120)], outline=CREMA, ancho=3)
    for i in range(7):
        y1 = base - i * 32
        y2 = base - (i + 1) * 32
        w1 = 30 - i * 3.2
        w2 = 30 - (i + 1) * 3.2
        c.linea([(360 - w1, y1), (360 + w2, y2)], fill=CREMA, ancho=2)
        c.linea([(360 + w1, y1), (360 - w2, y2)], fill=CREMA, ancho=2)
        c.linea([(360 - w2, y2), (360 + w2, y2)], fill=CREMA, ancho=2)
    # surtidor y gotas
    c.poly([(352, 118), (368, 118), (364, 92), (356, 92)], fill=AMBAR)
    for (x, y, r) in ((420, 250, 7), (450, 290, 5), (478, 320, 4), (405, 310, 4)):
        c.circ(x, y, r, fill=AMBAR)
    # depósitos
    c.rect(90, 260, 200, 345, fill=(30, 62, 70))
    c.rect(90, 260, 200, 345, outline=GRIS, ancho=2)
    c.rect(500, 200, 640, 345, fill=(30, 62, 70))
    c.rect(500, 200, 640, 345, outline=GRIS, ancho=2)


def g3(c):
    """China: la ciudad que crece."""
    base = 350
    c.linea([(0, base), (W, base)], fill=CREMA, ancho=2)
    edificios = ((40, 120, 60), (115, 190, 52), (180, 90, 70), (265, 240, 58),
                 (340, 150, 66), (420, 210, 54), (490, 110, 72))
    for x, alto, ancho in edificios:
        c.rect(x, base - alto, x + ancho, base, fill=(30, 62, 70))
        c.rect(x, base - alto, x + ancho, base, outline=GRIS, ancho=2)
        for f in range(alto // 26):
            for col in range(3):
                c.rect(x + 8 + col * (ancho - 16) / 3, base - alto + 12 + f * 26,
                       x + 6 + col * (ancho - 16) / 3 + 8, base - alto + 20 + f * 26, fill=AMBAR)
    # grúa
    c.linea([(600, 350), (600, 120)], fill=AMBAR, ancho=5)
    c.linea([(520, 140), (700, 140)], fill=AMBAR, ancho=5)
    c.linea([(600, 120), (520, 140)], fill=AMBAR, ancho=3)
    c.linea([(660, 140), (660, 200)], fill=AMBAR, ancho=2)
    c.rect(652, 200, 668, 218, fill=AMBAR)


def g4(c):
    """El mapa que se redibuja."""
    globo(c, 360, 210, 118, color=(46, 88, 96))
    nodos = [(180, 120), (540, 110), (590, 280), (300, 320), (150, 270), (360, 80)]
    for x, y in nodos:
        c.linea([(360, 210), (x, y)], fill=AMBAR, ancho=1)
        c.circ(x, y, 7, fill=AMBAR)
        c.circ(x, y, 14, outline=AMBAR, ancho=1)
    c.circ(360, 210, 7, fill=CREMA)


def t1(c):
    """Tecnología: el chip."""
    chip(c, 360, 205, 150)
    for (x1, y1, x2, y2) in ((285, 205, 120, 205), (435, 205, 600, 205),
                             (360, 130, 360, 60), (360, 280, 360, 350)):
        c.linea([(x1, y1), (x2, y2)], fill=TEAL, ancho=4)
        c.circ(x2, y2, 6, fill=TEAL)
    c.rect(90, 180, 120, 230, fill=(30, 62, 70))
    c.rect(600, 180, 630, 230, fill=(30, 62, 70))
    for i in range(5):
        c.rect(96, 186 + i * 9, 114, 190 + i * 9, fill=AMBAR)


def t2(c):
    """Internet: la red de redes."""
    nodos = [(120, 120), (300, 80), (500, 120), (620, 220), (470, 300),
             (260, 320), (110, 260), (360, 200)]
    enlaces = [(0, 1), (1, 2), (2, 3), (3, 4), (4, 5), (5, 6), (6, 0),
               (1, 7), (7, 4), (7, 6), (2, 7), (0, 7)]
    for a, b in enlaces:
        c.linea([nodos[a], nodos[b]], fill=GRIS, ancho=3)
    for i, (x, y) in enumerate(nodos):
        r = 16 if i == 7 else 8
        c.circ(x, y, r, fill=AMBAR if i == 7 else TEAL)
    # paquetes viajando
    for (x, y) in ((210, 100), (400, 100), (545, 170), (365, 300), (185, 190)):
        c.rect(x - 6, y - 6, x + 6, y + 6, fill=CREMA)


def t3(c):
    """IA: capas que aprenden."""
    capas = [(110, [120, 200, 280]), (270, [80, 150, 220, 290, 360]),
             (430, [110, 180, 250, 320]), (580, [160, 240])]
    for (x1, ys1), (x2, ys2) in zip(capas, capas[1:]):
        for y1 in ys1:
            for y2 in ys2:
                c.linea([(x1, y1), (x2, y2)], fill=(34, 68, 78), ancho=1)
    for i, (x, ys) in enumerate(capas):
        for y in ys:
            c.circ(x, y, 9, fill=AMBAR if i in (0, 3) else TEAL)
    # ojo
    c.poly([(560, 90), (640, 60), (700, 90), (640, 120)], fill=None)
    c.linea([(560, 90), (640, 60), (700, 90), (640, 120), (560, 90)], fill=CREMA, ancho=3)
    c.circ(630, 90, 11, fill=CREMA)


def t4(c):
    """El teléfono."""
    c.rect(268, 40, 452, 372, fill=(24, 50, 58), radio=22)
    c.rect(268, 40, 452, 372, outline=CREMA, ancho=3, radio=22)
    c.rect(284, 62, 436, 348, fill=(18, 40, 47), radio=12)
    c.rect(330, 50, 390, 58, fill=CREMA, radio=4)
    # apps
    for f in range(3):
        for col in range(3):
            c.rect(304 + col * 46, 96 + f * 46, 340 + col * 46, 132 + f * 46,
                   fill=(AMBAR if (f + col) % 3 == 0 else TEAL), radio=6)
    c.rect(304, 250, 416, 262, fill=(70, 110, 118), radio=6)
    c.rect(304, 276, 380, 288, fill=(70, 110, 118), radio=6)
    # ondas
    for i, r in enumerate((40, 70, 100, 130)):
        c.arco([500 - r, 90 - r, 500 + r, 90 + r], 300, 360, fill=AMBAR if i % 2 == 0 else GRIS, ancho=3)


ESCENAS = {
    "h1": h1, "h2": h2, "h3": h3, "h4": h4,
    "c1": c1, "c2": c2, "c3": c3, "c4": c4,
    "f1": f1, "f2": f2, "f3": f3, "f4": f4,
    "e1": e1, "e2": e2, "e3": e3, "e4": e4,
    "g1": g1, "g2": g2, "g3": g3, "g4": g4,
    "t1": t1, "t2": t2, "t3": t3, "t4": t4,
}


def main(ids):
    os.makedirs(SALIDA, exist_ok=True)
    for nombre in ids:
        lienzo = Lienzo()
        ESCENAS[nombre](lienzo)
        lienzo.grano()
        ruta = lienzo.guardar(nombre)
        print("✓", nombre, os.path.getsize(ruta) // 1024, "KB")


if __name__ == "__main__":
    elegidas = sys.argv[1:] or list(ESCENAS)
    main(elegidas)
