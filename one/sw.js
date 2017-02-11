var CACHE = 'v1:static';
var CACHE_FILES = [
	
];

// During the installation phase, you'll usually want to cache static assets.
self.addEventListener('install', function(e) {
    // Once the service worker is installed, go ahead and fetch the resources to make this work offline.
    e.waitUntil(
        caches.open(CACHE).then(function(cache) {
            return cache.addAll( CACHE_FILES).then(function() {
                self.skipWaiting();
            });
        })
    );
});

// when the browser fetches a URL…
self.addEventListener('fetch', function(event) {
    // … either respond with the cached object or go ahead and fetch the actual URL
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                console.log('returning file from cache ' + event.response);
                return response;
            }
            // fetch as normal
            console.log('returning file from web ' + event.response);
            return fetch(event.request);
        })
    );
});