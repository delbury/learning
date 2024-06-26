/**
 * 给定一个单链表 L 的头节点 head ，单链表 L 表示为：
 *
 * L0 → L1 → … → Ln - 1 → Ln
 *
 * 请将其重新排列后变为：
 *
 * L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …
 *
 * 不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。
 *
 * 示例1：
 * 输入：head = [1,2,3,4]
 * 输出：[1,4,2,3]
 *
 * 示例2：
 * 输入：head = [1,2,3,4,5]
 * 输出：[1,5,2,4,3]
 *
 * 提示：
 * 链表的长度范围为 [1, 5 * 104]
 * 1 <= node.val <= 1000
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
 * @return {void} Do not return anything, modify head in-place instead.
 */
const reorderList = function (head) {
  if (!head || !head.next) return head;
  // 先找到中间节点，然后后半段反转，再交替插入前半段
  let temp = null;
  let slow = head;
  let fast = head.next;
  while (fast) {
    temp = slow;
    slow = slow.next;
    fast = fast.next;
    if (!fast) break;
    fast = fast.next;
  }
  temp.next = null;

  temp = null;
  // 反转后半段
  while (slow) {
    const t = slow.next;
    slow.next = temp;
    temp = slow;
    if (!t) break;
    slow = t;
  }

  // 交替插入
  // head: 1 -> 2
  // slow: 5 -> 4 -> 3
  temp = head;
  while (temp) {
    const th = temp.next;
    temp.next = slow;
    slow = slow.next;
    if (!th) break;
    temp.next.next = th;
    temp = th;
  }

  return head;
};

const { log, logAssert, createLinkedListByArray, logLinkedListByArray } = require('../tools/LogTools.js');
const list1 = createLinkedListByArray([1, 2, 3, 4, 5]);
logLinkedListByArray(list1);
reorderList(list1);
logLinkedListByArray(list1);
log('-'.repeat(50));
const list2 = createLinkedListByArray([1, 2, 3, 4]);
logLinkedListByArray(list2);
reorderList(list2);
logLinkedListByArray(list2);
