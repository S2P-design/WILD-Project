/* ════════════════════════════════════════════════
   Wild Project Workspace — Service Worker
   Strategy: Network-first für HTML (frische Inhalte),
             Cache-first für Assets (Fonts, Bilder).
   ════════════════════════════════════════════════ */

const CACHE_VERSION = 'wp-workspace-v3';
const CORE_ASSETS = [
  '/workspace.html',
  '/planner.html',
  '/notebook.html',
  '/journal.html',
  '/season.html',
  '/brand-guide.html',
  '/wp-shell.css',
  '/wp-logo.png',
  '/favicon-180.png',
  '/favicon-32.png',
  '/manifest.webmanifest'
];

// ── Install: Core-Assets vorab cachen ──
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => cache.addAll(CORE_ASSETS).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

// ── Activate: Alte Caches aufräumen ──
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch: Network-first für HTML, Cache-first für Rest ──
self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Nur GET-Requests cachen
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Externe Requests (Wetter-API, Google Fonts) → direkt durchlassen
  if (url.origin !== self.location.origin) {
    return;
  }

  // HTML → Network-first (immer aktuelle Version probieren)
  if (req.mode === 'navigate' || req.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match('/workspace.html')))
    );
    return;
  }

  // Assets → Cache-first
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(req, copy));
        }
        return res;
      }).catch(() => cached);
    })
  );
});
