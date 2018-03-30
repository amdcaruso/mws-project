var staticCacheName = 'restaurant-static-v2';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/',
        './index.html',
        './restaurant.html',
        './css/styles.css',
        './js/dbhelper.js',
        './js/main.js',
        './js/restaurant_info.js',
        './data/restaurants.json',
        './img/1.jpg.webp',
        './img/2.jpg.webp',
        './img/3.jpg.webp',
        './img/4.jpg.webp',
        './img/5.jpg.webp',
        './img/6.jpg.webp',
        './img/7.jpg.webp',
        './img/8.jpg.webp',
        './img/9.jpg.webp',
        './img/10.jpg.webp',
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('restaurant-') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});