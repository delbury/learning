/**
 * 你是产品经理，目前正在带领一个团队开发新的产品。
 * 不幸的是，你的产品的最新版本没有通过质量检测。
 * 由于每个版本都是基于之前的版本开发的，所以错误的版本之后的所有版本都是错的。
 * 
 * 假设你有 n 个版本 [1, 2, ..., n]，你想找出导致之后所有版本出错的第一个错误的版本。
 * 你可以通过调用 bool isBadVersion(version) 接口来判断版本号 version 是否在单元测试中出错。
 * 实现一个函数来查找第一个错误的版本。你应该尽量减少对调用 API 的次数。
 * 
 * 示例:
 * 给定 n = 5，并且 version = 4 是第一个错误的版本。
 * 调用 isBadVersion(3) -> false
 * 调用 isBadVersion(5) -> true
 * 调用 isBadVersion(4) -> true
 * 所以，4 是第一个错误的版本。 
 * 
 * 
 * Definition for isBadVersion()
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */

// 1. 二分
var solutionI = function (isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */

  return function (n) {
    let start = 1;
    let end = n;
    while (start < end) {
      const middle = Math.floor((end + start) / 2);
      if (isBadVersion(middle)) {
        end = middle;
      } else {
        start = middle + 1;
      }
    }
    return start;
  };
};

// 2.
var solution = function(isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function(n) {
    let start = 1, end = n;
    while(start < end) {
      const c = Math.floor((start + end) / 2);
      if(isBadVersion(c)) {
        // 当前有错，右半边都有错，查左半边
        end = c;
      } else {
        // 当前没错，查右半边
        start = c + 1;
      }
    }
    return start
  };
};

const isBadVersion = (n) => n >= 4;
const { logAssert } = require('./tools/LogTools.js');
logAssert(solution(isBadVersion), 5, 4);