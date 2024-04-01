// - 实现一个请求的并发控制器，多个请求进来，同时并发数为n，其他的排队
const scheduler = (requests, num) => {
  const queue = Array(num).fill(null);
  const fn = () => {
    while (!!requests.length) {
      const index = queue.findIndex((r) => !r);
      if (index > -1) {
        const req = requests.shift();
        queue[index] = req().then((res) => {
          console.log('queue:', index, ' val: ', res);
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
scheduler(
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
