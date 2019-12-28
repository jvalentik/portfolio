const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/main.dart.js',
    '/manifest.json',
    '/assets/packages/cupretino_icons/assets/CupertinoIcons.ttf'
    '/assets/images/logo_square.jpg',
    '/assets/images/photo.jpg',
    '/assets/fonts/Roboto-Bold.ttf',
    '/assets/fonts/Roboto-Italic.ttf',
    '/assets/fonts/Roboto-Regular.ttf',
    '/assets/fonts/MaterialIcons-Regular.ttf',
    '/assets/favicon.ico',
    '/assets/favicon-16x16.png',
    '/assets/favicon-32x32.png',
    '/assets/favicon-96x96.png',
    '/assets/android-icon-144x144.png'

];

const staticCacheName = `pages-cache-v2`;

self.addEventListener('install', event => {
  console.log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open(staticCacheName)
    .then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener('activate', event => {
  console.log('Activating new service worker...');

  const cacheWhitelist = [staticCacheName];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  console.log('Fetch event for ', event.request.url);
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      if (response) {
        console.log('Found ', event.request.url, ' in cache');
        return response;
      }
      console.log('Network request for ', event.request.url);
      return fetch(event.request)
      .then(response => {
        if (response.status === 404) {
          return caches.match('index.html');
        }
        return caches.open(staticCacheName)
        .then(cache => {
          cache.put(event.request.url, response.clone());
          return response;
        });
      });
    }).catch(error => {
      console.log('Error, ', error);
      return caches.match('index.html');
    })
  );
});
