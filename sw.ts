// @ts-ignore .
const CACHE_NAME = DASH_VERSION;

const urlsToCache = [
    "/",
    "/index.html",
    "/debuno.svg",
    "/codicon.ttf",
    "/main.js",
    "/main.css",
    "/manifest.json",
    "./install",
    "./install.sh",
    "./install.md"
];

const self = (globalThis as unknown as ServiceWorkerGlobalScope)

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)),
    );
    // Force the waiting service worker to become the active service worker.
    self.skipWaiting();
});

self.addEventListener("message", (event: ExtendableMessageEvent) => {
    console.log("Received message in Service Worker:", event.data);
    if (event.data?.type === "SKIP_WAITING") {
        self.skipWaiting().then(() => {
            console.log("skipWaiting() called. New SW should activate soon.");
        });
    }
});

self.addEventListener("activate", (event: ExtendableEvent) => {
    console.log("New service worker activated.");
    event.waitUntil(
        caches.keys().then((cacheNames) =>
            Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log("Deleting old cache:", cacheName);
                        return caches.delete(cacheName);
                    }
                })
            )
        )
    );

    // **Force takeover of all clients**
    self.clients.claim().then(() => {
        console.log("New service worker now controlling clients.");
    });
});

self.addEventListener("fetch", (event) => {
    // Bypass Service Worker for EventSource (SSE) requests
    if (event.request.headers.get("accept") === "text/event-stream") {
        return; // Let the request pass through to the network directly
    }

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return (
                cachedResponse ||
                fetch(event.request).then((networkResponse) => {
                    return networkResponse;
                })
            );
        })
    );
});

// Fetch event: serve from cache, then network fallback
// self.addEventListener("fetch", (event: FetchEvent) => {
//     event.respondWith(
//         caches.match(event.request).then((cachedResponse) => {
//             return cachedResponse || fetch(event.request)
//             // .catch(async (e) => {
//             //     console.warn(`   (sw:fetch:catch-all)`, event.request.url, e.message)
//             //     const res = await caches.match("/index.html");
//             //     if (!res)
//             //         throw new Error(`/index.html cache miss`);
//             //     return res;
//             // })
//         }),
//     );
// });

