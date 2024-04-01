// - 实现一个获取质数的函数，需要满足如下功能
//   - 第一次 getPrime() // 2
//   - 第二次 getPrime() // 3
//   - 第三次 getPrime() // 5

const generator = () => {
  const gen = function* () {
    let current = 2;
    yield current;
    while (true) {
      let isOk = true;
      const num = current++ + 1;
      const end = Math.floor(Math.sqrt(num));
      for (let i = 2; i <= end; i++) {
        if (num % i === 0) {
          isOk = false;
          break;
        }
      }
      if (isOk) {
        yield num;
      }
    }
  };

  return gen();
};
const g = generator();
for (let i = 0; i < 10; i++) {
  console.log(g.next());
}
