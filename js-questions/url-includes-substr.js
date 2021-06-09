/**
 * 如何判断 url 中只包含 qq.com
 */

const include = (url) => {
  return /^http:\/\/(www\.)?qq\.com($|\/|\?)/.test(url);
};

console.log(include('http://www.qq.com')); // true
console.log(include('http://www.qq.com.cn')); // false
console.log(include('http://www.qq.com/a/b')); // true
console.log(include('http://www.qq.com?a=1')); // true
console.log(include('http://www.123qq.com?a=1')); // false

