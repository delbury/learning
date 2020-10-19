/**
 * 洗牌算法
 * @param {Number} n 数组大小
 */
const shuffle = (n) => {
  const arr = Array.from({
    length: n
  }, (v, k) => k + 1);

  for (let i = n - 1; i >= 0; i--) {
    const index = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[index]] = [arr[index], arr[i]];
  }

  return arr;
}

module.exports = {
  shuffle
};

// console.log(shuffle(9).toString());
// console.log(shuffle(9).toString());
// console.log(shuffle(9).toString());
// console.log(shuffle(9).toString());
// console.log(shuffle(9).toString());