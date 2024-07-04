const _ = require('./lodash.js');
const { r, getPureStr } = require('./log-color.js');

/**
 * log 调试等工具
 */

// 直接 log
const LOG_FUNC = function (...args) {
  // TODO 暂时只支持返回第一个 log 的参数
  if (typeof args[0] === 'function') {
    const res = args[0](...args.slice(1));
    console.log(res);
    return res;
  } else {
    console.log(...args);
    return args[0];
  }
};
// 用来做动态注入
let log = LOG_FUNC;

// 将需要 log 的东西进行格式化
const formatLogValue = function (value) {
  let formattedRes = value;
  if (Array.isArray(value)) {
    // 嵌套数组
    formattedRes = `[ ${value
      .map((v) => {
        let fv = String(v);
        const type = typeof v;
        (type === 'number' || type === 'boolean') && (fv = r.yellow(fv));
        if (Array.isArray(v)) fv = formatLogValue(v);
        return fv;
      })
      .join(', ')} ]`;
  }
  return formattedRes;
};

// 格式化并 log
const flog = function (...args) {
  log(...args.map((arg) => formatLogValue(arg)));
};

// process.stdout.write('string') 封装
const wline = function (str = '', newLine = false) {
  newLine && (str += '\n');
  process.stdout.write(str, 'utf8');
};

/**
 * 打印堆数组的树形结构图
 * @param {Array} heap
 *
 *          123123
 *         --------
 *     12123     43123
 */
const logHeapTree = function (heap) {
  if (!heap.length) return log(null);

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
      const pad = eachItemWith - getPureStr(str).length;
      const pStart = Math.ceil(pad / 2);

      str = str.padStart(pStart + getPureStr(str).length, fillSymbol);
      str = str.padEnd(pad - pStart + getPureStr(str).length, fillSymbol);

      stringArr.push(str); // 不同深度每项宽度相同

      if (j !== 0) {
        dividerArr.push((heap[j] === null ? ' ' : '-').repeat(getPureStr(str).length)); // 不同深度每项宽度相同
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
  resRows.unshift('*'.padStart(totalWith, '*'));
  resRows.push('*'.padStart(totalWith, '*'));
  resRows.forEach((row) => log(row));
};

const transferBinaryTreeToHeap = function (
  root,
  { valueKey = 'val', leftKey = 'left', rightKey = 'right', valueFormatter, keepRawNode = false } = {}
) {
  if (!root) return log([]);
  const stack = [root];
  const values = [];

  while (stack.filter((node) => node).length) {
    const node = stack.shift();

    if (node) {
      keepRawNode ? values.push(node) : values.push(valueFormatter ? valueFormatter(node) : node[valueKey]);
      stack.push(node[leftKey], node[rightKey]);
    } else {
      values.push(null);
      stack.push(null, null);
    }
  }
  return values;
};

/**
 * 打印二叉树链表
 */
const logBinaryTree = function (root, { valueKey = 'val', leftKey = 'left', rightKey = 'right', valueFormatter } = {}) {
  if (!root) return log(null);
  logHeapTree(transferBinaryTreeToHeap(root, { valueKey, leftKey, rightKey, valueFormatter }));
};

/**
 * 打印堆数组的树形结构图 V2
 * @param {Array} heap
 *
 *            123            123     123
 *         ┌───┴───┐        ┌─┘       └─┐
 *       12123   43123     233         233
 */
// 所有节点的距离 +diff
const changeDistanceNode = function (node, diff, { leftKey = 'left', rightKey = 'right' } = {}) {
  if (!node || !diff) return;
  node.distance += diff;
  node.min += diff;
  node.max += diff;
  changeDistanceNode(node[leftKey], diff, { leftKey, rightKey });
  changeDistanceNode(node[rightKey], diff, { leftKey, rightKey });
};
// 构建距离树
const createDistanceTree = (
  node,
  distance,
  { valueKey = 'val', leftKey = 'left', rightKey = 'right', valueFormatter } = {}
) => {
  if (!node) return node;
  const newNode = {
    val: node[valueKey],
    // 值字符串宽度
    valWidth: getPureStr(node[valueKey]).length,
    // 当前节点的距离
    distance,
    // 当前节点包括子树在内的最大距离
    distanceMax: distance,
    // 当前节点包括子树在内的最小距离
    distanceMin: distance,
    left: createDistanceTree(node[leftKey], distance - 1, { valueKey, leftKey, rightKey, valueFormatter }),
    right: createDistanceTree(node[rightKey], distance + 1, { valueKey, leftKey, rightKey, valueFormatter }),
  };
  // 当前节点包括子节点的最大值字符串宽度
  newNode.nodeValueWidthMax = newNode.valWidth;
  if (newNode[leftKey] || newNode[rightKey]) {
    newNode.distanceMax = Math.max(
      distance,
      newNode[leftKey]?.distanceMax ?? -Infinity,
      newNode[rightKey]?.distanceMax ?? -Infinity
    );
    newNode.distanceMin = Math.min(
      distance,
      newNode[leftKey]?.distanceMin ?? Infinity,
      newNode[rightKey]?.distanceMin ?? Infinity
    );
    newNode.nodeValueWidthMax = Math.max(
      newNode.nodeValueWidthMax,
      newNode[leftKey]?.nodeValueWidthMax ?? -Infinity,
      newNode[rightKey]?.nodeValueWidthMax ?? -Infinity
    );
  }
  // 调整距离树
  if (node[leftKey] && node[rightKey]) {
    // 当左右节点都有时，进行间距调整
    const diff = node[leftKey].max - node[rightKey].min;
    if (diff >= 0) {
      // 太近了，左右子树向外扩张
      const dl = Math.ceil((diff + 1) / 2);
      const dr = diff + 1 - dl;
      changeDistanceNode(newNode[leftKey], -dl);
      changeDistanceNode(newNode[rightKey], dr);
    }
  }
  return newNode;
};
const logBinaryTreeV2 = function (
  root,
  { valueKey = 'val', leftKey = 'left', rightKey = 'right', valueFormatter } = {}
) {
  if (!root) return log(null);

  // 以根节点的距离为 0 开始，左直接点距离为 -1，右子节点距离为 +1
  // 统计所有的子节点距离
  // 计算每个节点的左子树的最大距离和右子树的最小距离
  // 如果 lmax >= rmin 适当增加间距，控制间距在 [1, 2] 内
  const distanceTree = createDistanceTree(root, 0, { valueFormatter });

  const heap = transferBinaryTreeToHeap(distanceTree, {
    valueKey,
    leftKey,
    rightKey,
    valueFormatter,
    keepRawNode: true,
  });

  // 分层，每一层是完整的，包括所有 null
  const layerFullArr = [];
  let i = 0;
  while (i < heap.length) {
    // 第几层
    const l = layerFullArr.length;
    // 这一层元素的个数
    const step = 2 ** l;
    layerFullArr[l] = heap.slice(i, i + step);
    i += step;
  }

  // tableChars
  const tcs = {
    space: ' ',
    lr: '─',
    // br: '┌',
    br: '╭',
    // bl: '┐',
    bl: '╮',
    // tr: '└',
    tr: '╰',
    // tl: '┘',
    tl: '╯',
    tlr: '┴',
  };
  // 转换成二维数组
  const renderArr = [];
  // 偏移量
  const rowOffset = distanceTree.distanceMin;
  // 绘制
  for (const row of layerFullArr) {
    const rowArr = [];
    let prevOffset = rowOffset;
    for (const col of row) {
      if (col) {
        const os = col.distance - prevOffset;
        prevOffset = col.distance + 1;
        rowArr.push(...Array(os).fill(null), col);
      }
    }
    renderArr.push(rowArr);
  }
  const scale = Math.max(distanceTree.nodeValueWidthMax, 5);
  for (let i = 0; i < renderArr.length; i++) {
    const row = renderArr[i];
    let valStrArr = [];
    let lineStrArr = [];
    for (let j = 0; j < row.length; j++) {
      const col = row[j];
      if (col === null) valStrArr.push(tcs.space);
      else valStrArr.push(col.val);

      // 非最后一行，打印辅助线
      // ┌ ─ ┴ ┐ ┘ └
      if (i !== renderArr.length - 1 && _.isNil(lineStrArr[j])) {
        const hasLeft = !_.isNil(col?.left);
        const hasRight = !_.isNil(col?.right);
        let padStr = tcs.space;
        if (col === null) {
          // 已经有值，则使用原值
          padStr = tcs.space;
        } else if (hasLeft && hasRight) {
          padStr = tcs.tlr;
        } else if (hasLeft) {
          padStr = tcs.tl;
        } else if (hasRight) {
          padStr = tcs.tr;
        }
        lineStrArr[j] = padStr;
        if (hasLeft) {
          const end = j;
          j = j - (col.distance - col.left.distance);
          lineStrArr[j++] = tcs.br;
          while (j < end) {
            lineStrArr[j++] = tcs.lr;
          }
        }
        if (hasRight) {
          const rightIndex = j - (col.distance - col.right.distance);
          for (let t = j + 1; t < rightIndex; t++) {
            lineStrArr[t] = tcs.lr;
          }
          lineStrArr[rightIndex] = tcs.bl;
        }
      }
    }

    log(valStrArr.map((it) => padStringCenter(it, scale)).join(''));
    lineStrArr?.length &&
      log(
        lineStrArr
          .map((it) => {
            return padStringCenter(it !== tcs.space ? r._color_240(it) : it, scale, {
              ignoreColor: true,
              padChar: r._color_240(it === tcs.tlr ? tcs.lr : void 0),
              padCharLeft: r._color_240(it === tcs.tl || it === tcs.bl ? tcs.lr : void 0),
              padCharRight: r._color_240(it === tcs.tr || it === tcs.br ? tcs.lr : void 0),
            });
          })
          .join('')
      );
  }
};

/**
 * 打印分割线
 */
const DIV_COUNT = 80;
const logDivider = function (char = '-', length = 60) {
  log(char.repeat(length));
};
const withBgColor = function (str) {
  return r._color_bg_237(str);
};
const logDividerBg = function (length = DIV_COUNT) {
  log(withBgColor(' '.repeat(length)));
};

// 打印结果
const printResult = (passedCases, totalCases, sym = '*') => {
  const complete = passedCases === totalCases;
  let text = ` passed / total: ${r(passedCases, complete ? 'green' : 'red')} / ${r(totalCases, 'green')} `;
  const prefix = DIV_COUNT <= text.length ? 0 : Math.floor((DIV_COUNT - text.length) / 2);
  logDivider(sym, DIV_COUNT);
  log((sym.repeat(prefix) + text).padEnd(DIV_COUNT, sym));
  logDivider(sym, DIV_COUNT);
};
// 打印每条用例结果
const printEach = (no, output, res, passed, options) => {
  if (options?.array2string) {
    output = formatLogValue(output);
    res = formatLogValue(res);
  }
  const time = options?.time ? r.grey(`, time: ${options.time.toFixed(3)}ms`) : '';
  log(`${no}: expect:`, output, `, result:`, res, `, is ${passed ? r('passed', 'green') : r('failed', 'red')} ${time}`);
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
      r += 2 * notNullCount;
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
  log(resString);

  // 存在循环
  if (circleIndex !== null) {
    const leftItems = res.filter((_, ind) => ind < circleIndex);
    const leftSpace = leftItems.reduce((sum, str) => sum + str.length, 0) + leftItems.length * 3;
    log(' '.repeat(leftSpace) + '⭡' + '|'.padStart(resString.length - leftSpace - 2, '_'));
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
    log(row);
  }
};

/**
 * 主要用来debug超长的一连串输入输出，操作actions、参数args分别通过两个数组传入
 * @param {Array} actions 第一个参数为构造函数，其他为实例的函数名字符串
 * @param {Array} args actions 中每一步操作需要传递的参数
 * @param {*} params 额外的配置
 * @returns
 */
const runActionArgByArray = function (
  actions,
  args,
  {
    // 每一步操作预计正确的结果数组，用来做实际输出的校验
    expects,
    // 当某一步的结果错误时是否停止接下来的执行
    stopAtError = false,
    // 手动设置需要停下来的某个一操作的 index
    stoppedIndex,
    // 执行完成后是否需要 log 整个实例
    logInstance = false,
    // 执行完成后是否需要 log 所有的执行结果
    logRes = false,
  } = {}
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
  let isError = false;
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
      isError = true;
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
  if (logRes || isError) {
    expects && log(r.grey('expects:'), formatLogValue(expects));
    log(r.grey('results:'), formatLogValue(res));

    const flow = [];
    const strResArr = [];
    const strExpArr = [];
    const maxLength = [];
    for (let i = 0; i < actions.length; i++) {
      const act = actions[i];
      const params = args[i].join(' ,');
      let str;
      if (i === 0) {
        str = `new ${act.name}(${params})`;
      } else {
        str = `${act}(${params})`;
      }
      const strRes = String(res[i]);
      const strExp = expects ? String(expects[i]) : '';
      const max = Math.max(str.length, strRes.length, strExp.length);
      maxLength[i] = max;
      flow.push(padStringCenter(str, max));
      let sr = padStringCenter(strRes, max);
      expects && strRes !== strExp && (sr = r.red(sr));
      strResArr.push(sr);
      strExp && strExpArr.push(padStringCenter(r.green(strExp), max, { ignoreColor: true }));
    }
    logDividerBg();
    log(flow.join(r.grey(' => ')));
    log(strResArr.join('    '));
    expects && log(strExpArr.join('    '));
    logDividerBg();
  }

  return res;
};

// 将字符串前后添加padding并保持居中
const padStringCenter = function (
  str,
  count,
  {
    padChar = ' ',
    padCharLeft,
    padCharRight,
    // 当可填充字符为奇数时，是否让左侧填充的字符大于右侧，默认是右侧大于左侧
    leftFirst = false,
    // 是否忽略字符串中的 color 控制符
    ignoreColor = false,
  } = {}
) {
  str = String(str);
  let strLength = str.length;
  if (ignoreColor) {
    const pureStr = getPureStr(str);
    strLength = pureStr.length;
  }
  if (strLength >= count) return str;
  if (str === padChar) return str.repeat(count);

  let ps = '';
  let pe = '';
  const needPadCount = count - strLength;
  let c;
  if (needPadCount % 2 === 0) {
    c = needPadCount / 2;
  } else if (leftFirst) {
    c = Math.ceil(needPadCount / 2);
  } else {
    c = Math.floor(needPadCount / 2);
  }
  ps = (padCharLeft ?? padChar).repeat(c);
  pe = (padCharRight ?? padChar).repeat(needPadCount - c);
  return ps + str + pe;
};

/**
 * 将数组绘制到直角坐标系上
 */
const logArrayToCoordinateSystem = function (
  arr,
  {
    // 坐标轴的高度
    chartHeight = 10,
    // x轴刻度的宽度
    xScalePadding = 3,
    // 高亮中点
    highlightCenter = false,
    // x轴不为奇数时，中点取靠右那一个，默认取左
    centerRightFirst = false,
    // 自定义高亮点，[key: index]: color
    customHighlights = {},
    // 忽略的点
    ignoreIndexes = [],
  } = {}
) {
  if (!Array.isArray(arr) || arr.some((it) => !!it && typeof it !== 'number')) {
    throw new Error('params error !');
  }
  const ignoreIndexSet = new Set(ignoreIndexes);
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const range = max - min;
  const centerIndex = centerRightFirst ? Math.floor(arr.length / 2) : Math.floor((arr.length - 1) / 2);
  // 取较小值
  chartHeight = Math.min(max, chartHeight);
  // 判断处理成每行的哪些index有值，生成值矩阵
  const valueMatrix = Array.from({ length: chartHeight + 1 }, () => Array(arr.length).fill(null));
  const normalizedValues = [];
  arr.forEach((it, ind) => {
    // 值归一化，归一化区间 [min(values), max(values)] => [0, chartHeight]
    const nv = Math.floor(((it - min) / range) * chartHeight);
    normalizedValues[ind] = nv;
    valueMatrix[nv][ind] = '*';
  });

  for (let row = 0; row < valueMatrix.length; row++) {
    for (let col = 0; col < arr.length; col++) {
      if (row < normalizedValues[col]) {
        valueMatrix[row][col] = r(
          '┆',
          customHighlights[col] ??
            (highlightCenter && centerIndex === col ? 'green' : ignoreIndexSet.has(col) ? '_color_238' : 'grey')
        );
      }
    }
  }

  // 转换成值字符串行
  const valueRows = [];
  const PAD_PREFIX = r._color_238('╌');
  valueMatrix.forEach((row) => {
    let rowStr = '';
    const itemLastIndex = row.findLastIndex((it) => it === '*');
    let padPrefix = itemLastIndex > 0 ? PAD_PREFIX : ' ';
    for (let i = 0; i < row.length; i++) {
      if (row[i] === '*' && i === itemLastIndex) padPrefix = ' ';

      let char = row[i] === null ? padPrefix : row[i];
      const hl = highlightCenter && i === centerIndex && row[i] === '*';
      const ignore = ignoreIndexSet.has(i) && row[i] === '*';
      char = r(ignore ? '•' : char, customHighlights[i] ?? (hl ? 'green' : ignore ? '_color_238' : void 0));

      rowStr += padStringCenter(char, xScalePadding, {
        ignoreColor: true,
        padChar: padPrefix,
        padCharLeft: row[i] === '*' ? PAD_PREFIX : void 0,
      });
    }
    valueRows.push(rowStr);
  });
  valueRows.reverse();

  // 坐标轴
  const xAxisRows = [];
  const xAxisStr = arr
    .map((_, i) => {
      const hl = highlightCenter && i === centerIndex;
      const c = r('┼', customHighlights[i] ?? (hl ? 'green' : 'grey'));
      return padStringCenter(c, xScalePadding, { padChar: r.grey('─'), ignoreColor: true });
    })
    .join('');
  xAxisRows.push(xAxisStr);
  xAxisRows.push(
    Object.keys(arr)
      .map((k, i) => {
        let s = padStringCenter(k, xScalePadding);
        s = r(s, customHighlights[i] ?? (highlightCenter && i === centerIndex ? 'green' : void 0));
        return s;
      })
      .join('')
  );

  const cols = arr.length * xScalePadding + 1;
  const divider = logDividerBg(cols);
  log(divider);
  for (const r of [...valueRows, ...xAxisRows]) {
    log(' ' + r);
  }
  log(divider);
};

/**
 * 将多个输出区域并列放置
 * 如：
 *    ⿴
 *    ⿴
 *    ⿴
 * 变成：
 *    ⿴ ⿴ ⿴
 * 需要传入一个 log function list，每个函数需要返回已绘制区域的最大行数和列数
 */
const logByColumn = function (logFuncList, { gap = 5, disabled = false } = {}) {
  if (disabled) {
    logFuncList.forEach((fn) => fn());
    return;
  }

  const logResList = [];
  let prevRows = 0;
  let prevCols = 0;
  for (let i = 0; i < logFuncList.length; i++) {
    const logRes = { cols: 0, rows: 0 };
    // 动态注入
    log = (...args) => {
      prevCols !== 0 && wline(r._csi_cha(prevCols));
      const line = LOG_FUNC(...args) ?? '';
      if (typeof line !== 'string') return;
      // 获取每一次 log 的信息
      logRes.rows++;
      logRes.cols = Math.max(getPureStr(line ?? '').length, logRes.cols);
    };

    const logFn = logFuncList[i];
    // 执行 log
    prevRows !== 0 && wline(r._csi_cuu(prevRows));
    const size = logFn();

    if (size) {
      logRes.rows = size.rows;
      logRes.cols = size.cols;
    }
    // 保存 log 信息
    logResList[i] = logRes;

    prevRows = logRes.rows;
    prevCols += logRes.cols + gap + 1;
  }
  const maxRows = Math.max(...logResList.map((it) => it.rows));
  if (maxRows > prevRows) {
    wline(r._csi_cud(maxRows - prevRows));
  }
  // 还原
  log = LOG_FUNC;
};

// exports
module.exports = {
  r,
  log,
  flog,
  wline,
  logByColumn,
  logHeapTree,
  logBinaryTree,
  logBinaryTreeV2,
  logAssert: planTask(logAssert),
  logAssertDisorder: planTask(logAssertDisorder),
  logAssertOrder: planTask(logAssertOrder),
  logAssertFloat: planTask(logAssertFloat),
  logArrayToCoordinateSystem,
  clearTaskCount,
  logLinkedListByArray,
  log2dArray,
  logDivider,
  logDividerBg,
  createLinkedListByArray,
  createCircleLinkedListByArray,
  createTreeByArray,
  createTreeByArrayLayer,
  create2dArray,
  runActionArgByArray,
};
