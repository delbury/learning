class Queue {
  constructor() {
    this.queue = [];
  }

  // 入队
  enqueue(value) {
    this.queue.push(value);
  }

  // 出队
  dequeue() {
    return this.queue.shift();
  }

  inEmpty() {
    return !this.queue.length;
  }

  front() {
    return this.queue[0];
  }

  clear() {
    this.queue.length = 0;
  }

  get size() {
    return this.queue.length;
  }
}