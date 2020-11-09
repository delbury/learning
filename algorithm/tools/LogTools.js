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
 * 
 * @param {Function} fn 需要调试的函数
 * @param {any} input 输入
 * @param {any} output 输出
 */
const logAssert = function (fn, input, output) {
  const res = fn(input);
  console.log('input: ', input, ' is ', _.isEqual(res, output));
  // if (typeof output === 'number' || typeof output === 'string') {
  //   console.log(res === output);
  // } else if (output.constructor === Array) {
  //   console.log(_.equalArrays(res, output));
  // } else if (output.constructor === Object) {
  //   console.log(_.equalObjects(res, output));
  // }
};

module.exports = {
  logHeapTree,
  logBinaryTree,
  logAssert,
};

// console.log(logHeapTree([1, 2, 3333, 4, 5555, 6, 7, 8, 9999, 10, 11, 12, 13, 1444, 15, 1666, 17, 18, 19, 200, 211]))
// const { BinaryTreeNode } = require('./data-structures/BinaryTree.js');
// const A = new BinaryTreeNode(1);
// const B = new BinaryTreeNode(2);
// const C = new BinaryTreeNode(3);
// A.rchild = B;
// B.rchild = C;
// logBinaryTree(A);