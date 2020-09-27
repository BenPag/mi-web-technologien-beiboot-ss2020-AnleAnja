const staticCacheName = 'quoteOfTheDayCache';
const filesToCache = [
    '/mi-web-technologien-beiboot-ss2020-AnleAnja/',
    '/mi-web-technologien-beiboot-ss2020-AnleAnja/pwa/manifest.json',
    '/mi-web-technologien-beiboot-ss2020-AnleAnja/pwa/js/main.min.js',
    '/mi-web-technologien-beiboot-ss2020-AnleAnja/pwa/css/styles.min.css',
    '/mi-web-technologien-beiboot-ss2020-AnleAnja/pwa/favicons/android-icon-192x192.png',
    '/mi-web-technologien-beiboot-ss2020-AnleAnja/pwa/favicons/apple-icon-57x57.png',
    '/mi-web-technologien-beiboot-ss2020-AnleAnja/pwa/favicons/apple-icon-60x60.png',
    '/mi-web-technologien-beiboot-ss2020-AnleAnja/pwa/favicons/apple-icon-72x72.png',
    '/mi-web-technologien-beiboot-ss2020-AnleAnja/pwa/favicons/apple-icon-76x76.png',
    '/mi-web-technologien-beiboot-ss2020-AnleAnja/pwa/favicons/apple-icon-114x114.png',
    '/mi-web-technologien-beiboot-ss2020-AnleAnja/pwa/favicons/apple-icon-120x120.png',
    '/mi-web-technologien-beiboot-ss2020-AnleAnja/pwa/favicons/apple-icon-144x144.png',
    '/mi-web-technologien-beiboot-ss2020-AnleAnja/pwa/favicons/apple-icon-152x152.png',
    '/mi-web-technologien-beiboot-ss2020-AnleAnja/pwa/favicons/apple-icon-180x180.png',
    '/mi-web-technologien-beiboot-ss2020-AnleAnja/pwa/favicons/browserconfig.xml',
    '/mi-web-technologien-beiboot-ss2020-AnleAnja/pwa/favicons/favicon.ico',
    '/mi-web-technologien-beiboot-ss2020-AnleAnja/pwa/favicons/favicon-16x16.png',
    '/mi-web-technologien-beiboot-ss2020-AnleAnja/pwa/favicons/favicon-32x32.png',
    '/mi-web-technologien-beiboot-ss2020-AnleAnja/pwa/favicons/favicon-96x96.png',
    '/mi-web-technologien-beiboot-ss2020-AnleAnja/pwa/favicons/favicon-256x256.png',
    '/mi-web-technologien-beiboot-ss2020-AnleAnja/pwa/favicons/ms-icon-70x70.png',
    '/mi-web-technologien-beiboot-ss2020-AnleAnja/pwa/favicons/ms-icon-144x144.png',
    '/mi-web-technologien-beiboot-ss2020-AnleAnja/pwa/favicons/ms-icon-150x150.png',
    '/mi-web-technologien-beiboot-ss2020-AnleAnja/pwa/favicons/ms-icon-310x310.png',
    'https://fonts.googleapis.com/css2?family=Barlow'
];

self.addEventListener('install', event => {
    event.waitUntil(caches.open(staticCacheName).then(cache => {
        return cache.addAll(filesToCache);
    }));
});

self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request).then(response => {
        if (response !== undefined) {
            return response;
        }

        return fetch(event.request).then(response => {
            let responseClone = response.clone();
            caches.open(staticCacheName).then(cache => {
                cache.put(event.request, responseClone);
            });
            return response;
        }).catch((error) => {
            console.log(error);
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
    }));
});

self.addEventListener('activate', event => {
    event.waitUntil(caches.keys().then(cacheNames => {
        return Promise.all(cacheNames.map(cacheName => {
            if (cacheName !== staticCacheName) {
                return caches.delete(cacheName);
            }
        }));
    }));
});

const nexDay = new Date();
nexDay.setHours(0);
nexDay.setMinutes(nexDay.getMinutes() + 1);
nexDay.setSeconds(0);
nexDay.setMilliseconds(0);
nexDay.setDate(nexDay.getDate() + 1);

setInterval(async () => {
    if (nexDay < new Date()) {
        await caches.delete(staticCacheName);
        const cache = await caches.open(staticCacheName);
        await cache.addAll(filesToCache);
    }
}, 1000 * 60);
