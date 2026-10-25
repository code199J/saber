# Saber · cultura general en 10 minutos

Micro-aprendizaje: cursos cortos, una lección de lectura y un test de tres
preguntas. Más un reto diario de preguntas sueltas. Sin cuenta, sin anuncios,
sin pagos y sin servidor.

El modelo —lección breve + test + progreso diario— está inspirado en apps de
micro-aprendizaje como Sophia. **El contenido, el diseño y el código son
propios**: no se copió texto, interfaz ni material de ninguna app de terceros.

## Qué trae

- **5 cursos, 20 lecciones, 60 preguntas de test** con explicación:
  Historia, Ciencia, Filosofía, Economía y Geopolítica.
- Cada lección: 4-5 minutos de lectura, párrafos con datos concretos, y un test
  de 3 preguntas. Se aprueba con 2 de 3.
- **XP y niveles**: +10 por leer, +10 por acierto, +30 por aprobar un test la
  primera vez. Nivel cada 150 XP.
- **Racha** de días seguidos (cuenta lectura, test o reto diario).
- **Reto diario**: 10 preguntas de un banco de 90, elegidas de forma
  determinista por fecha. Suma XP una vez al día; repetir es ronda libre.
- **Repaso de fallos** al final de cada ronda, con la respuesta correcta.
- **20 imágenes** de portada, una por lección, más una portada por curso. Son
  de Wikimedia Commons con licencia libre (dominio público, CC0, CC BY o
  CC BY-SA); la app trae una pantalla de **créditos** con autor, licencia y
  enlace a cada archivo original.
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

## Imágenes y créditos

Las 20 imágenes viven en `images/<id>.webp` (720×405, WebP calidad 78, ~45 KB
cada una) y sus datos en `credits.json`. No se copió material de ninguna app:
todas son archivos libres de Wikimedia Commons, filtrados por licencia
(dominio público, CC0, CC BY, CC BY-SA) y recortados a 16:9.

La pantalla **Créditos de imágenes** (pie del inicio) cumple la atribución de
las licencias CC: muestra lección, autor, licencia y enlace a la ficha. Si
cambias una imagen, actualiza también `credits.json` — o vuelve a bajarla con
el script, que lo hace solo:

```bash
python3 herramientas/bajar-imagenes.py
```

El script busca por título exacto o por búsqueda, descarta lo que no tenga
licencia libre, recorta con sesgo hacia arriba (para no cortar caras) y guarda
WebP. Respeta el límite de peticiones de Commons (2 s entre llamadas, con
reintentos si responde 429).

## Archivos

```
index.html            vistas: inicio, curso, lección, test, resultado, créditos
css/styles.css        estilos (tinta verdosa + ámbar, serif editorial)
js/cursos.js          5 cursos: texto de las lecciones y sus tests
js/questions.js       banco de 90 preguntas del reto diario
js/app.js             lógica: navegación, progreso, XP, racha, reto diario
credits.json          autor, licencia y enlace de cada imagen
images/               20 portadas WebP (una por lección)
sw.js                 caché offline (shell + imágenes)
manifest.webmanifest  datos de instalación como app
herramientas/bajar-imagenes.py  descarga y recorta las imágenes libres
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
