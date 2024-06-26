const _ = require('./lodash.js');
const r = require('./log-color.js');

/**
 * log 调试等工具
 */

// 直接 log
const log = function (...args) {
  if (typeof args[0] === 'function') {
    console.log(args[0](...args.slice(1)));
  } else {
    console.log(...args);
  }
};

// 将需要 log 的东西进行格式化
const formatLogValue = function (value) {
  const formattedRes = Array.isArray(value)
    ? `[ ${value
        .map((v) => {
          let fv = String(v);
          typeof v === 'number' && (fv = r.yellow(fv));
          return fv;
        })
        .join(', ')} ]`
    : value;
  return formattedRes;
};

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
      let str = (heap[j] ?? '').toString();
      const pad = eachItemWith - str.length;
      const pStart = Math.ceil(pad / 2);

      str = str.padStart(pStart + str.length, fillSymbol);
      str = str.padEnd(pad - pStart + str.length, fillSymbol);

      stringArr.push(str); // 不同深度每项宽度相同

      if (j !== 0) {
        dividerArr.push((heap[j] === null ? ' ' : '-').repeat(str.length)); // 不同深度每项宽度相同
      }
    }

    // 每层的字符间隔不同
    const gapSymbol = fillSymbol;
    const k = 2 ** (i - 1);
    const gap = deep === i ? lastRowGap : Math.round((totalWith - k * eachItemWith) / k);
    const preGap = deep === i ? '' : gapSymbol.repeat(Math.ceil(gap / 2));

    resRows.unshift(preGap + stringArr.join(gapSymbol.repeat(gap)));
    if (dividerArr.length) {
      resRows.unshift(
        preGap +
          dividerArr.reduce((string, item, index) => {
            if (index === 0) {
              return string + item;
            } else if (index % 2 === 0 || !item.trim().length) {
              return string + ' '.repeat(gap) + item;
            } else {
              return string + '-'.repeat(gap) + item;
            }
          }, '')
      );
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
const logBinaryTree = function (root, valueKey = 'val', leftKey = 'left', rightKey = 'right') {
  if (!root) return console.log(null);

  const stack = [root];
  const values = [];

  while (stack.filter((node) => node).length) {
    const node = stack.shift();

    if (node) {
      values.push(node[valueKey]);
      stack.push(node[leftKey], node[rightKey]);
    } else {
      stack.push(null, null);
      values.push(null);
    }
  }
  logHeapTree(values);
};

/**
 * 打印分割线
 */
const DIV_COUNT = 80;
const logDivider = function (char = '-', length = 60) {
  console.log(char.repeat(length));
};

// 打印结果
const printResult = (passedCases, totalCases, sym = '*') => {
  const complete = passedCases === totalCases;
  let text = ` passed / total: ${r(passedCases, complete ? 'green' : 'red')} / ${r(totalCases, 'green')} `;
  const prefix = DIV_COUNT <= text.length ? 0 : Math.floor((DIV_COUNT - text.length) / 2);
  logDivider(sym, DIV_COUNT);
  console.log((sym.repeat(prefix) + text).padEnd(DIV_COUNT, sym));
  logDivider(sym, DIV_COUNT);
};
// 打印每条用例结果
const printEach = (no, output, res, passed, options) => {
  if (options?.array2string) {
    output = formatLogValue(output);
    res = formatLogValue(res);
  }
  const time = options?.time ? r.grey(`, time: ${options.time.toFixed(3)}ms`) : '';
  console.log(
    `${no}: expect:`,
    output,
    `, result:`,
    res,
    `, is ${passed ? r('passed', 'green') : r('failed', 'red')} ${time}`
  );
  logDivider();
};
// 运行测试用例
const run = (fn, ...args) => {
  const input = args.slice(0, args.length - 1);
  const output = args[args.length - 1];
  const t1 = performance.now();
  const res = fn(...input);
  const t2 = performance.now();
  return [output, res, t2 - t1];
};
// 注册到 promise 队列
let promise = null;
let count = 0; // 计数
const clearTaskCount = () => (count = 0);
const tasks = [];
const planTask =
  (fn) =>
  (...args) => {
    if (!promise) {
      promise = Promise.resolve().then(() => {
        Promise.all(tasks).then((res) => {
          const passeds = res.reduce((sum, r) => sum + +r, 0);
          printResult(passeds, res.length);
        });
      });
    }
    tasks.push(
      new Promise((resolve, reject) => {
        resolve(fn(++count, ...args));
      })
    );
  };

/**
 * 函数结果断言
 * @param {Function} fn 需要调试的函数
 * @param {any} input 输入
 * @param {any} output 输出
 */
const logAssert = function (no, ...args) {
  const [output, res, time] = run(...args);
  const passed = _.isEqual(res, output);
  printEach(no, output, res, passed, { time });
  return passed;
};

// 比较浮点数的差值
const logAssertFloat = function (no, ...args) {
  const [output, res, time] = run(...args);
  let passed;
  if (typeof res === 'number' && typeof output === 'number') {
    passed = Math.abs(res - output) < Number.EPSILON * 1e4;
  } else {
    passed = _.isEqual(res, output);
  }
  printEach(no, output, res, passed, { time });
  return passed;
};

// 有序数组
const logAssertOrder = function (no, ...args) {
  const [output, res, time] = run(...args);
  const passed = res.length === output.length ? _.isEqual(output, res) : false;
  printEach(no, output, res, passed, { time });
  return passed;
};

// 无序数组
const logAssertDisorder = function (no, ...args) {
  const [output, res, time] = run(...args);
  const passed = _.isEqual(
    res.constructor === Array ? Array.prototype.sort.call(_.cloneDeep(res)) : res,
    output.constructor === Array ? Array.prototype.sort.call(_.cloneDeep(output)) : output
  );
  printEach(no, output, res, passed, { time });
  return passed;
};

/**
 * 根据数组创建链表
 * @param {Array} arr 链表节点
 */
const createLinkedListByArray = function (arr, { valueKey = 'val', nextKey = 'next', tailNode = null } = {}) {
  const root = { [nextKey]: null };
  let current = root;
  for (let i = 0; i < arr.length; i++) {
    current[nextKey] = {
      [valueKey]: arr[i],
      [nextKey]: null,
    };
    current = current[nextKey];
  }
  current[nextKey] = tailNode;
  return root[nextKey];
};

/**
 * 根据数组创建循环链表
 * @param {Array} arr 链表节点
 * @param {Number} index 循环的节点
 */
const createCircleLinkedListByArray = function (arr, index, { valueKey = 'val', nextKey = 'next' } = {}) {
  const root = { [nextKey]: null };
  let current = root;
  let circleNode;
  for (let i = 0; i < arr.length; i++) {
    const node = {
      [valueKey]: arr[i],
      [nextKey]: null,
    };
    current[nextKey] = node;
    current = current[nextKey];
    if (i === index) {
      circleNode = node;
    }
  }
  current[nextKey] = circleNode;
  return root[nextKey];
};

/**
 * 根据数组创建树
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
  if (typeof arr !== 'object' || !('length' in arr)) throw new TypeError('value must be an array');

  return createNode(arr, 0, valueKey, leftKey, rightKey);
};

/**
 * 根据数组创建树，每一层元素的个数由上一层不为 null 元素的个数决定
 * @param {*} arr
 * @returns
 */
const createTreeByArrayLayer = function (arr, valueKey = 'val', leftKey = 'left', rightKey = 'right') {
  if (typeof arr !== 'object' || !('length' in arr)) throw new TypeError('value must be an array');

  if (!arr.length || arr[0] === null) return null;

  // 计算每一层的截止 index
  const layerBorders = [];
  let layer = 0;
  let r = 0;
  let notNullCount = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== null) notNullCount++;

    if (r === i) {
      // 一层结束
      // 下一层的分界点
      layerBorders[layer] = r;
      r += 2 ** notNullCount;
      notNullCount = 0;
      layer++;
    }
  }
  if (notNullCount) layerBorders[layer] = r;
  // 计算每一层的起始 index
  const layerStarts = layerBorders.map((border, index, arr) => (index === 0 ? border : arr[index - 1] + 1));

  const create = (layer) => {
    // 用来判断每一层遍历到的 index 是否超出了这一层的边界
    if (layer >= layerStarts.length || layerStarts[layer] > layerBorders[layer]) return null;
    const index = layerStarts[layer]++;
    if (arr[index] === null || index >= arr.length) return null;
    return {
      [valueKey]: arr[index],
      left: create(layer + 1),
      right: create(layer + 1),
    };
  };

  return create(0);
};

/**
 * 打印链表的值
 * @param {Object} node 链表对象
 */
const logLinkedListByArray = function (node, valueKey = 'val', nextKey = 'next') {
  const nodeMap = new Map();
  const res = [];
  let index = 0;
  let circleIndex = null;
  while (node) {
    if (nodeMap.has(node)) {
      circleIndex = nodeMap.get(node);
      break;
    } else {
      nodeMap.set(node, index++);
    }
    res.push(String(node[valueKey]));
    node = node[nextKey];
  }

  const resString = res.join(' → ');
  console.log(resString);

  // 存在循环
  if (circleIndex !== null) {
    const leftItems = res.filter((_, ind) => ind < circleIndex);
    const leftSpace = leftItems.reduce((sum, str) => sum + str.length, 0) + leftItems.length * 3;
    console.log(' '.repeat(leftSpace) + '⭡' + '|'.padStart(resString.length - leftSpace - 2, '_'));
  }
};

/**
 * 创建二维数组
 * @param {Number} m 共几行
 * @param {Number} n 共几列
 * @param {Boolean} random 是否随机生成
 */
const create2dArray = function (m, n, random = false) {
  const matrix = [];
  for (let i = 0; i < m; i++) {
    const row = [];
    for (let j = 0; j < n; j++) {
      row.push(random ? Math.floor(Math.random() * 100) : i * n + j);
    }
    matrix.push(row);
  }
  return matrix;
};

/**
 * 打印二维数组
 * @param {Array} arr 二维数组
 */
const log2dArray = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    const row = arr[i].map((it) => `${it}`.padStart(3, ' ')).join(', ');
    console.log(row);
  }
};

/**
 * 主要用来debug超长的一连串输入输出
 * 操作actions、参数args分别通过两个数组传入
 * actions的第一个参数为构造函数
 * 可以传入预期结果expects来做实际输出校验
 * 传入expects的情况下设置stopAtError可以在结果出错时终止执行
 * 设置stopAtIndex，可以手动指定只执行到第几个操作
 */
const runActionArgByArray = function (
  actions,
  args,
  { expects, stopAtError = false, stoppedIndex, logInstance = false, logRes = false } = {}
) {
  if (typeof actions[0] !== 'function') {
    console.error('第一个参数不是函数');
    return;
  }
  if (actions.length !== args.length) {
    console.warn(`actions: ${actions.length}, args: ${args.length}, 数量不相等`);
  }
  const instance = new actions[0](args[0]);
  const res = [null];
  for (let i = 1; i < actions.length; i++) {
    const item = instance[actions[i]](...args[i]) ?? null;
    res.push(item);

    const stopString = `stop at index: ${i}, expect: ${r.green(expects?.[i] ?? '-')}, result: ${r.red(item)}`;
    const actionString = `action is: ${actions[i]}, arg is ${args[i].toString() || r.grey('empty')}`;

    if (Number.isInteger(stoppedIndex) && stoppedIndex === i) {
      log('custom', stopString);
      log(actionString);
      log(r.green('current instance:'));
      log(instance);
      return res;
    }

    if (stopAtError && expects && !_.isEqual(item, expects[i])) {
      log('error', stopString);
      log(actionString);
      log(r.green('current instance:'));
      log(instance);
      return res;
    }
  }
  if (expects) {
    const notEqualIndex = res.findIndex((it, ind) => !_.isEqual(it, expects[ind]));
    if (notEqualIndex === -1) {
      log(r.green('it is perfect'));
    } else {
      log(
        `error at index: ${r.yellow(notEqualIndex)}, result: ${r.red(res[notEqualIndex])}, expect: ${r.green(
          expects[notEqualIndex]
        )}`
      );
    }
  }
  if (logInstance) {
    log(r.green('current instance:'));
    log(instance);
  }
  logRes && expects && log(r.grey('expects:'), formatLogValue(expects));
  logRes && log(r.grey('results:'), formatLogValue(res));

  return res;
};

// exports
module.exports = {
  r,
  log,
  logHeapTree,
  logBinaryTree,
  logAssert: planTask(logAssert),
  logAssertDisorder: planTask(logAssertDisorder),
  logAssertOrder: planTask(logAssertOrder),
  logAssertFloat: planTask(logAssertFloat),
  clearTaskCount,
  logLinkedListByArray,
  log2dArray,
  logDivider,
  createLinkedListByArray,
  createCircleLinkedListByArray,
  createTreeByArray,
  createTreeByArrayLayer,
  create2dArray,
  runActionArgByArray,
};
