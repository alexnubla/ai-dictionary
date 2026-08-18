// 1. INCREMENT THIS VERSION NUMBER EVERY TIME YOU MAKE A MAJOR UPDATE!
const CACHE_NAME = 'ai-dictionary-v2'; 

const urlsToCache = [
  '/ai-dictionary/',
  '/ai-dictionary/manifest.json'
];

// Install the Service Worker and cache core files
self.addEventListener('install', event => {
  // FORCE the waiting service worker to become the active service worker immediately
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Activate the Service Worker and clean up old caches
self.addEventListener('activate', event => {
  // Ensure the updated service worker takes control of all open pages immediately
  self.clients.claim();

  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // If the cache name is NOT in our whitelist, delete it
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Intercept network requests and serve from cache if available (Cache-First strategy)
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
