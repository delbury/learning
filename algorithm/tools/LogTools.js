const _ = require('./lodash.js');

/**
 * log 调试等工具
 */

/**
 * 打印堆数组的树形结构图
 * @param {Array} heap 
 * 
 *          123123
 *         ╱      ╲
 *       12123   43123
 */
const logHeapTree = function (heap) {
  if (!heap.length) return console.log(null);

  let deep = Math.floor(Math.log2(heap.length) + 1); // 树的深度
  const eachItemWith = 4;
  const lastRowGap = 2;
  const totalWith = 2 ** (deep - 1) * (eachItemWith + lastRowGap) - lastRowGap;
  const resRows = [];
  const fillSymbol = ' ';
  // const leftSymbol = '╱';
  // const rightSymbol = '╲';

  for (let i = deep; i > 0; i--) {
    let stringArr = [];
    let dividerArr = [];
    const max = Math.min(2 ** i - 1, heap.length);
    for (let j = 2 ** (i - 1) - 1; j < max; j++) {
      let str = heap[j].toString();
      const pad = eachItemWith - str.length;
      const pStart = Math.ceil(pad / 2);

      str = str.padStart(pStart + str.length, fillSymbol);
      str = str.padEnd(pad - pStart + str.length, fillSymbol);

      stringArr.push(str); // 不同深度每项宽度相同

      if (j !== 0) {

        dividerArr.push('-'.repeat(str.length)); // 不同深度每项宽度相同
      }
    }

    // 每层的字符间隔不同
    const gapSymbol = fillSymbol;
    const k = 2 ** (i - 1);
    const gap = deep === i ? lastRowGap : Math.round((totalWith - k * eachItemWith) / k);
    const preGap = deep === i ? '' : gapSymbol.repeat(Math.ceil(gap / 2));

    resRows.unshift(preGap + stringArr.join(gapSymbol.repeat(gap)));
    if (dividerArr.length) {
      resRows.unshift(preGap + dividerArr.reduce((string, item, index) => {
        if (index === 0) {
          return string + item;
        } else if (index % 2 === 0) {
          return string + ' '.repeat(gap) + item;
        } else {
          return string + '-'.repeat(gap) + item;
        }
      }, ''));
    }
  }
  // return resRows.join('\n');
  resRows.unshift('*'.padStart(totalWith, '*'));
  resRows.push('*'.padStart(totalWith, '*'));
  console.log(resRows.join('\n'));
};

/**
 * 打印二叉树链表
 */
const logBinaryTree = function (root, valueKey = 'value', leftKey = 'lchild', rightKey = 'rchild') {
  if (!root) return console.log(null);

  const stack = [root];
  const values = [];

  while (stack.filter(node => node).length) {
    const node = stack.shift();

    if (node) {
      values.push(node[valueKey]);
      stack.push(node[leftKey], node[rightKey]);

    } else {
      stack.push(null, null);
      values.push('');
    }
  }
  logHeapTree(values);
}

/**
 * 函数结果断言
 * @param {Function} fn 需要调试的函数
 * @param {any} input 输入
 * @param {any} output 输出
 */
const logAssert = function (fn, ...args) {
  input = args.slice(0, args.length - 1);
  output = args[args.length - 1];
  const res = fn(...input);
  console.log('expect: ', output, ', result: ', res, ', is ', _.isEqual(res, output));
};

/**
 * 根据属猪创建链表
 * @param {Array} arr 链表节点
 */
const createLinkedListByArray = function (arr, valueKey = 'val', nextKey = 'next') {
  const root = { [nextKey]: null };
  let current = root;
  for (let i = 0; i < arr.length; i++) {
    current[nextKey] = {
      [valueKey]: arr[i],
      [nextKey]: null,
    };
    current = current[nextKey];
  }
  return root[nextKey];
};


/**
 * 根据数据创建树
 * @param {Array} arr 树的节点
 */
const createNode = function (arr, index, valueKey, leftKey, rightKey) {
  if (index >= arr.length || arr[index] === null) return null;

  return {
    [valueKey]: arr[index],
    [leftKey]: createNode(arr, index * 2 + 1, valueKey, leftKey, rightKey),
    [rightKey]: createNode(arr, index * 2 + 2, valueKey, leftKey, rightKey),
  };
};
const createTreeByArray = function (arr, valueKey = 'val', leftKey = 'left', rightKey = 'right') {
  return createNode(arr, 0, valueKey, leftKey, rightKey);
};


// exports
module.exports = {
  logHeapTree,
  logBinaryTree,
  logAssert,
  createLinkedListByArray,
  createTreeByArray,
};
