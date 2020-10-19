/**
 * 希尔排序 （缩小增量排序）(Shell Sort) 
 * 时间复杂度（平均）：O(n^1.3)
 * 时间复杂度（最坏）：O(n^2)
 * 时间复杂度（最好）：O(n)
 * 空间复杂度：O(1)
 * 稳定性：不稳定
 * 
 * 1. 选择一个增量序列t1，t2，…，tk，其中ti>tj，tk=1；
 * 2. 按增量序列个数k，对序列进行k 趟排序；
 * 3. 每趟排序，根据对应的增量ti，将待排序列分割成若干长度为m 的子序列，分别对各子表进行直接插入排序。仅增量因子为1 时，整个序列作为一个表来处理，表长度即为整个序列的长度。
 */

// 生成原始序列
generateShellSequence = function (n) {
  const arr = [];
  while (n > 1) {
    const temp = Math.floor(n / 2);
    arr.unshift(temp);
    n = temp;
  }
  return arr;
};

// 生成 Hibbard 增量序列
// D[k] = 2 ** k - 1
generateHibbardSequence = function* () {
  let k = 1;
  while (true) {
    yield 2 ** (k++) - 1;
  }
};

// 生成 Sedgewick 增量序列
// D[k] = min(9 * 4 ** i - 9 * 2 ** i + 1, 4 ** j - 3 * 2 ** j + 1)
// i = 0, 1, 2, ...
// j = 2, 3, 4, ...
generateSedgewickSequence = function* () {
  let i = 0;
  let j = 2;
  while (true) {
    const resi = 9 * 4 ** i - 9 * 2 ** i + 1;
    const resj = 4 ** j - 3 * 2 ** j + 1;

    if (resi < resj) {
      yield resi;
      i++;
    } else {
      yield resj;
      j++;
    }
  }
};

// 生成序列
generateSequence = function (length, type = 1) {
  if (type === 1) {
    return generateShellSequence(length);
  } else {
    let g = null;
    const arr = [];
    if (type === 2) {
      g = generateHibbardSequence();
    } else if (type === 3) {
      g = generateSedgewickSequence();
    } else {
      return arr;
    }

    while (true) {
      const temp = g.next().value;
      if (temp >= length) {
        break;
      } else {
        arr.push(temp);
      }
    }

    return arr;
  }
};

const shellSort = function (arr, seq = generateSequence(arr.length, 1)) {
  let count = 0;
  for (let k = seq.length - 1; k >= 0; k--) {
    const div = seq[k];

    for (let i = div + 1; i < arr.length; i++) {

      for (let j = i - 1; j >= 0; j--) {
        if (arr[j + div] < arr[j]) {
          [arr[j + div], arr[j]] = [arr[j], arr[j + div]];
          count++;
        }
      }
    }
  }
  console.log(count, JSON.stringify(seq));
  return arr;
};

const shellSortHibbard = function (arr) {
  return shellSort(arr, generateSequence(arr.length, 2));
};

const shellSortSedgewick = function (arr) {
  return shellSort(arr, generateSequence(arr.length, 3));
};

const insertionSort = function (arr) {
  return shellSort(arr, [1]);
};

const { shuffle } = require('../ShuffleAlgorithm.js');

const log = obj => null && console.log(JSON.stringify(obj));
const clone = obj => JSON.parse(JSON.stringify(obj));
const arr = shuffle(200);

log(insertionSort(clone(arr)));
log(shellSort(clone(arr)));
log(shellSortHibbard(clone(arr)));
log(shellSortSedgewick(clone(arr)));
