/**
 * 现在有一个只包含数字的字符串，将该字符串转化成IP地址的形式，返回所有可能的情况。
 * @param {*} s 
 * @returns {string[]}
 */

export function restoreIpAddresses(s) {
  // write code here
  const res = [];
  const dfs = (str, path) => {
    if ((!str && path.length !== 4) || (str && path.length >= 4)) return;
    if (!str && path.length === 4) return res.push(path.join('.'));

    const one = /\d/.exec(str)[0];
    dfs(str.substring(1), [...path, one])
    if (one === '0') return;

    if (str.length > 1) {
      const two = /\d{2}/.exec(str)[0];
      dfs(str.substring(2), [...path, two]);
    }

    if (str.length > 2) {
      const three = /\d{3}/.exec(str)[0];
      if (+three <= 255) dfs(str.substring(3), [...path, three]);
    }
  };
  dfs(s, []);
  return res;
}

console.log(restoreIpAddresses('25525522135'));