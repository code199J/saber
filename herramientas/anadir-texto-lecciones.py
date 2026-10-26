#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Añade un párrafo adicional a cada lección para que las respuestas del quiz
estén más claras dentro del texto de lectura.
"""

ADICIONAL = {
    # ── HISTORIA ──────────────────────────────────────────
    "h1": ("Historia", "La idea clave de aquella época era que la sociedad no era igual para todos: el clero y la nobleza tenían privilegios y no pagaban los mismos impuestos que el resto, mientras que el tercer estado —artesanos, campesinos y burgueses— cargaba con casi toda la contribución económica del país."),
    "h2": ("Historia", "La máquina de vapor no solo cambió la industria: hizo posible el ferrocarril, las fábricas grandes y las ciudades industriales. Pero también trajo jornadas interminables, trabajo infantil y ciudades sin alcantarillado, problemas que tardaron décadas en regularse con leyes como la de 1833."),
    "h3": ("Historia", "La caída del zar en 1917 abrió la puerta a una guerra civil que duró tres años, con hambre y epidemias. En 1922 se creó la Unión Soviética, un Estado que intentó organizar la economía y la sociedad sin clases sociales, aunque terminó en una dictadura bajo Stalin."),
    "h4": ("Historia", "La caída del Muro de Berlín en 1989 simbolizó el fin de la división de Europa en dos bloques. Dos años después, en diciembre de 1991, la Unión Soviética desapareció y quince repúblicas se volvieron independientes, entre ellas Rusia."),
    # ── TECNOLOGÍA ────────────────────────────────────────
    "t1": ("Tecnología", "El transistor reemplazó a las válvulas de vidrio porque era más pequeño, no se quemaba y no necesitaba vacío. A partir de ahí se pudieron juntar miles, luego millones y ahora miles de millones de transistores en un solo chip de silicio."),
    "t2": ("Tecnología", "ARPANET comenzó con apenas cuatro computadoras en 1969. Poco a poco se sumaron más nodos y en 1983 toda la red adoptó el protocolo TCP/IP, que permitió que redes distintas se comunicaran entre sí. Así nació Internet como la conocemos."),
    "t3": ("Tecnología", "La inteligencia artificial nació como idea en 1956, pero tuvo décadas de avance lento llamados «inviernos de la IA». El giro decisivo llegó en 2012 con AlexNet y en 2017 con el transformer, que hizo posibles los modelos de lenguaje actuales como los que usan chatbots."),
    "t4": ("Tecnología", "El iPhone de 2007 eliminó el teclado físico y puso una pantalla táctil con navegador completo. Ese cambio convirtió el teléfono en una computadora de bolsillo, y con la App Store (2008) surgió un ecosistema de aplicaciones que hoy mueve cientos de miles de millones de dólares."),
    # ── CIENCIA ───────────────────────────────────────────
    "c1": ("Ciencia", "En 1929 Edwin Hubble descubrió que casi todas las galaxias se alejan de nosotros, y cuanto más lejos están, más rápido lo hacen. Eso significa que el universo se está expandiendo y que, si lo hacemos retroceder en el tiempo, todo empezó en un punto denso y caliente: el Big Bang."),
    "c2": ("Ciencia", "Einstein propuso que la gravedad no es una fuerza misteriosa que atrae objetos, sino la curvatura del espacio-tiempo causada por la masa y la energía. Los planetas siguen la línea más recta posible en ese espacio curvado, como una bola rodando sobre una lámina hundida."),
    "c3": ("Ciencia", "Darwin propuso que las especies cambian por selección natural: los individuos con variantes útiles sobreviven y se reproducen más, pasando esos rasgos a la siguiente generación. No hay un objetivo ni un plan; el ambiente filtra qué variante funciona mejor."),
    "c4": ("Ciencia", "El ADN se lee con cuatro letras (A, T, G, C) que se emparejan siempre igual. Con grupos de tres letras se forman 64 combinaciones que codifican 20 aminoácidos. Desde 2012, CRISPR-Cas9 permite editar esa molécula con precisión, como una tijera molecular."),
    # ── FILOSOFÍA ─────────────────────────────────────────
    "f1": ("Filosofía", "Sócrates no escribía libros ni daba discursos. Recorría el ágora de Atenas haciendo preguntas a quien creía saber algo, como la justicia o el valor. Su método era llevar al otro a descubrir sus propias contradicciones, no imponer doctrinas."),
    "f2": ("Filosofía", "Para Platón, el mundo que vemos con los sentidos está lleno de apariencias que cambian y se corrompen. El conocimiento verdadero está en las Ideas —la Belleza, la Justicia, el Círculo perfecto— que son inmutables y se captan con la razón."),
    "f3": ("Filosofía", "Aristóteles fue alumno de Platón pero no estuvo de acuerdo con él en todo. Sostuvo que las formas están en las cosas mismas, no en otro mundo, y propuso que para explicar algo hay que responder cuatro preguntas: de qué está hecho, qué es, quién lo hizo y para qué sirve."),
    "f4": ("Filosofía", "El estoicismo enseña a distinguir lo que depende de nosotros —nuestros juicios, decisiones y deseos— de lo que no depende —el cuerpo, la reputación, el clima, lo que otros hacen—. El sufrimiento viene de tratar lo segundo como si fuera lo primero."),
    # ── ECONOMÍA ──────────────────────────────────────────
    "e1": ("Economía", "El dinero cumple tres funciones: sirve para intercambiar cosas sin necesidad de trueque, para comparar precios (unidad de cuenta) y para guardar valor hacia el futuro. El dinero moderno no está respaldado por oro, sino por la confianza en el Estado y en el banco central."),
    "e2": ("Economía", "La inflación es el aumento sostenido de precios. Se mide con el IPC, una lista de productos típicos de las familias. Si la inflación es alta, quien vive de un sueldo fijo compra menos con el mismo dinero, mientras que quien tiene inmuebles o divisas se protege mejor."),
    "e3": ("Economía", "El banco central no atiende al público; presta a los bancos y controla la tasa de interés. Subir la tasa encarece el crédito y frena la inflación, pero frena también el crecimiento. La Reserva Federal de EE. UU. se creó en 1913."),
    "e4": ("Economía", "Cuando un Estado gasta más de lo que recauda, emite deuda en forma de bonos. La relación deuda/PIB compara lo que debe con lo que produce la economía en un año. Si un país no puede pagar, entra en default o cesación de pagos, con cierre de crédito y caída de la moneda."),
    # ── GEOPOLÍTICA ───────────────────────────────────────
    "g1": ("Geopolítica", "Después de la Segunda Guerra Mundial el mundo se dividió en dos bloques: Estados Unidos y sus aliados por un lado, la URSS y los suyos por el otro. La OTAN se fundó en 1949 para contener la influencia soviética, y nunca hubo una guerra directa entre ambas superpotencias."),
    "g2": ("Geopolítica", "La OPEP se fundó en 1960 para defender los precios del petróleo frente a las grandes petroleras. El embargo de 1973, durante la guerra de Yom Kipur, hizo que el precio del barril se multiplicara por cuatro en meses, provocando inflación y desempleo al mismo tiempo."),
    "g3": ("Geopolítica", "Desde 1978, China abrió su economía con zonas especiales como Shenzhen, manteniendo el control político del Partido. El resultado fue el mayor crecimiento sostenido de la historia moderna: cientos de millones de personas salieron de la pobreza extrema y China se convirtió en la fábrica del mundo."),
    "g4": ("Geopolítica", "En 2022, tras la invasión de Rusia a Ucrania, Occidente congeló unos 300.000 millones de dólares en reservas rusas, algo sin precedentes. El grupo BRICS (Brasil, Rusia, India, China y Sudáfrica, ampliado en 2024) busca un orden menos centrado en Occidente, y los semiconductores son el cuello de botella de la disputa tecnológica."),
}

import re

p = "js/cursos.js"
with open(p, encoding="utf-8") as f:
    contenido = f.read()

for lec_id, (tema, texto_adicional) in ADICIONAL.items():
    # Buscar el bloque de la lección: desde "id: "lec_id"," hasta el siguiente "quiz: ["
    # Patrón: encontrar "id: \"lec_id\"," y luego hasta "quiz: ["
    patron_inicio = 'id: "' + lec_id + '",'
    idx = contenido.find(patron_inicio)
    if idx == -1:
        print(f"No encontrado: {lec_id}")
        continue
    # Desde ahí, buscar el siguiente "quiz: ["
    idx_quiz = contenido.find("quiz: [", idx)
    if idx_quiz == -1:
        print(f"No hay quiz para: {lec_id}")
        continue
    # Justo antes de "quiz: [" debe haber el cierre del array texto: "],"
    # Buscar el último "]," antes de quiz: [
    idx_cierre = contenido.rfind("],", idx, idx_quiz)
    if idx_cierre == -1:
        print(f"No se encontro cierre de texto para: {lec_id}")
        continue
    # Insertar antes del cierre del array texto
    insertar = '          "' + texto_adicional + '",\n        ],'
    contenido = contenido[:idx_cierre] + insertar + contenido[idx_cierre:]
    print(f"Añadido párrafo a {lec_id} ({tema})")

with open(p, "w", encoding="utf-8") as f:
    f.write(contenido)

print("\nHecho. Verificando sintaxis...")
