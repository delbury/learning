/**
 * 给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。
 * 说明：本题中，我们将空字符串定义为有效的回文串。
 * 
 * 示例 1:
 * 输入: "A man, a plan, a canal: Panama"
 * 输出: true
 * 
 * 示例 2:
 * 输入: "race a car"
 * 输出: false
 * 
 * @param {string} s
 * @return {boolean}
 */

// 1. API方式
var isPalindrome = function(s) {
  const pure = s.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');

  return pure === pure.split('').reverse().join('');
};

const getCode = function(s, i) {
  const code = s.charCodeAt(i);
  if(code >= 48 && code <= 57 || code >= 97 && code <= 122) {
    return code;
  } else if(code >= 65 && code <= 90) {
    return code + 32;
  }
  return -1;
};

// 头尾指针
var isPalindromePointer = function(s) {
  let left = 0;
  let right = s.length - 1;

  while(left < right) {
    const lcode = getCode(s, left);
    if(lcode < 0) {
      left++;
      continue;
    }

    const rcode = getCode(s, right);
    if(rcode < 0) {
      right--;
      continue;
    }

    if(lcode !== rcode) {
      return false;
    } else {
      left++;
      right--;
    }
  }

  return true;
}

// console.log(isPalindrome('A man, a plan, a canal: Panama'));
// console.log(isPalindrome(''));
console.log(isPalindromePointer('A man, a plan, a canal: Panama'));
console.log(isPalindromePointer(''));
