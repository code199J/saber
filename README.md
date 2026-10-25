# Saber · cultura general

Trivia diaria hecha para mí. Diez preguntas al día, seis temas, racha y
estadísticas. Sin cuenta, sin anuncios, sin servidor y sin pagos: no hay nada
que desbloquear porque el código y las preguntas son míos.

Inspirada en el formato de las apps de trivia del estilo de Sophia, pero con
banco de preguntas propio y sin suscripción.

## Qué trae

- **Reto diario**: 10 preguntas elegidas de forma determinista por la fecha, así
  que todos los días sale una ronda distinta y no se puede repetir para farmear.
- **Seis temas**: Historia, Ciencia, Geografía, Arte y letras, Deportes, Tecnología.
- **90 preguntas propias** con explicación de cada respuesta.
- **Racha** de días seguidos y mejor racha histórica.
- **Temporizador** de 25 s con bonus por rapidez (se puede apagar).
- **Repaso de fallos** al final de cada ronda, con la respuesta correcta.
- **Funciona sin internet** una vez cargada (service worker).
- Se instala en el teléfono como app desde el navegador.

## Cómo abrirla

```bash
cd ~/proyectos/personal/saber
./servir.sh
```

Te imprime dos direcciones: una para la laptop y otra para el teléfono (misma
wifi). Para probarla en la laptop sin más:

```bash
xdg-open index.html
```

> La instalación como app (PWA) necesita `http://` o `https://`, no `file://`.
> Por eso está el `servir.sh`.

## Instalarla en el teléfono

1. Corre `./servir.sh` en la laptop.
2. Abre en el teléfono la dirección `http://<IP-de-la-laptop>:8080`.
3. Menú del navegador → **Agregar a pantalla de inicio**.

Queda con su icono y a pantalla completa. Eso sí: por `http://` en red local el
navegador **no** deja instalar la PWA completa ni activar el modo sin conexión
—eso exige `https://` o `localhost`—, así que funciona como acceso directo y
necesita que la laptop esté encendida.

Para tenerla instalada de verdad y offline en el teléfono, súbela gratis:

- **Cloudflare Pages**: crea un proyecto, arrastra la carpeta `saber` y listo.
- **GitHub Pages**: sube el contenido a un repo y activa Pages en *Settings*.

Al quedar en `https://`, el navegador ya ofrece *Instalar app* y el service
worker cachea todo: abre sin internet y sin la laptop encendida.

## Editar las preguntas

Todo el contenido está en `js/questions.js`. El formato es:

```js
{ c:"historia", q:"¿Pregunta?", o:["A","B","C","D"], a:1, e:"Explicación." }
```

- `c`: `historia`, `ciencia`, `geografia`, `arte`, `deportes` o `tecnologia`.
- `a`: índice de la opción correcta, empezando en **0**.
- Las opciones se barajan solas en cada partida; no hay que reordenarlas.

Para agregar un tema nuevo: añádelo a `window.CATEGORIAS` con un `id` y usa ese
mismo `id` en las preguntas. No hay que tocar nada más.

## Archivos

```
index.html            estructura de las tres vistas
css/styles.css        estilos (tinta verdosa + ámbar, serif editorial)
js/questions.js       banco de 90 preguntas + lista de categorías
js/app.js             lógica: rondas, puntaje, racha, almacenamiento
sw.js                 cache offline
manifest.webmanifest  datos de instalación como app
servir.sh             servidor local para el teléfono
icons/                iconos 192, 512 y maskable
```

## Datos

Todo se guarda en `localStorage` del navegador, bajo la clave `saber.v1`.
Nada sale del dispositivo. El botón *Borrar progreso* del inicio lo limpia.

## Pendientes posibles

- Más preguntas por tema (con 90 hay ~9 rondas de tema sin repetir).
- Modo contrarreloj de 60 s para toda la ronda.
- Ranking local entre varios perfiles del mismo teléfono.
- Sonido opcional en acierto/fallo.
