/**
 * 给定一个字符串，逐个翻转字符串中的每个单词。
 *
 * 说明：
 * 无空格字符构成一个 单词 。
 * 输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。
 * 如果两个单词间有多余的空格，将反转后单词间的空格减少到只含一个。
 *
 * @param {string} s
 * @return {string}
 */

// 正则
const reverseWords = function (s) {
  return s.trim().split(/\s+/).reverse().join(' ');
};

// 队列
const reverseWordsQueue = function (s) {
  const queue = [];
  let left = 0;
  let right = s.length - 1;
  let word = '';

  while (s.charAt(left) === ' ') left++;
  while (s.charAt(right) === ' ') right++;

  while (left <= right) {
    const char = s.charAt(left);
    if (char === ' ' && word) {
      queue.unshift(word);
      word = '';
    } else if (char !== ' ') {
      word += char;
    }
    left++;
  }
  word && queue.unshift(word);
  return queue.join(' ');
};

// 2024.6.26
const reverseWords3 = (s) => {
  const queue = [];
  let temp = '';
  for (let i = 0; i < s.length; i++) {
    if (s[i] === ' ') {
      if (temp) {
        queue.unshift(temp);
        temp = '';
      }
    } else {
      temp += s[i];
    }
  }
  if (temp) queue.unshift(temp);
  return queue.join(' ');
};

console.log(reverseWords('ni hao   a ok the '));
console.log(reverseWordsQueue(' ni hao   a ok the xxx '));
