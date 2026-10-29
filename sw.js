// Guarda o cardapio no tablet para continuar a funcionar se o Wi-Fi falhar.
// Paginas/codigo: tenta sempre a versao mais recente; sem rede usa a guardada.
// Imagens: mostra logo a guardada e atualiza-a em segundo plano.

const SHELL_CACHE = "brasa-shell-v11";
const IMAGE_CACHE = "brasa-images-v3";
const SHELL_FILES = ["./", "index.html", "fonts.css", "style.css", "menu-data.js", "assets/fotos/hd/lista.js", "script.js", "manifest.webmanifest"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(SHELL_CACHE).then((cache) => cache.addAll(SHELL_FILES)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((key) => key !== SHELL_CACHE && key !== IMAGE_CACHE).map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

function networkFirst(request) {
  const network = fetch(request).then((response) => {
    if (response.ok) {
      const copy = response.clone();
      caches.open(SHELL_CACHE).then((cache) => cache.put(request, copy));
    }
    return response;
  });

  const timeout = new Promise((resolve) => setTimeout(resolve, 4000));
  const cachedLater = timeout.then(() => caches.match(request, { ignoreSearch: true }));

  return Promise.race([network, cachedLater.then((cached) => cached || network)]).catch(() =>
    caches.match(request, { ignoreSearch: true }).then((cached) => cached || caches.match("index.html"))
  );
}

function staleWhileRevalidate(event) {
  const { request } = event;
  return caches.open(IMAGE_CACHE).then((cache) =>
    cache.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response.ok) cache.put(request, response.clone());
          return response;
        })
        .catch(() => cached);
      if (cached) {
        event.waitUntil(network);
        return cached;
      }
      return network;
    })
  );
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.destination === "image" || url.pathname.startsWith("/assets/")) {
    event.respondWith(staleWhileRevalidate(event));
  } else {
    event.respondWith(networkFirst(request));
  }
});
