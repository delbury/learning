const _ = require('./lodash.js');

// 终端打印的颜色
// https://zh.wikipedia.org/wiki/ANSI%E8%BD%AC%E4%B9%89%E5%BA%8F%E5%88%97
// prettier-ignore
const COLORS = {
  'bright'       : '\x1B[1m', // 亮色
  'grey'         : '\x1B[2m', // 灰色
  'italic'       : '\x1B[3m', // 斜体
  'underline'    : '\x1B[4m', // 下划线
  'flicker_s'    : '\x1B[5m', // 缓慢闪烁
  'flicker_f'    : '\x1B[6m', // 快速闪烁
  'reverse'      : '\x1B[7m', // 反向
  'hidden'       : '\x1B[8m', // 隐藏
  'through'      : '\x1B[9m', // 删除线
  'overline'     : '\x1B[53m', // 上划线
  
  'black'        : '\x1B[30m', // 黑色
  'red'          : '\x1B[31m', // 红色
  'green'        : '\x1B[32m', // 绿色
  'yellow'       : '\x1B[33m', // 黄色
  'blue'         : '\x1B[34m', // 蓝色
  'magenta'      : '\x1B[35m', // 品红
  'cyan'         : '\x1B[36m', // 青色
  'white'        : '\x1B[37m', // 白色

  'black_bg'      : '\x1B[40m', // 背景色为黑色
  'red_bg'        : '\x1B[41m', // 背景色为红色
  'green_bg'      : '\x1B[42m', // 背景色为绿色
  'yellow_bg'     : '\x1B[43m', // 背景色为黄色
  'blue_bg'       : '\x1B[44m', // 背景色为蓝色
  'magenta_bg'    : '\x1B[45m', // 背景色为品红
  'cyan_bg'       : '\x1B[46m', // 背景色为青色
  'white_bg'      : '\x1B[47m', // 背景色为白色

  // 8位:  \x1B[38;5;Nm        (N = 0 ~ 255)
  // 24位: \x1B[38;2;R:G:Bm    (R/G/B = 0 ~ 255)
  // 'color'        : '\x1B[38;5;10m', // 设置颜色
  // 'color_bg':    '\x1B[48m;5;', // 设置背景色
   
  'black_l'      : '\x1B[90m', // 亮黑色
  'red_l'        : '\x1B[91m', // 亮红色
  'green_l'      : '\x1B[92m', // 亮绿色
  'yellow_l'     : '\x1B[93m', // 亮黄色
  'blue_l'       : '\x1B[94m', // 亮蓝色
  'magenta_l'    : '\x1B[95m', // 亮品红
  'cyan_l'       : '\x1B[96m', // 亮青色
  'white_l'      : '\x1B[97m', // 亮白色
  'black_bg_l'    : '\x1B[100m', // 背景色为黑色
  'red_bg_l'      : '\x1B[101m', // 背景色为红色
  'green_bg_l'    : '\x1B[102m', // 背景色为绿色
  'yellow_bg_l'   : '\x1B[103m', // 背景色为黄色
  'blue_bg_l'     : '\x1B[104m', // 背景色为蓝色
  'magenta_bg_l'  : '\x1B[105m', // 背景色为品红
  'cyan_bg_l'     : '\x1B[106m', // 背景色为青色
  'white_bg_l'    : '\x1B[107m', // 背景色为白色
};

const START = '\x1B[';
const STOP = '\x1B[0m';

const r = (str, color) => {
  if (!color) return str;
  const t = COLORS[color];
  if (t) return t + str + STOP;
  return proxyR[color](str);
};

// 8位:  \x1B[38;5;Nm        (N = 0 ~ 255)
// 24位: \x1B[38;2;R:G:Bm    (R/G/B = 0 ~ 255)
// 'color'        : '\x1B[38;5;10m', // 设置颜色
// 'color_bg':    '\x1B[48m;5;', // 设置背景色
const callFuncsField = Symbol('callFuncs');
// color_11 / color_111_222_255
const customFunctionColorReg = /_((?<byte>\d{1,3})|((?<r>\d{1,3})_(?<g>\d{1,3})_(?<b>\d{1,3})))$/;
// csi_cuu_11 / csi_cup_11_22 / csi_ede
const customFunctionCsiReg = /_(?<name>\w{2,3})($|_(?<n>\d+)$|_(?<n1>\d+)_(?<n2>\d+)$)/;
const csiSuffixTextMap = {
  // n
  cuu: 'A', // Up
  cud: 'B', // Down
  cuf: 'C', // Forward
  cub: 'D', // Back
  cnl: 'E', // Next Line
  cpl: 'F', // Previous Line
  cha: 'G', // Horizontal Absolute
  su: 'S', // Scroll Up
  sd: 'T', // Scroll Down

  // n;m
  cup: 'H', // Cursor Position
  hvp: 'f', // Horizontal Vertical Position

  // no params
  ede: '0J', // 是0（或缺失），则清除从光标位置到屏幕末尾的部分
  eds: '1J', // 是1，则清除从光标位置到屏幕开头的部分
  eda: '2J', // 是2，则清除整个屏幕（在DOS ANSI.SYS中，光标还会向左上方移动）
  edc: '3J', // 是3，则清除整个屏幕，并删除回滚缓存区中的所有行

  // no params
  ele: '0K', // 是0（或缺失），清除从光标位置到该行末尾的部分
  els: '1K', // 是1，清除从光标位置到该行开头的部分
  ela: '2K', // 是2，清除整行。光标位置不变

  // no params
  scp: 's', // Save Cursor Position
  rcp: 'u', // Restore Cursor Position
};
const handlers = {
  set() {
    return false;
  },
  get(target, prop) {
    const obj = r;
    let item;
    if (prop in COLORS) {
      item = (str) => r(str, prop);
    }
    item = item ?? obj[prop];
    const isPropString = typeof prop === 'string';
    /**
     * 颜色控制，实现自定义函数调用，形如：
     * r._color_[xx]('string')
     * r._color_[xx]_[yy]_[zz]('string')
     * r._color_bg_[xx]('string')
     * r._color_bg_[xx]_[yy]_[zz]('string')
     */
    if (!item && isPropString && prop.startsWith('_color_')) {
      let code = START;

      if (prop.includes('_bg_')) code += '48;';
      else code += '38;';

      const matched = prop.match(customFunctionColorReg);
      if (matched) {
        if (matched.groups?.byte) {
          code += '5;';
          code += matched.groups.byte;
        } else {
          code += '2;';
          code += `${matched.groups.r};${matched.groups.g};${matched.groups.b}`;
        }

        code += 'm';
        item = (str = '') => code + str + STOP;
      }
    }

    /**
     * 光标控制，实现自定义函数调用，形如：
     * r._csi_[method]('string')
     * r._csi_[method]_[n]('string')
     * r._csi_[method]_[n]_[m]('string')
     * [method]: 详见 csiSuffixTextMap
     */
    if (!item && isPropString && prop.startsWith('_csi_')) {
      let code = START;
      const matched = prop.match(customFunctionCsiReg);
      if (matched && csiSuffixTextMap[matched.groups.name]) {
        matched.groups.n && (code += matched.groups.n);
        matched.groups.n1 && (code += `${matched.groups.n1};${matched.groups.n2}`);
        code += csiSuffixTextMap[matched.groups.name];

        item = (p1 = '', p2) => {
          if (typeof p1 === 'string') {
            return code + p1;
          }

          let newCode = START;
          if (p1 !== void 0 && p2 !== void 0) {
            newCode += `${p1};${p2}`;
          } else if (p1 !== void 0) {
            newCode += `${p1}`;
          }
          newCode += csiSuffixTextMap[matched.groups.name];

          return newCode;
        };
      }
    }

    // 链式调用，如：r.italic.grey('string')
    const p =
      typeof item === 'function'
        ? new Proxy((...args) => item(...args), {
            set: handlers.set,
            get(t, p, r) {
              // 保存调用历史
              t[callFuncsField] = [...(target[callFuncsField] ?? []), prop];
              return handlers.get(t, p, r);
            },
            apply(t, thisArg, args) {
              let res = Reflect.apply(t, thisArg, args);
              if (target[callFuncsField]) {
                for (let i = target[callFuncsField].length - 1; i >= 0; i--) {
                  res = proxyR[target[callFuncsField][i]](res);
                }
              }
              return res;
            },
          })
        : item;
    return p;
  },
};

r.color = (str, n1, n2, n3) => {
  if (_.isNil(n1)) return str;
  if (_.isNil(n2) || _.isNil(n3)) return proxyR[`_color_${n1}`](str);
  if (!_.isNil(n2) && !_.isNil(n3)) return proxyR[`_color_${n1}_${n2}_${n3}`](str);
};
r.colorBG = (str, n1, n2, n3) => {
  if (_.isNil(n1)) return str;
  if (_.isNil(n2) || _.isNil(n3)) return proxyR[`_color_bg_${n1}`](str);
  if (!_.isNil(n2) && !_.isNil(n3)) return proxyR[`_color_bg_${n1}_${n2}_${n3}`](str);
};
r.csi = (str, name, n1, n2) => {
  if (_.isNil(n1) || !name) return str;
  if (_.isNil(n2)) return proxyR[`_csi_${name}_${n1}`](str);
  return proxyR[`_csi_${name}_${n1}_${n2}`](str);
};

const proxyR = new Proxy(r, handlers);

// 匹配含有控制字符的正则
const colorESCReg = /\x1B\[.+?m/g;
const getPureStr = (str) => `${str}`.replace(colorESCReg, '');

module.exports = {
  r: proxyR,
  getPureStr,
};
