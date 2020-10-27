/**
 * 堆
 * 默认为大顶堆
 */

class Heap {
  constructor(type = 'max') {
    this.heap = [];
    this.type = type;

    switch (type) {
      case 'min':
        this.isSwitch = (c, p) => p >= c
        break;

      case 'max':
      default:
        this.isSwitch = (c, p) => p <= c
        break;
    }
  }

  // 堆顶元素
  top() {
    return this.heap[0];
  }

  // 弹出堆顶元素
  pop() {
    [this.heap[0], this.heap[this.size - 1]] = [this.heap[this.size - 1], this.heap[0]];
    const element = this.heap.pop();
    this.down();

    return element;
  }

  // 弹出更新堆
  down(pi = 0) {
    if (pi >= this.size) return;
    const edge = this.type === 'min' ? Infinity : -Infinity;
    const left = 2 * pi + 1 >= this.heap.length ? edge : this.heap[2 * pi + 1]; // 左子节点
    const right = 2 * pi + 2 >= this.heap.length ? edge : this.heap[2 * pi + 2]; // 右子节点

    if (this.isSwitch(left, this.heap[pi]) && this.isSwitch(left, right)) {
      // 比较左子节点
      [this.heap[pi], this.heap[2 * pi + 1]] = [this.heap[2 * pi + 1], this.heap[pi]];
      return this.down(2 * pi + 1);

    } else if (this.isSwitch(right, this.heap[pi]) && this.isSwitch(right, left)) {
      // 比较右子节点
      [this.heap[pi], this.heap[2 * pi + 2]] = [this.heap[2 * pi + 2], this.heap[pi]];
      return this.down(2 * pi + 2);
    }
  }

  // 插入元素
  push(element) {
    this.heap.push(element);
    this.up();

    return this;
  }

  // 插入更新堆
  up(ci = this.heap.length - 1) {
    // 父元素 parentIndex = Math.floor((childIndex - 1) / 2)
    let pi = Math.floor((ci - 1) / 2);
    while (pi >= 0 && this.isSwitch(this.heap[ci], this.heap[pi])) {
      [this.heap[ci], this.heap[pi]] = [this.heap[pi], this.heap[ci]];
      ci = pi;
      pi = Math.floor((ci - 1) / 2);
    }
  }

  get size() {
    return this.heap.length;
  }
}

const { logHeapTree } = require('../LogTools.js');
const heap = new Heap('min');
heap.push(5).push(2).push(1).push(3).push(8).push(4);
logHeapTree(heap.heap);
heap.pop();
logHeapTree(heap.heap);
heap.push(11).push(0);
logHeapTree(heap.heap);
heap.pop();
logHeapTree(heap.heap);
