importScripts('./outer.js'); // urlsToCache
const cacheName = 'website-cache-v1.1';
const cacheNameOldList = [
  'website-cache',
  'website-cache-v1.0',
];

self.addEventListener('install', ev => {
  console.log('new  install.');
  console.log(self);

  // self.skipWaiting();
  ev.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.log(err))
  );
});

self.addEventListener('activate', async ev => {
  console.log('new  activate.');

  // clients.claim();
  ev.waitUntil(
    caches.keys().then(names => {
      return Promise.all(names.map(name => {
        if(cacheNameOldList.includes(name)) {
          return caches.delete(name);
        }
      }));
    }),
  );
});

self.addEventListener('message', ev => {
  console.log(ev.data);
});

self.addEventListener('fetch', ev => {
  // console.log('fetch: ', ev);

  ev.respondWith(
    caches.match(ev.request).then(res => {
      // // 若存在缓存
      if(res && !navigator.onLine) {
        return res;
      }

      // 若缓存不存在
      const clonedRequest = ev.request.clone();
      return fetch(clonedRequest).then(response => {
        if(!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // 若请求成功
        caches.open(cacheName).then(cache => cache.put(ev.request, response));
        return response.clone();
      });
    })
  );
});

self.addEventListener('notificationclick', ev => {
  const type = ev.action;
  switch(type) {
    case 'switch': {
      ev.waitUntil(clients.matchAll().then(clts => clts[0].focus()));
      break;
    }
    case 'open': {
      clients.openWindow(self.registration.scope + 'service_worker.html');
      break;
    }
    default: break;
  }
});

self.addEventListener('notificationclose', ev => {
  console.log(ev);
});

self.addEventListener('push', ev => {
  console.log('push', ev);
  const data = ev.data.json();
  self.registration.showNotification(data.content, data.options);
});

self.addEventListener('pushsubscriptionchange', ev => {
  console.log(ev);
});

self.addEventListener('sync', ev => {
  const [tag, value] = ev.tag.split(',');
  if(tag === 'test') {
    ev.waitUntil(
      fetch('http://127.0.0.1:4000/test?value=' + value).then(res => {
        return res;
      })
    );
  }
});
