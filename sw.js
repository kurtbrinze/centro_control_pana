/* Service worker del Centro de Control.
   Sólo guarda el propio centro y sólo borra sus copias (prefijo 'centro-'):
   las apps de /apps/ viven en este mismo sitio y tienen las suyas.
   Sólo guarda el propio centro (su página, apps.json e íconos) para que abra
   rápido y sin conexión. Las apps embebidas son de otros sitios y no pasan por
   aquí: cada una maneja sus datos y su propia sincronización.
   La página y apps.json van primero a la red, para que un cambio publicado se
   vea al abrir; si no hay conexión, se usa la copia guardada. */
const CACHE = 'centro-V.15';
const BASE = ['/', '/index.html', '/apps.json', '/manifest.webmanifest',
  '/icons/icon-192.png', '/icons/icon-512.png', '/icons/apple-touch-icon.png', '/icons/icon.svg'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(BASE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then((ks) => Promise.all(ks.filter((k) => k.startsWith('centro-') && k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  /* /apps/... son las apps servidas desde este mismo sitio: tienen su propio
     service worker y sus propias copias. El centro no se mete. */
  if (url.pathname.startsWith('/apps/')) return;
  /* Sólo la página del centro se guarda como página del centro: cualquier
     otra navegación pasa directo, para que nunca quede otra app guardada
     en su lugar. */
  const raiz = url.pathname === '/' || url.pathname === '/index.html';
  if (req.mode === 'navigate' && !raiz) return;
  const fresco = raiz || url.pathname.endsWith('apps.json');
  if (fresco) {
    e.respondWith(fetch(req, { cache: 'no-store' })
      .then((r) => { if (r.ok) { const c = r.clone(); caches.open(CACHE).then((k) => k.put(raiz ? '/' : req, c)); } return r; })
      .catch(() => caches.match(raiz ? '/' : req).then((r) => r || caches.match('/index.html'))));
    return;
  }
  e.respondWith(caches.match(req).then((r) => r || fetch(req).then((res) => {
    if (res.ok) { const c = res.clone(); caches.open(CACHE).then((k) => k.put(req, c)); }
    return res;
  })));
});
