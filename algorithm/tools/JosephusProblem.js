/**
 * 约瑟夫问题
 */

// 1, 2, 3, 0
class JosephusProblem {
  // 数组链表
  static resolveByLinkedArray(n, step) {
    if(step === 1) return n - 1;
    const arr = Array.from({ length: n }, (v, k) => (k + 1) % n);
    let cur = 0, prev = n - 1, count = step;
    while(arr[cur] !== arr[arr[cur]]) {
      if(--count) {
        [cur, prev] = [arr[cur], cur];
      } else {
        arr[prev] = arr[cur];
        cur = arr[cur];
        count = step;
      }
    }
    return cur;
  }

  // 递归
  static resolveByRecursion(n, step) {
    if(step === 1) return n - 1;

    const fn = (len) => {
      if(len === 1) return 0;
      return (fn(len - 1) + step) % len;
    };
    return fn(n);
  }
}

// console.log(JosephusProblem.resolveByLinkedArray(66, 7));
// console.log(JosephusProblem.resolveByRecursion(66, 7));
// console.log(JosephusProblem.resolveByLinkedArray(13, 3));
// console.log(JosephusProblem.resolveByRecursion(13, 3));
// console.log(JosephusProblem.resolveByLinkedArray(4, 2));
// console.log(JosephusProblem.resolveByRecursion(4, 2));
console.log(JosephusProblem.resolveByLinkedArray(33, 7));
console.log(JosephusProblem.resolveByRecursion(33, 7));