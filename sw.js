// Unbeatable Tennis Swing Model — service worker
// Strategy: network-first for HTML/Supabase API, cache-first for static assets.

const CACHE = 'utsm-v2';
const SHELL = [
  '/',
  '/admin',
  '/manifest.webmanifest',
  '/icon.svg',
  '/icon-maskable.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(SHELL).catch(() => null))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Always go to network for Supabase API (auth + data must be fresh)
  if (url.hostname.endsWith('.supabase.co')) return;

  // Skip non-http(s) and cross-origin POSTs
  if (!url.protocol.startsWith('http')) return;

  // HTML: network-first, fall back to cache
  const accept = req.headers.get('accept') || '';
  if (accept.includes('text/html')) {
    event.respondWith(
      fetch(req)
        .then((resp) => {
          const copy = resp.clone();
          caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => null);
          return resp;
        })
        .catch(() =>
          caches.match(req).then((hit) => hit || caches.match('/'))
        )
    );
    return;
  }

  // Static assets: cache-first
  event.respondWith(
    caches.match(req).then(
      (hit) =>
        hit ||
        fetch(req).then((resp) => {
          if (resp.ok && resp.type === 'basic') {
            const copy = resp.clone();
            caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => null);
          }
          return resp;
        })
    )
  );
});
