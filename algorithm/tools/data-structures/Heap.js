/**
 * 大顶堆
 * 大顶堆的构建过程就是从最后一个非叶子结点开始从下往上调整
 * 最后一个非叶子结点的位置是：Math.ceil(arr.length / 2) - 1
 * while循环方式
 * @param {Array} arr 无序数组
 */
const maxHeap = function(arr, length) {
  if(!arr.length) {
    return [];
  }
  const totalLength = length === undefined ? arr.length : length;
  let index = Math.ceil(totalLength / 2) - 1;

  while(index >= 0) {
    let ti = index * 2 + 1; 
    if(arr[index] < arr[ti] && ti < totalLength) {
      [arr[index], arr[ti]] = [arr[ti], arr[index]];

      
      if(((ti * 2 + 1 < totalLength) && arr[ti] < arr[ti * 2 + 1]) || ((ti * 2 + 2 < totalLength) && arr[ti] < arr[ti * 2 + 2])) {
        index = ti;
        continue;
      }
    }

    ti = index * 2 + 2;
    if(arr[index] < arr[ti] && ti < totalLength) {
      [arr[index], arr[ti]] = [arr[ti], arr[index]];

      if(((ti * 2 + 1 < totalLength) && arr[ti] < arr[ti * 2 + 1]) || ((ti * 2 + 2 < totalLength) && arr[ti] < arr[ti * 2 + 2])) {
        index = ti;
        continue;
      }
    }
    index--;
  }
  
  return arr;
};

/**
 * 小顶堆
 * @param {Array} arr 无序数组 
 * 递归方式
 */
const minHeap = function(arr, outIndex) {
  if(!arr.length || (outIndex !== undefined && outIndex < 0)) {
    return;
  }

  const totalLength = arr.length;
  const index = outIndex === undefined ? Math.ceil(totalLength / 2) - 1 : outIndex;


  let ti = index * 2 + 1;
  if(ti < totalLength && arr[index] > arr[ti]) {
    [arr[index], arr[ti]] = [arr[ti], arr[index]];

    if(((ti * 2 + 1 < totalLength) && arr[ti] > arr[ti * 2 + 1]) || ((ti * 2 + 2 < totalLength) && arr[ti] > arr[ti * 2 + 2])) {
      return minHeap(arr, ti);
    }
  }

  ti = index * 2 + 2;
  if(ti < totalLength && arr[index] > arr[ti]) {
    [arr[index], arr[ti]] = [arr[ti], arr[index]];

    if(((ti * 2 + 1 < totalLength) && arr[ti] > arr[ti * 2 + 1]) || ((ti * 2 + 2 < totalLength) && arr[ti] > arr[ti * 2 + 2])) {
      return minHeap(arr, ti);
    }
  }

  return minHeap(arr, index - 1);
};

/**
 * 大顶堆排序
 * @param {Array} arr 大顶堆数组
 */
const maxHeapSort = function(arr) {
  for(let i = arr.length; i > 0; i--) {
    [arr[0], arr[i - 1]] = [arr[i - 1], arr[0]];
    maxHeap(arr, i - 1);
  }
  return arr;
}

/**
 * 小顶堆排序
 * @param {Array} arr 小顶堆数组
 */
const minHeapSort = function(arr) {
  const temp = [...arr];
  const res = [];
  for(let i = arr.length; i > 0; i--) {
    res.unshift(temp[0]);
    temp[0] = temp[temp.length - 1];
    temp.pop();
    minHeap(temp);
  }
  return res;
}

const topK = function(arr, k) {
  for(let i = arr.length; i > arr.length - k; i--) {
    [arr[0], arr[i - 1]] = [arr[i - 1], arr[0]];
    maxHeap(arr, i - 1);
  }
  return arr[arr.length - k];
} 

/*
const maxh = maxHeap([3, 7, 16, 10, 21, 23]);
console.log(maxh);
console.log(maxHeapSort(maxh));


const minh = [3, 7, 16, 10, 21, 23];
minHeap(minh);
console.log(minh);
console.log(minHeapSort(minh));
*/

const maxh = maxHeap([3,2,1,5,6,4]);
console.log(maxh);
console.log(topK(maxh, 2));
