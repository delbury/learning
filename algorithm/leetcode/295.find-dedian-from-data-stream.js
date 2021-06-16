/**
 * 中位数是有序列表中间的数。如果列表长度是偶数，中位数则是中间两个数的平均值。
 * 
 * 例如，
 * [2,3,4] 的中位数是 3
 * [2,3] 的中位数是 (2 + 3) / 2 = 2.5
 * 设计一个支持以下两种操作的数据结构：
 * void addNum(int num) - 从数据流中添加一个整数到数据结构中。
 * double findMedian() - 返回目前所有元素的中位数。
 * 
 * 示例：
 * addNum(1)
 * addNum(2)
 * findMedian() -> 1.5
 * addNum(3) 
 * findMedian() -> 2
 * 
 * 进阶:
 * 如果数据流中所有整数都在 0 到 100 范围内，你将如何优化你的算法？
 * 如果数据流中 99% 的整数都在 0 到 100 范围内，你将如何优化你的算法？
 * 
 * 
 * initialize your data structure here.
 */

// 1. 大小堆
var MedianFinder = function () {
  this.maxHeap = [];
  this.minHeap = [];
  this.size = 0;
};

MedianFinder.prototype.maxHeapify = function (arr, i) {
  const length = arr.length;
  if (i >= length) return;

  const left = 2 * i + 1 >= length ? -Infinity : arr[2 * i + 1]; // 左子节点
  const right = 2 * i + 2 >= length ? -Infinity : arr[2 * i + 2]; // 右子节点

  if (left > arr[i] && left >= right) {
    // 若左子节点最大
    [arr[i], arr[2 * i + 1]] = [arr[2 * i + 1], arr[i]];
    return this.maxHeapify(arr, 2 * i + 1);

  } else if (right > arr[i] && right > left) {
    // 若右子节点最大
    [arr[i], arr[2 * i + 2]] = [arr[2 * i + 2], arr[i]];
    return this.maxHeapify(arr, 2 * i + 2);
  }
};

MedianFinder.prototype.minHeapify = function (arr, i) {
  const length = arr.length;
  if (i >= length) return;

  const left = 2 * i + 1 >= length ? Infinity : arr[2 * i + 1]; // 左子节点
  const right = 2 * i + 2 >= length ? Infinity : arr[2 * i + 2]; // 右子节点

  if (left < arr[i] && left <= right) {
    // 若左子节点最小
    [arr[i], arr[2 * i + 1]] = [arr[2 * i + 1], arr[i]];
    return this.minHeapify(arr, 2 * i + 1);

  } else if (right < arr[i] && right < left) {
    // 若右子节点最小
    [arr[i], arr[2 * i + 2]] = [arr[2 * i + 2], arr[i]];
    return this.minHeapify(arr, 2 * i + 2);
  }
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
  // 原数组长度为奇数
  if (this.size % 2 === 1) {
    if (num <= this.maxHeap[0]) {
      this.maxHeap[0] = num;
      this.maxHeapify(this.maxHeap, 0);

    } else {
      this.minHeap[0] = num;
      this.minHeapify(this.minHeap, 0);
    }
  } else {
    // 为偶数
    if (this.size === 0) {
      this.minHeap.push(num);
      this.maxHeap.push(num);

    } else if (num < this.maxHeap[0]) {
      // 插入的数比中位数小
      this.maxHeap.push(num);
      this.rebuild('max');

      this.minHeap.push(this.maxHeap[0]);
      this.rebuild('min');

    } else if (num > this.minHeap[0]) {
      // 插入的数比中位数大
      this.minHeap.push(num);
      this.rebuild('min');

      this.maxHeap.push(this.minHeap[0]);
      this.rebuild('max');

    } else {
      // 插入的数字为新的中位数
      this.minHeap.push(num);
      this.rebuild('min');

      this.maxHeap.push(num);
      this.rebuild('max');
    }
  }

  this.size++;

  return this;
};

// 可以优化
MedianFinder.prototype.rebuild = function (type, log = false) {
  if (type === 'min') {
    const start = Math.floor(this.minHeap.length / 2) - 1;

    for (let i = start; i >= 0; i = Math.floor((i - 1) / 2)) {
      this.minHeapify(this.minHeap, i);
    }

  } else if (type === 'max') {
    const start = Math.floor(this.maxHeap.length / 2) - 1;

    for (let i = start; i >= 0; i = Math.floor((i - 1) / 2)) {
      this.maxHeapify(this.maxHeap, i);
    }
  }
}

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {
  if (this.size % 2 === 1) {
    // 奇数长度
    return this.maxHeap[0];
  } else {
    // 偶数队列
    return (this.maxHeap[0] + this.minHeap[0]) / 2;
  }
};

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */

// 2. API 式
class MedianFinderAPI {
  constructor() {
    this.arr = [];
  }

  addNum(num) {
    if (!this.arr.length) return this.arr.push(num);

    for (let i = 0; i < this.arr.length; i++) {
      if (i === 0 && num <= this.arr[i]) {
        this.arr.unshift(num);
        return;

      } else if (i === this.arr.length - 1 && num >= this.arr[i]) {
        this.arr.push(num);
        return;

      } else if (i !== 0 && num >= this.arr[i - 1] && num <= this.arr[i]) {
        this.arr.splice(i, 0, num);
        return;
      }
    }

    return this;
  }

  findMedian() {
    if (this.arr.length % 2 === 1) {
      return this.arr[(this.arr.length - 1) / 2];
    } else {
      const index = this.arr.length / 2;
      return (this.arr[index] + this.arr[index - 1]) / 2;
    }
  }
}

// const { logHeapTree } = require('./tools/LogTools.js');
const mf = new MedianFinderAPI();
mf.addNum(6);
console.log(mf.findMedian());
mf.addNum(10);
console.log(mf.findMedian());
mf.addNum(2);
console.log(mf.findMedian());
mf.addNum(6);
console.log(mf.findMedian());
mf.addNum(5);
console.log(mf.findMedian());
mf.addNum(0);
console.log(mf.findMedian());
mf.addNum(6);
console.log(mf.findMedian());
mf.addNum(3);
console.log(mf.findMedian());
mf.addNum(1);
console.log(mf.findMedian());
mf.addNum(0);
console.log(mf.findMedian());
mf.addNum(0);
console.log(mf.findMedian());
// mf.addNum(40).addNum(12).addNum(16).addNum(14).addNum(35).addNum(19).addNum(34).addNum(35).addNum(28).addNum(35);
// mf.addNum(26).addNum(6);
// console.log(mf.findMedian());
// logHeapTree(mf.maxHeap);
// logHeapTree(mf.minHeap);

