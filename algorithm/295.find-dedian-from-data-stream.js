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
    this.maxHeapify(arr, length, 2 * i + 1);

  } else if (right > arr[i] && right > left) {
    // 若右子节点最大
    [arr[i], arr[2 * i + 2]] = [arr[2 * i + 2], arr[i]];
    this.maxHeapify(arr, length, 2 * i + 2);
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
    this.minHeapify(arr, length, 2 * i + 1);

  } else if (right < arr[i] && right < left) {
    // 若右子节点最小
    [arr[i], arr[2 * i + 2]] = [arr[2 * i + 2], arr[i]];
    this.minHeapify(arr, length, 2 * i + 2);
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
};

MedianFinder.prototype.rebuild = function (type) {
  const start = Math.floor(this.minHeap.length / 2) - 1;

  if (type === 'min') {
    for (let i = start; i >= 0; i--) {
      this.minHeapify(this.minHeap, i);
    }

  } else if (type === 'max') {
    for (let i = start; i >= 0; i--) {
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

const { logHeapTree } = require('./tools/LogTools.js');
const mf = new MedianFinder();
mf.addNum(1);
console.log(mf.findMedian());
mf.addNum(2);
console.log(mf.findMedian());
mf.addNum(3);
console.log(mf.findMedian());
mf.addNum(4);
console.log(mf.findMedian());
mf.addNum(5);
console.log(mf.findMedian());
mf.addNum(6);
console.log(mf.findMedian());
mf.addNum(7);
console.log(mf.findMedian());
mf.addNum(8);
console.log(mf.findMedian());
mf.addNum(9);
console.log(mf.findMedian());
mf.addNum(10);
console.log(mf.findMedian());

logHeapTree(mf.maxHeap);
logHeapTree(mf.minHeap);
