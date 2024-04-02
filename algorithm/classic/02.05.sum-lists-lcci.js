/**
 * 给定两个用链表表示的整数，每个节点包含一个数位。
 * 这些数位是反向存放的，也就是个位排在链表首部。
 * 编写函数对这两个整数求和，并用链表形式返回结果。
 *
 * 示例：
 * 输入：(7 -> 1 -> 6) + (5 -> 9 -> 2)，即617 + 295
 * 输出：2 -> 1 -> 9，即912
 * 进阶：思考一下，假设这些数位是正向存放的，又该如何解决呢?
 *
 * 示例：
 * 输入：(6 -> 1 -> 7) + (2 -> 9 -> 5)，即617 + 295
 * 输出：9 -> 1 -> 2，即912
 */

const addTwoNumbers = function (l1, l2) {
  const head = {};
  let p = head;
  let curry = 0;
  while (l1 || l2 || curry) {
    let sum = (l1?.val ?? 0) + (l2?.val ?? 0) + curry;
    l1 = l1?.next;
    l2 = l2?.next;

    if (sum > 9) {
      sum %= 10;
      curry = 1;
    } else {
      curry = 0;
    }
    p.val = sum;
    p.next = {};
    if (l1 || l2 || curry) {
      p = p.next;
    }
  }
  p.next = null;
  return head;
};

const { logAssert, createLinkedListByArray, logLinkedListByArray } = require('../tools/LogTools.js');
logAssert(
  addTwoNumbers,
  createLinkedListByArray([7, 1, 6]),
  createLinkedListByArray([5, 9, 2]),
  createLinkedListByArray([2, 1, 9])
);
