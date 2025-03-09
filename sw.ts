const CACHE_NAME = "app-cache-v4";
const urlsToCache = [
    "/",
    "/index.html",
    "/debuno.svg",
    "/main.js",
    "/main.css",
    "/manifest.json"
];

const sw = (self as unknown as ServiceWorkerGlobalScope)

// Install event: cache required assets
sw.addEventListener("install", (event: ExtendableEvent) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)),
    );
});

// Activate event: remove old caches
sw.addEventListener("activate", (event: ExtendableEvent) => {
    event.waitUntil(
        caches.keys().then((cacheNames) =>
            Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                }),
            )
        ),
    );
});

// Fetch event: serve from cache, then network fallback
sw.addEventListener("fetch", (event: FetchEvent) => {
    console.log(`   (sw:fetch)`, event.request.url)
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request).catch(async (e) => {
                console.warn(`   (sw:fetch:catch-all)`, event.request.url, e.message)

                const res = await caches.match("/index.html");
                if (!res)
                    throw new Error(`/index.html cache miss`);

                return res;
            })

            // .catch(() => {
            //     // If it's a navigation request, return index.html for SPA routing
            //     if (event.request.mode === "navigate") {
            //         return caches.match("/index.html").then(res => {
            //             if (!res)
            //                 throw new Error(`/index.html cache miss`)
            //             return res
            //         })
            //     }

            //     throw new Error("Resource not found and no network available.");
            // });
        }),
    );
});