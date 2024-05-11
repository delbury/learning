/**
 * 用于特定类型算法的练习
 */

const { r, logAssert, log, clearTaskCount } = require('./LogTools');

const sortingPractice = (fn, skip = false) => {
  if (skip) return;
  clearTaskCount();
  const times = 3;
  for (let i = 0; i < times; i++) {
    const length = Math.trunc((Math.random() + 1) * 5);
    const arr = Array.from({ length }, () => Math.trunc((Math.random() - 0.5) * 200));
    log(`raw: ${r.cyan(`[ ${arr.join(', ')} ]`)}`);
    logAssert(
      fn,
      arr,
      [...arr].sort((a, b) => a - b)
    );
  }
};

module.exports = {
  sortingPractice,
};
