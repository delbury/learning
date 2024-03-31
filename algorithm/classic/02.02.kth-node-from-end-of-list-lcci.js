/**
 * 实现一种算法，找出单向链表中倒数第 k 个节点。返回该节点的值。
 * 注意：本题相对原题稍作改动
 *
 * 示例：
 * 输入： 1->2->3->4->5 和 k = 2
 * 输出： 4
 *
 * 说明：
 * 给定的 k 保证是有效的。
 */

const kthToLast = function (head, k) {
  let length = 0;
  let p = head;
  while (p) {
    length++;
    p = p.next;
  }
  p = head;
  while (length - k) {
    p = p.next;
    length--;
  }
  return p.val;
};

const { logAssert, createLinkedListByArray } = require('../tools/LogTools.js');
logAssert(kthToLast, createLinkedListByArray([1, 2, 3, 4, 5]), 2, 4);
