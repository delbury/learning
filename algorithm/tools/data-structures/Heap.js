/**
 * 堆
 */

// 大顶堆
class MaxHeap {
  constructor(arr) {
    this.heap = arr;
    this.heapify(arr);
  }

  // 建堆
  heapify(arr) {
    return this.heapifyBottomToTop(arr);
  }

  // 堆化
  heapifyBottomToTop(arr) {
    for(let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
      this.adjustHeapBottomToTop(arr, arr.length, i);
    }

    return arr;
  }

  // 调整堆，从后往前
  adjustHeapBottomToTop(arr, length, i) {
    if(i >= length) return;

    const left = 2 * i + 1 >= length ? -Infinity : arr[2 * i + 1]; // 左子节点
    const right = 2 * i + 2 >= length ? -Infinity : arr[2 * i + 2]; // 右子节点

    if(left > arr[i] && left > right) {
      // 若左子节点最大
      [arr[i], arr[2 * i + 1]] = [arr[2 * i + 1], arr[i]];
      this.adjustHeapBottomToTop(arr, length, 2 * i + 1);

    } else if(right > arr[i] && right > left) {
      // 若右子节点最大
      [arr[i], arr[2 * i + 2]] = [arr[2 * i + 2], arr[i]];
      this.adjustHeapBottomToTop(arr, length, 2 * i + 2);
    }
  }

  // 堆化
  heapifyBottomToTop(arr) {
    for(let i = 1; i < arr.length; i++) {
      this.adjustHeapBottomToTop(arr, arr.length, i);
    }

    return arr;
  }

  // 调整堆，从前往后
  adjustHeapTopToBottom(arr, length, i) {
    
  }

  // 排序
  sort() {}

  get size() {
    return this.heap.length;
  }
}


const maxHeap = new MaxHeap([3, 6, 7, -2, 4, -123, 0, 54, 32, 6]);
console.log(maxHeap.heap);