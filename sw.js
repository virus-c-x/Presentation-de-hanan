/**
 * Service Worker for Offline Caching & GitHub Pages Support
 * Caches all essential assets, fonts, and scripts so the app runs 100% offline.
 */

const CACHE_NAME = 'html-presentation-v1';
const RUNTIME_CACHE = 'html-presentation-runtime-v1';
const FONTS_CACHE = 'html-presentation-fonts-v1';

// Base relative assets required for the app
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './icon.svg',
  './manifest.webmanifest'
];

// Install: Cache all core assets immediately
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      // Precache files individually to ensure one missing file doesn't block installation
      await Promise.all(
        PRECACHE_ASSETS.map((url) =>
          cache.add(new Request(url, { cache: 'reload' })).catch((err) => {
            console.warn('[SW] Could not precache:', url, err);
          })
        )
      );
    }).then(() => self.skipWaiting())
  );
});

// Activate: Clean up old versions and claim clients immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME && name !== RUNTIME_CACHE && name !== FONTS_CACHE) {
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Offline handling with optimal caching strategies
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  const url = new URL(event.request.url);

  // 1. Navigation requests (User loading or refreshing the page)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(async () => {
          // Fallback to cached index.html or root
          const cache = await caches.open(CACHE_NAME);
          const cachedMatch =
            (await cache.match(event.request)) ||
            (await cache.match('./index.html')) ||
            (await cache.match('index.html')) ||
            (await cache.match('./')) ||
            (await cache.match('/'));

          if (cachedMatch) {
            return cachedMatch;
          }

          return new Response(
            '<!DOCTYPE html><html><body><h1>Application hors ligne</h1></body></html>',
            { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
          );
        })
    );
    return;
  }

  // 2. Google Fonts (stylesheets and woff2 font files)
  if (url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com') {
    event.respondWith(
      caches.open(FONTS_CACHE).then(async (cache) => {
        const cached = await cache.match(event.request);
        if (cached) {
          return cached;
        }

        try {
          const networkResponse = await fetch(event.request);
          if (networkResponse && networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        } catch (err) {
          // If offline and not in cache, fallback gracefully
          return cached || new Response('', { status: 408, statusText: 'Offline font' });
        }
      })
    );
    return;
  }

  // 3. Local Assets (CSS, JS, SVG, Manifest) — Cache-First with Stale-While-Revalidate
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((cachedResponse) => {
      // Fetch in background to keep cache up to date
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Network failed, we rely on cache
          return null;
        });

      // Return cached version immediately if available, otherwise wait for network
      return cachedResponse || fetchPromise;
    })
  );
});
