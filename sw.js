/* Offline support. Network first, so edits show up on the next load; cache when offline. */
const CACHE = 'elevare-v1';
const FILES = [
  './',
  'index.html',
  'manifest.webmanifest',
  'assets/fonts/digits-bold.woff',
  'assets/fonts/digits-extralight.woff',
  'assets/fonts/dm-sans.woff',
  'assets/icons/icon-192.png',
  'assets/icons/icon-512.png',
  'assets/icons/icon.svg',
  'css/base.css',
  'css/main.css',
  'css/panel.css',
  'css/timer-styles.css',
  'js/app.js',
  'js/audio.js',
  'js/config.js',
  'js/media.js',
  'js/quotes.js',
  'js/stats.js',
  'js/store.js',
  'js/timer.js',
  'js/ui/background.js',
  'js/ui/common.js',
  'js/ui/dashboard.js',
  'js/ui/digits.js',
  'js/ui/heatmap.js',
  'js/ui/icons.js',
  'js/ui/main.js',
  'js/ui/mini.js',
  'js/ui/panel.js',
  'js/ui/popovers.js',
  'js/ui/settings.js',
  'js/ui/trend.js',
  'js/utils.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k.startsWith('elevare-') && k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  event.respondWith(fetch(request)
    .then((response) => {
      if (response.ok) {
        const copy = response.clone();
        caches.open(CACHE).then((cache) => cache.put(request, copy));
      }
      return response;
    })
    .catch(() => caches.match(request, { ignoreSearch: true }).then((hit) => hit || Response.error())));
});
