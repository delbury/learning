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
  if (!heap.length) return null;

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
      stringArr.push(heap[j].toString().padStart(eachItemWith, fillSymbol)); // 不同深度每项宽度相同

      if (j !== 0) {
        dividerArr.push('-'.padStart(eachItemWith, '-')); // 不同深度每项宽度相同
      }
    }

    // 每层的字符间隔不同
    const k = 2 ** (i - 1);
    const gap = deep === i ? lastRowGap : Math.floor((totalWith - k * eachItemWith) / k);
    const preGap = deep === i ? '' : fillSymbol.repeat(Math.ceil(gap / 2));

    resRows.unshift(preGap + stringArr.join(fillSymbol.repeat(gap)));
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

module.exports = {
  logHeapTree
};

// console.log(logHeapTree([1111, 2222, 3333, 4444, 5555, 6666, 7777, 8888, 9999]))