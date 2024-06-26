/**
 * 给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表 。
 *
 * 示例 1：
 * 输入：head = [4,2,1,3]
 * 输出：[1,2,3,4]
 *
 * 示例 2：
 * 输入：head = [-1,5,3,4,0]
 * 输出：[-1,0,3,4,5]
 *
 * 示例 3：
 * 输入：head = []
 * 输出：[]
 *
 * 提示：
 * 链表中节点的数目在范围 [0, 5 * 104] 内
 * -105 <= Node.val <= 105
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
 * @return {ListNode}
 */
const mergeList = function (l1, l2) {
  const head = { next: null };
  let p = head;
  while (l1 || l2) {
    if (!l1 || !l2) {
      p.next = l1 || l2;
      break;
    } else if (l1.val > l2.val) {
      p.next = l2;
      l2 = l2.next;
    } else {
      p.next = l1;
      l1 = l1.next;
    }
    p.next.next = null;
    p = p.next;
  }
  return head.next;
};
const sortList = function (head) {
  if (!head || !head.next) return head;
  // 快慢指针，归并
  let prev = null;
  let slow = head;
  let fast = head.next;
  while (fast) {
    prev = slow;
    slow = slow.next;
    fast = fast.next;
    if (!fast) break;
    fast = fast.next;
  }
  prev.next = null;

  return mergeList(sortList(head), sortList(slow));
};

const { log, logAssert, createLinkedListByArray, logLinkedListByArray } = require('../tools/LogTools.js');
const list1 = createLinkedListByArray([1, 2, 3, 6, 8]);
logLinkedListByArray(list1);
const list2 = createLinkedListByArray([2, 4, 7, 9]);
logLinkedListByArray(list2);
logLinkedListByArray(mergeList(list1, list2));

const list = createLinkedListByArray(Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)));
logLinkedListByArray(list);
logLinkedListByArray(sortList(list));
