const CACHE_NAME = 'ai-dictionary-v1';
const urlsToCache = [
  '/ai-dictionary/',
  '/ai-dictionary/manifest.json'
];

// Install the Service Worker and cache core files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Intercept network requests and serve from cache if available
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
