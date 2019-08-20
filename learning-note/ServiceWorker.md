# Service Worker
## 生命周期
- 类
    1. ServiceWorkerContainer // navigator.serviceWorker
    2. ServiceWorkerRegistration // registration
    3. ServiceWorker // ServiceWorkerContainer.controller
    4. ServiceWorkerGlobalScope
```js
  // 注册
  // SW 只会监听 sw.js 文件目录下的的 fetch 请求，或者限制为 scope 设置的子目录下的请求
  navigator.serviceWorker.register('/path/sw.js', { scope: '/basePath/' })
    .then(registration => registration)
    .catch();
```

## APIs
### About ServiceWorker
- ServiceWorkerContainer
  - Attributes
    1. controler: [ServiceWorker, null]
    2. ready: (Promise: ServiceWorkerRegistration)
  - Events
    1. oncontrollerchange // 需要在注册之前监听事件
    2. onerror
    3. onmessage
  - Methods
    1. register()
    2. getRegistration(): ServiceWorkerRegistration
    3. getRegistrations(): ServiceWorkerRegistration[]

- ServiceWorkerRegistration
  - Attibutes
    1. scope
    2. installing: [ServiceWorker, null]
    3. waiting: [ServiceWorker, null]
    4. active: [ServiceWorker, null]
    5. pushManager
    6. sync
  - Events
    1. onupdatefound
  - Methods
    1. getNotifications()
    2. showNotification(title [, options])
    3. update()
    4. unregister()

- ServiceWorker
  - Attributes
    1. scriptURL
    2. state: ['installing', 'installed', 'activating', 'activated', 'redundant']
  - Events
    1. onstatechange
    2. onerror

- ServiceWorkerGlobalScope
  - Attributes
    1. clients: Clients
    2. registration: ServiceWorkerRegistration
    3. caches: CacheStorage
  - Events
    1. onactivate
    2. onfetch
    3. oninstall
    4. onmessage
    5. onnotificationclick
    6. onnotificationclose
    7. onpush
    8. onpushsubscriptionchange
    9. onsync
  - Methods
    1. skipWaiting()
    2. fetch()

- Clients
  - Methods
    1. get()
    2. matchAll()
    3. openWindow()
    4. claim()

### About Cache
- CacheStorage
  1. delete(cacheName)
  2. has(cacheName)
  3. keys()
  4. match(request [, options])
  5. open(cacheName)

- Cache
  1. add(request)
  2. addAll(requests[])
  3. delete(request [, options])
  4. keys([request [, options]])
  5. match(request [, options])
  6. matchAll(request [, options])
  7. put(request, response)

- options
  ```js
    {
      ignoreSearch: false,
      ignoreMethod: false,
      ignoreVary: false,
      // cacheName: is ignored by Cache.delete() | Cache.keys() | Cache.match() | Cache.matchAll()
    }
  ```

### About Other
- fetch
  - req/res 的 body 只能被使用一次 (request/response).clone()

- 缓存使用策略
  1. 网络优先
  2. 缓存优先
  3. 最快
  4. 仅限网络
  5. 仅限缓存
