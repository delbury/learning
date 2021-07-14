/**
 * 将数组分成 奇数 和 偶数，保持相对顺序，原地算法
 */

const fn = (list) => {
  let l = 0;
  while(l < list.length) {
    if(list[l] % 2 === 1) {
      l++;
    } else {
      let r = l + 1;
      while(list[r] % 2 === 0 && r < list.length) r++;
      if(r >= list.length) break;
      for(let i = r; i > l; i--) {
        [list[i], list[i - 1]] = [list[i - 1], list[i]];
      }
      l++;
    }
  }
  return list;
};

const ff = (list) => {
  let l = 0, r = 0;
  while(r < list.length) {
    if(list[l] % 2 === 1) {
      l++;
      r = Math.max(r, l);
    } else {
      // 当当前左指针为偶数时，找到右指针第一个奇数
      while(list[r] % 2 === 0 && r < list.length) r++;
      // 找不到奇数，表示已经结束
      if(r >= list.length) {
        break;
      }
      // 将右指针指向的奇数，冒泡到左指针指向的偶数
      for(let i = r; i > l; i--) {
        [list[i], list[i - 1]] = [list[i - 1], list[i]];
      }
      // 左、右指针右移
      l++;
    }
  }
  return list;
};

const list = [6, 8, 1, 2, 3, 13, 4, 6, 8, 10, 7, 11, 31, 12, 14, 16];
// const list = [1, 2, 3, 13, 4, 8];
// const list = [1, 3, 13, 4, 6, 15, 17, 19];
// const list = [1, 2, 3, 5, 6, 8, 10, 11];
console.log(ff(list));