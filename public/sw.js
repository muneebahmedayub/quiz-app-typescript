var CACHE_NAME = 'website';
var urlsToCache = [
    '/static/js/bundle.js',
    '/static/js/0.chunk.js',
    '/static/js/main.chunk.js',
    'https://fonts.googleapis.com/css2?family=Fascinate+Inline&display=swap',
    'https://opentdb.com/api_category.php',
    'https://fonts.gstatic.com/s/fascinateinline/v10/jVyR7mzzB3zc-jp6QCAu60poNqIy5grIfA.woff2',
    'https://4.bp.blogspot.com/-Qpd01rD0oZA/Wy3k2IgJELI/AAAAAAAAAKc/ks_CSwroz2ovmgqbAP0fXIynWg_eU1ImwCLcBGAs/s1600/20180622_225603.jpg',
    '/logo192.png',
    '/sockjs-node',
    '/manifest.json',
    '/favicon.ico',
    'index.html',
    '/',
];

this.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cachesName) {
            return Promise.all(
                cachesName
                    .filter(function (cacheName) {
                        return cacheName.startsWith("Offline-") && cacheName != StaticCache;
                    })
                    .map(function (cacheName) {
                        return caches.delete(cacheName);
                    })
            );
        })
    );
});