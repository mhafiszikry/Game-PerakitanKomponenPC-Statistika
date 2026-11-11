// Service worker GamAR-PC: cache-first untuk file lokal, cache CDN Three.js saat pertama dimuat.
// Game tetap bisa dibuka via file:// tanpa PWA (SW hanya aktif di http/https).
const CACHE = 'gamarpc-v1';
const CORE = ['./', './index.html', './style.css', './manifest.json', './icon.svg',
  './js/config.js', './js/levels.js', './js/models.js', './js/audio.js', './js/scene.js',
  './js/decor.js', './js/camera.js', './js/game.js', './js/map.js', './js/finale.js', './js/input.js', './js/main.js'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return res;
    }).catch(() => caches.match('./index.html')))
  );
});
