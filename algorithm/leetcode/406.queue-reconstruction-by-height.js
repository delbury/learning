/**
 * 假设有打乱顺序的一群人站成一个队列。
 * 每个人由一个整数对(h, k)表示，其中h是这个人的身高，k是排在这个人前面且身高大于或等于h的人数。
 * 编写一个算法来重建这个队列。
 * 
 * 注意：
 * 总人数少于1100人。
 * 
 * 示例
 * 输入:
 * [[7,0], [4,4], [7,1], [5,0], [6,1], [5,2]]
 * 输出:
 * [[5,0], [7,0], [5,2], [6,1], [4,4], [7,1]]
 * 
 * @param {number[][]} people
 * @return {number[][]}
 */

// 1. 超时
var reconstructQueue = function (people) {
  people.sort((a, b) => a[0] - b[0] === 0 ? b[1] - a[1] : a[0] - b[0]);
  const temp = [];
  for (let i = 0; i < people.length; i++) {
    temp[i] = (i === 0 || people[i][0] !== people[i - 1][0]) ? 0 : temp[i - 1] + 1;
  }

  let index = 0;
  while (index < people.length) {
    if (people[index][1] > temp[index]) {
      if (people[index][0] < people[index + 1][0]) {
        temp[index]++;

      } else if (people[index][0] === people[index + 1][0]) {
        temp[index]++;
        temp[index + 1]--;

      } else {
        temp[index + 1]--;
      }

      [people[index], people[index + 1]] = [people[index + 1], people[index]];
      [temp[index], temp[index + 1]] = [temp[index + 1], temp[index]];

      if (people[index + 1][1] === temp[index + 1]) {
        index = 0;
      } else {
        index++;
      }

    } else {
      index++;
    }
  }
  return people;
};

// 2. 
var reconstructQueueII = function (people) {
  people.sort((a, b) => a[0] - b[0] === 0 ? b[1] - a[1] : a[0] - b[0]);
  const temp = [];
  for (let per of people) {
    let sp = per[1] + 1;
    for (let i = 0; i < people.length; i++) {
      if (!temp[i]) {
        sp--;
        if (!sp) {
          temp[i] = per;
          break;
        }
      }
    }
  }

  return temp;
};

// 3.
var reconstructQueueIII = function (people) {
  people.sort((a, b) => a[0] - b[0] === 0 ? a[1] - b[1] : b[0] - a[0]);
  const res = [];
  people.forEach((item, index) => res.splice(item[1], 0, item));
  return res;
};

const { logAssert } = require('./tools/LogTools.js');
logAssert(reconstructQueueIII, [[7, 0], [4, 4], [7, 1], [5, 0], [6, 1], [5, 2]], [[5, 0], [7, 0], [5, 2], [6, 1], [4, 4], [7, 1]]);
// reconstructQueue([[7, 0], [4, 4], [7, 1], [5, 0], [6, 1], [5, 2]]);
