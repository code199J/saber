/* Service worker mínimo: cachea el shell para jugar sin conexión. */

const CACHE = "saber-v6";
const ARCHIVOS = [
  "./",
  "./index.html",
  "./css/styles.css",
  "./js/app.js",
  "./js/questions.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", (evento) => {
  evento.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ARCHIVOS)).then(() => self.skipWaiting())
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
