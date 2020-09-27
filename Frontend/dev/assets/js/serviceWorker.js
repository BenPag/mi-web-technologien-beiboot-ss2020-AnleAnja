const staticCacheName = 'pwa-cache-v1';
const filesToCache = [
    './pwa/manifest.json',
    './pwa/js/main.min.js',
    './pwa/css/styles.min.css',
    './pwa/favicons/android-icon-192x192.png',
    './pwa/favicons/android-icon-192x192.png',
    './pwa/favicons/apple-icon-57x57.png',
    './pwa/favicons/apple-icon-60x60.png',
    './pwa/favicons/apple-icon-72x72.png',
    './pwa/favicons/apple-icon-76x76.png',
    './pwa/favicons/apple-icon-114x114.png',
    './pwa/favicons/apple-icon-120x120.png',
    './pwa/favicons/apple-icon-144x144.png',
    './pwa/favicons/apple-icon-152x152.png',
    './pwa/favicons/apple-icon-180x180.png',
    './pwa/favicons/browserconfig.xml',
    './pwa/favicons/favicon.ico',
    './pwa/favicons/favicon-16x16.png',
    './pwa/favicons/favicon-32x32.png',
    './pwa/favicons/favicon-96x96.png',
    './pwa/favicons/favicon-256x256.png',
    './pwa/favicons/ms-icon-70x70.png',
    './pwa/favicons/ms-icon-144x144.png',
    './pwa/favicons/ms-icon-150x150.png',
    './pwa/favicons/ms-icon-310x310.png',
    'https://fonts.googleapis.com/css2?family=Barlow'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(staticCacheName).then(cache => {
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    console.log('Found ', event.request.url, ' in cache');
                    return response;
                }

                fetch(event.request).then(response => {
                    return caches.open(staticCacheName).then(cache => {
                        cache.put(event.request.url, response.clone());
                        return response;
                    });
                });
            }).catch(error => {
                const errorHeadline = document.createElement('h1');
                errorHeadline.innerText = 'Offline';

                const errorMessage= document.createElement('p');
                errorMessage.innerText = 'Your device has no internet connection :(';

                const qodDiv = document.getElementById('qod-app');
                qodDiv.innerHTML = '';
                qodDiv.append(errorHeadline, errorMessage);

                console.log(error);
            })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(cacheNames.map(cacheName => {
                if (cacheName !== staticCacheName) {
                    return caches.delete(cacheName);
                }
            }));
        })
    );
});
