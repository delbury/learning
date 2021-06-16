/**
 * 给定仅有小写字母组成的字符串数组 A，返回列表中的每个字符串中都显示的全部字符（包括重复字符）组成的列表。例如，如果一个字符在每个字符串中出现 3 次，但不是 4 次，则需要在最终答案中包含该字符 3 次。
 * 你可以按任意顺序返回答案。
 *  
 * 示例 1：
 * 输入：["bella","label","roller"]
 * 输出：["e","l","l"]
 * 
 * 示例 2：
 * 输入：["cool","lock","cook"]
 * 输出：["c","o"]
 *  
 * 提示：
 * 1 <= A.length <= 100
 * 1 <= A[i].length <= 100
 * A[i][j] 是小写字母
 * 
 * @param {string[]} A
 * @return {string[]}
 */

// 计数法
var commonChars = function(A) {
  const map = new Map();
  let tmap = null;

  for(let j = 0; j < A.length; j++) {

    // 第一个字符串为参考字符串
    tmap = new Map();
    for(let i = 0; i < A[j].length; i++) {
      if(j === 0) {
        if(map.has(A[j].charAt(i))) {
          map.set(A[j].charAt(i), map.get(A[j].charAt(i)) + 1);
        } else {
          map.set(A[j].charAt(i), 1);
        }
      } else {
        if(tmap.has(A[j].charAt(i))) {
          tmap.set(A[j].charAt(i), tmap.get(A[j].charAt(i)) + 1);
        } else {
          tmap.set(A[j].charAt(i), 1);
        }
      }
    }
    if(j !== 0) {
      for(let [k, v] of map.entries()) {
        if(!tmap.has(k)) {
          map.delete(k);
        } else {
          map.set(k, Math.min(v, tmap.get(k)))
        }
      }
    }
  }

  const res = [];
  for(let [k, v] of map.entries()) {
    for(let i = v; i > 0; i--) {
      res.push(k);
    }
  }

  return res;
};

// reduce 对比
const commonCharsCompare = function(A) {
  return A.reduce(function(a, b) {
    const map = new Map();
  
    for(let i = 0; i < a.length; i++) {
      if(map.has(a[i])) {
        map.set(a[i], map.get(a[i]) + 1);
      } else {
        map.set(a[i], 1);
      }
    }
  
    const res = [];
    for(let i = 0; i < b.length; i++) {
      const count = map.get(b[i]);
      if(count) {
        res.push(b[i]);
        map.set(b[i], count - 1);
      }
    }
  
    return res;
  });
}

// 全API
// const commonCharsOneLine = function(A) {
//   return A.reduce(
//     ([...a], [...b]) => {
//       return a.filter((item) => {
//         return b.indexOf(item) > -1 && b.splice(b.indexOf(item), 1).length
//       })
//     }
//   );
// }
const commonCharsOneLine = A => A.reduce(([...a], [...b]) => a.filter(item => b.indexOf(item) > -1 && b.splice(b.indexOf(item), 1)));

// 替换法
const commonCharsReplace = function(A) {
  const res = [];

  for(let char of A[0]) {
    if(A.every(string => string.includes(char))) {
      res.push(char);
      A = A.map(string => string.replace(char, ''))
    }
  }

  return res;
}

// console.log(commonCharsCompare(["bella","label","roller"]));
// console.log(commonCharsCompare(["cool","lock","cook"]));
// console.log(commonCharsOneLine(["bella","label","roller"]));
// console.log(commonCharsOneLine(["cool","lock","cook"]));
console.log(commonCharsReplace(["bella","label","roller"]));
console.log(commonCharsReplace(["cool","lock","cook"]));
