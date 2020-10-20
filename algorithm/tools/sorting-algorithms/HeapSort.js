/**
 * 堆排序 (Heap Sort) 
 * 时间复杂度（平均）：O(nlogn)
 * 时间复杂度（最坏）：O(n^2)
 * 时间复杂度（最好）：O(nlogn)
 * 空间复杂度：O(1)
 * 稳定性：不稳定
 * 
 * 1. 将初始待排序关键字序列(R1,R2….Rn)构建成大顶堆，此堆为初始的无序区；
 * 2. 将堆顶元素R[1]与最后一个元素R[n]交换，此时得到新的无序区(R1,R2,……Rn-1)和新的有序区(Rn),且满足R[1,2…n-1]<=R[n]；
 * 3. 由于交换后新的堆顶R[1]可能违反堆的性质，因此需要对当前无序区(R1,R2,……Rn-1)调整为新堆，然后再次将R[1]与无序区最后一个元素交换，得到新的无序区(R1,R2….Rn-2)和新的有序区(Rn-1,Rn)。不断重复此过程直到有序区的元素个数为n-1，则整个排序过程完成。
 */

// 建堆，大顶堆
const buildMaxHeap = function(arr) {
  for(let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    adjustMaxHeap(arr, arr.length, i);
  }

  return arr;
};

// 堆调整，大顶堆
const adjustMaxHeap = function(arr, length, i) {
  if(i >= length) return;

  const left = i * 2 + 1 >= length ? -Infinity : arr[i * 2 + 1];
  const right = i * 2 + 2 >= length ? -Infinity : arr[i * 2 + 2];

  if(arr[i] < left && left > right) {
    // 左子节点最大
    [arr[i], arr[i * 2 + 1]] = [arr[i * 2 + 1], arr[i]];
    adjustMaxHeap(arr, length, i * 2 + 1);
    
  } else if(arr[i] < right && right > left) {
    // 右子节点最大
    [arr[i], arr[i * 2 + 2]] = [arr[i * 2 + 2], arr[i]];
    adjustMaxHeap(arr, length, i * 2 + 2);
  }
};

// 升序
const heapSort = function(arr) {
  buildMaxHeap(arr);

  for(let i = arr.length; i > 0; i--) {
    [arr[0], arr[arr.length - 1]] = [arr[arr.length - 1], arr[0]];
    console.log(JSON.stringify(arr));

    adjustMaxHeap(arr, i - 1, 0);
  }

  return arr;
};

// console.log(buildMaxHeap([3, 6, 7, -2, 4, -123, 0, 54, 32, 6]));
console.log(heapSort([3, 6, 7, -2, 4, -123, 0, 54, 32, 6]));
