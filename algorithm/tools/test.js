const tools = require("./LogTools.js");

// - 链表反转
const main1 = (node) => {
  let p1 = null;
  let p2 = node;
  while (p2) {
    const t = p2.next;
    p2.next = p1;
    p1 = p2;
    p2 = t;
  }
  return p1;
};
// let linkedList = tools.createLinkedListByArray([1, 2, 3, 4, 5, 6]);
// tools.logLinkedListByArray(linkedList);
// linkedList = main1(linkedList);
// tools.logLinkedListByArray(linkedList);

// - 实现一个hook: useInView, 检测某个target是否在视口内

// - 实现一个请求的并发控制器，多个请求进来，同时并发数为n，其他的排队
const main3 = (requests, num) => {
  const queue = Array(num).fill(null);
  const fn = () => {
    while (!!requests.length) {
      const index = queue.findIndex((r) => !r);
      if (index > -1) {
        const req = requests.shift();
        queue[index] = req().then((res) => {
          console.log("queue:", index, " val: ", res);
          queue[index] = null;
          fn();
        });
      } else {
        break;
      }
    }
  };
  fn();
};
const createReq = (val, time) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(val);
    }, time);
  });
main3(
  [
    () => createReq(1, 100), // 100
    () => createReq(2, 200), // 200
    () => createReq(3, 1000), // 1000
    () => createReq(4, 300), // 400
    () => createReq(5, 600), // 800
    () => createReq(6, 500), // 900
    () => createReq(7, 500), // 900
    () => createReq(8, 500), // 900
    () => createReq(9, 500), // 900
  ],
  3
);

// - 实现一个基于axios的拦截器

// - 实现一个获取质数的函数，需要满足如下功能
//   - 第一次 getPrime() // 2
//   - 第二次 getPrime() // 3
//   - 第三次 getPrime() // 5
const main5 = () => {
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
  const g = gen();

  console.log(g.next());
  console.log(g.next());
  console.log(g.next());
  console.log(g.next());
  console.log(g.next());
};
// main5();
