const gen = function*() {
  yield '4';
  yield '0';
  yield 'fang 90';
  yield 'yang 50';
  yield 'ning 70';
  yield 'ning2 70';
};

let n, orderBy;
let readline = gen();
readline = readline.next.bind(readline);

n = +readline().value
orderBy = +readline().value;
const res = [];
for(let i = 0; i < n; i++) {
  const info = readline().value.trim().split(' ').map((c, ind) => ind === 1 ? +c : c);
  if(!res.length) {
    res.push(info);
  } else if((info[1] < res[0][1] && orderBy) || (info[1] > res[0][1] && !orderBy)) {
    res.unshift(info);
  } else if((info[1] >= res[res.length - 1][1] && orderBy) || (info[1] <= res[res.length - 1][1] && !orderBy)) {
    res.push(info);
  } else if(orderBy) {
    // 升序
    const index = res.findIndex((item, ind, arr) => info[1] >= item[1] && info[1] < arr[ind + 1][1]);
    res.splice(index + 1, 0, info);
  } else {
    // 降序
    const index = res.findIndex((item, ind, arr) => info[1] <= item[1] && info[1] > arr[ind + 1][1]);
    res.splice(index + 1, 0, info);
  }
}
for(const info of res) {
  console.log(info)
}