/**
 * 给定一个化学式formula（作为字符串），返回每种原子的数量。
 * 原子总是以一个大写字母开始，接着跟随0个或任意个小写字母，表示原子的名字。
 * 如果数量大于 1，原子后会跟着数字表示原子的数量。如果数量等于 1 则不会跟数字。例如，H2O 和 H2O2 是可行的，但 H1O2 这个表达是不可行的。
 * 两个化学式连在一起是新的化学式。例如 H2O2He3Mg4 也是化学式。
 * 一个括号中的化学式和数字（可选择性添加）也是化学式。例如 (H2O2) 和 (H2O2)3 是化学式。
 * 
 * 给定一个化学式，输出所有原子的数量。格式为：第一个（按字典序）原子的名子，
 * 跟着它的数量（如果数量大于 1），然后是第二个原子的名字（按字典序），跟着它的数量（如果数量大于 1），以此类推。
 * 
 * 示例 1:
 * 输入: 
 * formula = "H2O"
 * 输出: "H2O"
 * 解释: 
 * 原子的数量是 {'H': 2, 'O': 1}。
 * 
 * 示例 2:
 * 输入: 
 * formula = "Mg(OH)2"
 * 输出: "H2MgO2"
 * 解释: 
 * 原子的数量是 {'H': 2, 'Mg': 1, 'O': 2}。
 * 
 * 示例 3:
 * 输入: 
 * formula = "K4(ON(SO3)2)2"
 * 输出: "K4N2O14S4"
 * 解释: 
 * 原子的数量是 {'K': 4, 'N': 2, 'O': 14, 'S': 4}。
 * 
 * 注意:
 * 所有原子的第一个字母为大写，剩余字母都是小写。
 * formula的长度在[1, 1000]之间。
 * formula只包含字母、数字和圆括号，并且题目中给定的是合法的化学式。
 * 
 * @param {string} formula
 * @return {string}
 */
var countOfAtoms = function(formula) {
  formula = '(' + formula + ')'; // 统一处理
  const stack = [];
  let arr = formula.split(/(\(|\)|[A-Z][a-z]?\d*)/).filter(it => it); // 分割字符串
  let p = 0;
  while(p < arr.length) {
    if(arr[p] === '(') {
      // 左括号，创建一个 map 域
      stack.push(new Map());
    } else if(arr[p] === ')') {
      // 右括号，当前 map 域结束，与上一个域合并
      // 非最外层
      if(stack.length > 1) {
        let count = 1; // 数量
        // 右括号的后一位为数字
        if(/\d+/.test(arr[p + 1])) {
          count = +arr[++p];
        }

        const curMap = stack.pop();
        const prevMap = stack[stack.length - 1];
        for(let [k, v] of curMap.entries()) {
          prevMap.set(k, (prevMap.get(k) || 0) + v * count);
        }
      }
    } else {
      const subs = arr[p].split(/(\d+)/);
      const curMap = stack[stack.length - 1];
      curMap.set(subs[0], (curMap.get(subs[0]) || 0) + (+subs[1] || 1));
    }
    p++;
  }

  // 排序
  return Array.from(stack[0])
    .sort((a, b) => a < b ? -1 : 1)
    .reduce((res, it) => res + it[0] + (it[1] > 1 ? it[1] : ''), '');
};


const { logAssert, logAssertDisorder } = require('../tools/LogTools.js');
logAssert(countOfAtoms, 'K4(ON(SO3)2)2', 'K4N2O14S4');
// logAssert(countOfAtoms, 'K4(ON(SO3Fe4)12Si2OH4)2', '');