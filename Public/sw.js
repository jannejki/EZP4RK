var cacheName = 'v4';

var filesToCache = [
    './manifest.json',
    './pwaImages/ios/144.png',
    './index.html',
    './offline.html',
    './index.css',
    './js/main.js',
    './images/camera.jpg',
    './images/close.png',
    './images/flowchart.jpg',
    './images/joonaslookingjannewondering.jpg',
    './images/kakkapissa.png',
    './images/logo.png',
    './images/looking for spot.jpg',
    './images/menu.png',
    './images/raspi camera.jpg',
    './images/raspi testing.jpg',
    './images/tamperprotectino.jpg',
    'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,700;1,400&display=swap',
    'https://fonts.gstatic.com/s/montserrat/v25/JTUSjIg1_i6t8kCHKm459WlhyyTh89Y.woff2',
    'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js',
]

const addResourcesToCache = async () => {
    const cache = await caches.open(cacheName);
    await cache.addAll(filesToCache);
    console.log('cache saved');
};

const putInCache = async (request, response) => {
    const cache = await caches.open();
    await cache.put(request, response);
};


self.addEventListener('install', evt => {
    console.log('service worker has been installed');
    evt.waitUntil(
        addResourcesToCache()
    );

});
self.addEventListener('activate', evt => {
    console.log('service worker has been activated');
});

const fetchTimeout = (url) => {
    console.log("timed out!", url);
    throw ('Timed out!');
}

let timeout;
self.addEventListener("fetch", (event) => {
    console.log(event.request.url);
    event.respondWith((async () => {
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
            console.log("cachedResponse: ", event.request.url);
            return cachedResponse;
        }
        try {
            const rsp = await fetch(event.request);
            return rsp;
        } catch (err) {
            console.log("err");
            return await (caches.match("./offline.html"));
        }
    })());
});
