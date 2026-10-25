# Saber · cultura general en 10 minutos

Micro-aprendizaje: cursos cortos, una lección de lectura y un test de tres
preguntas. Más un reto diario de preguntas sueltas. Sin cuenta, sin anuncios,
sin pagos y sin servidor.

El modelo —lección breve + test + progreso diario— está inspirado en apps de
micro-aprendizaje como Sophia. **El contenido, el diseño y el código son
propios**: no se copió texto, interfaz ni material de ninguna app de terceros.

## Qué trae

- **6 cursos, 24 lecciones, 72 preguntas de test** con explicación:
  Historia, Tecnología, Ciencia, Filosofía, Economía y Geopolítica.
- Cada lección: 4-5 minutos de lectura, párrafos con datos concretos, y un test
  de 3 preguntas. Se aprueba con 2 de 3.
- **XP y niveles**: +10 por leer, +10 por acierto, +30 por aprobar un test la
  primera vez. Nivel cada 150 XP.
- **Racha** de días seguidos (cuenta lectura, test o reto diario).
- **Reto diario**: 10 preguntas de un banco de 90, elegidas de forma
  determinista por fecha. Suma XP una vez al día; repetir es ronda libre.
- **Repaso de fallos** al final de cada ronda, con la respuesta correcta.
- **24 ilustraciones propias**, una por lección (la portada de cada curso
  reutiliza una de ellas). Son dibujos generados con código, sin fotos ni
  material de terceros: no requieren atribución.
- **Modo oscuro por defecto**, tipografía editorial y peso total de ~1 MB:
  carga rápido y queda cacheada para funcionar sin conexión.
- **Funciona sin internet** una vez cargada (service worker).
- Se instala en el teléfono como app desde el navegador.

## Cómo abrirla

```bash
cd ~/proyectos/personal/saber
./servir.sh
```

Imprime dos direcciones: una para la laptop y otra para el teléfono (misma
wifi). Para probar sin servidor:

```bash
xdg-open index.html
```

> La instalación como app (PWA) necesita `http://` o `https://`, no `file://`.

## Instalada

**https://code199j.github.io/saber/**

En el teléfono: abre esa URL en Chrome → menú → **Instalar app**. Queda con
icono propio, pantalla completa y funciona sin internet tras la primera carga.

Requisito de `https://` o `localhost`: por `http://` en red local el navegador
no permite instalar la PWA completa ni activar el modo offline.

### Actualizarla

```bash
./publicar.sh "qué cambió"
```

Sube la carpeta a GitHub Pages y **sube sola la versión del caché** del service
worker (`saber-vN`), que evita que el teléfono siga mostrando la versión vieja.
Tarda ~1 minuto en refrescar.

## Editar el contenido

Todo está en `js/cursos.js`:

```js
{
  id: "historia",
  tema: "Historia",
  titulo: "Las cuatro rupturas",
  sub: "1789 · 1830 · 1917 · 1989",
  desc: "Una línea que explica de qué va el curso.",
  lecciones: [
    {
      id: "h1",
      titulo: "1789: el fin del Antiguo Régimen",
      min: 5,
      texto: ["Primer párrafo.", "Segundo párrafo.", "Tercero."],
      quiz: [
        { q: "¿Pregunta?", o: ["A", "B", "C", "D"], a: 1, e: "Explicación." }
      ]
    }
  ]
}
```

- `a` es el índice de la opción correcta, empezando en **0**.
- Las opciones se barajan solas en cada intento; no hay que reordenarlas.
- Los `id` deben ser únicos: se usan para guardar tu progreso.
- Para agregar un curso, añade un objeto más al arreglo `window.CURSOS`. No hay
  que tocar nada más.

El banco del reto diario está en `js/questions.js`, con 90 preguntas en seis
categorías y el mismo formato.

## Ilustraciones

Las 24 imágenes viven en `images/<id>.webp` (720×405, WebP calidad 82, 4-30 KB
cada una). No son fotos ni material descargado: las dibuja un script propio con
formas geométricas, en un estilo de serigrafía sobre fondo tinta, con dos
acentos (ámbar y coral). Por eso no hay créditos ni atribuciones que cumplir.

Se regeneran todas, o solo algunas, con:

```bash
python3 herramientas/hacer-ilustraciones.py          # las 24
python3 herramientas/hacer-ilustraciones.py f1 t3    # solo esas
```

Cada escena es una función del script (`h1`, `t3`, …) y comparte las mismas
primitivas: `poly`, `rect`, `circ`, `linea`, `arco`, más piezas reutilizables
como `multitud`, `fabrica`, `columna`, `globo` y `chip`. Se dibuja a 3× y se
reduce, así los bordes quedan limpios. Si agregas una lección, añade su escena
al diccionario `ESCENAS` y genera solo esa.

## Archivos

```
index.html            vistas: inicio, curso, lección, test, resultado
css/styles.css        estilos (tinta verdosa + ámbar, serif editorial)
js/cursos.js          6 cursos: texto de las lecciones y sus tests
js/questions.js       banco de 90 preguntas del reto diario
js/app.js             lógica: navegación, progreso, XP, racha, reto diario
images/               24 ilustraciones WebP (una por lección)
sw.js                 caché offline (shell + imágenes)
manifest.webmanifest  datos de instalación como app
herramientas/hacer-ilustraciones.py  dibuja las 24 ilustraciones
servir.sh             servidor local para el teléfono
publicar.sh           sube a GitHub Pages y sube la versión del caché
icons/                iconos 180, 192, 512 y maskable
```

## Datos

Todo se guarda en `localStorage` del navegador, clave `saber.v1`. Nada sale del
dispositivo. El botón *Borrar progreso* del inicio lo limpia.

```json
{
  "xp": 110,
  "racha": 1,
  "vistas": { "h1": true },
  "tests": { "h1": 3 },
  "diario": { "dia": "2026-10-25", "aciertos": 3, "total": 10 }
}
```

## Pendientes posibles

- Más cursos (la estructura ya lo soporta, solo es contenido).
- Búsqueda dentro de la biblioteca.
- Repaso espaciado: repetir el test de lecciones viejas cada cierto tiempo.
- Exportar el progreso a un archivo.
