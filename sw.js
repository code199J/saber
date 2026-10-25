/* Service worker: cachea el shell y las imágenes para usar la app sin conexión. */

const CACHE = "saber-v11";
const ARCHIVOS = [
  "./",
  "./index.html",
  "./css/styles.css",
  "./js/app.js",
  "./js/cursos.js",
  "./js/questions.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

// Las 24 ilustraciones (h1…t4). Se cachean aparte para que un
// fallo puntual no impida instalar la app.
const IMAGENES = ["h", "c", "f", "e", "g", "t"].flatMap((letra) =>
  [1, 2, 3, 4].map((n) => "./images/" + letra + n + ".webp")
);

self.addEventListener("install", (evento) => {
  evento.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(ARCHIVOS)
        .then(() => Promise.allSettled(IMAGENES.map((ruta) => c.add(ruta)))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (evento) => {
  evento.waitUntil(
    caches.keys()
      .then((claves) => Promise.all(claves.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (evento) => {
  if (evento.request.method !== "GET") return;

  evento.respondWith(
    caches.match(evento.request).then((cacheado) => {
      if (cacheado) return cacheado;
      return fetch(evento.request)
        .then((respuesta) => {
          const copia = respuesta.clone();
          caches.open(CACHE).then((c) => c.put(evento.request, copia)).catch(() => {});
          return respuesta;
        })
        .catch(() => caches.match("./index.html"));
    })
  );
});
