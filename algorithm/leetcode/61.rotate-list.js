/**
 * 给你一个链表的头节点 head ，旋转链表，将链表每个节点向右移动 k 个位置。
 *
 * 示例 1：
 * 输入：head = [1,2,3,4,5], k = 2
 * 输出：[4,5,1,2,3]
 *
 * 示例 2：
 * 输入：head = [0,1,2], k = 4
 * 输出：[2,0,1]
 *
 * 提示：
 * 链表中节点的数目在范围 [0, 500] 内
 * -100 <= Node.val <= 100
 * 0 <= k <= 2 * 10^9
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
const rotateRight = function (head, k) {
  if (!head) return head;
  let length = 1;
  let tail = head;
  while (tail.next) {
    tail = tail.next;
    length++;
  }
  k %= length;
  if (!k) return head;
  k = length - k - 1;
  let p = head;
  while (k--) {
    p = p.next;
  }
  const newHead = p.next;
  p.next = null;
  tail.next = head;
  return newHead;
};

const { log, logAssert, createLinkedListByArray, logLinkedListByArray } = require('../tools/LogTools.js');
const list = createLinkedListByArray([1, 2, 3, 4, 5]);
logLinkedListByArray(list);
logLinkedListByArray(rotateRight(list, 2));
