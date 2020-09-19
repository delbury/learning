// by Map
class LRU {
  constructor(max = 5) {
    // 存放缓存
    this.cache = new Map();
    this.max = max;
  }

  // put
  put(key, value) {
    if(this.cache.has(key)) {
      this.cache.delete(key);

    } else if(this.cache.size >= this.max) {
      const k = this.cache.keys().next().value;
      this.cache.delete(k);
    }

    this.cache.set(key, value);
  }

  // get
  get(key) {
    const value = this.cache.get(key);
    
    if(value === undefined) {
      return -1;
    }

    this.cache.delete(key);
    this.cache.set(key, value);

    return value;
  }
}

// const cache = new LRU(2);

// cache.put(1, 1);
// cache.put(2, 2);
// cache.get(1);       // 返回  1
// cache.put(3, 3);    // 该操作会使得密钥 2 作废
// cache.get(2);       // 返回 -1 (未找到)
// cache.put(4, 4);    // 该操作会使得密钥 1 作废
// cache.get(1);       // 返回 -1 (未找到)
// cache.get(3);       // 返回  3
// cache.get(4);       // 返回  4


