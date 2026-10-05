const CACHE_NAME = "programming-exam-v3";

const APP_FILES = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json",
    "./icons/icon-192.png",
    "./icons/icon-512.png"
];

self.addEventListener("install", function (event) {

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {

                return cache.addAll(APP_FILES);

            })
            .catch(function (error) {

                console.error("Cache installation failed:", error);

            })
    );

    self.skipWaiting();
});


self.addEventListener("activate", function (event) {

    event.waitUntil(

        caches.keys()
            .then(function (cacheNames) {

                return Promise.all(

                    cacheNames
                        .filter(function (cacheName) {
                            return cacheName !== CACHE_NAME;
                        })
                        .map(function (cacheName) {
                            return caches.delete(cacheName);
                        })

                );

            })

    );

    self.clients.claim();
});


self.addEventListener("fetch", function (event) {

    event.respondWith(

        caches.match(event.request)
            .then(function (cachedResponse) {

                if (cachedResponse) {
                    return cachedResponse;
                }

                return fetch(event.request)
                    .then(function (networkResponse) {

                        if (
                            networkResponse &&
                            networkResponse.status === 200
                        ) {

                            const responseClone =
                                networkResponse.clone();

                            caches.open(CACHE_NAME)
                                .then(function (cache) {

                                    cache.put(
                                        event.request,
                                        responseClone
                                    );

                                });

                        }

                        return networkResponse;

                    })
                    .catch(function () {

                        return new Response(
                            "هذا المورد غير متاح بدون إنترنت.",
                            {
                                status: 503,
                                statusText: "Offline"
                            }
                        );

                    });

            })

    );

});