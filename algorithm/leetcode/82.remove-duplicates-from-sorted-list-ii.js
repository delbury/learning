/**
 * 给定一个已排序的链表的头 head ， 删除原始链表中所有重复数字的节点，只留下不同的数字 。
 * 返回 已排序的链表 。
 *
 * 示例 1：
 * 输入：head = [1,2,3,3,4,4,5]
 * 输出：[1,2,5]
 *
 * 示例 2：
 * 输入：head = [1,1,1,2,3]
 * 输出：[2,3]
 *
 * 提示：
 * 链表中节点数目在范围 [0, 300] 内
 * -100 <= Node.val <= 100
 * 题目数据保证链表已经按升序 排列
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
const deleteDuplicates = function (head) {
  const root = { next: head };
  let prev = root;
  let curr = head;
  while (curr) {
    let p = curr.next;
    let flag = false;
    while (p?.val === curr.val) {
      p = p.next;
      flag = true;
    }
    if (flag) {
      prev.next = p;
      curr = p;
    } else {
      prev = curr;
      curr = curr.next;
    }
  }
  return root.next;
};

const { log, logAssert, createLinkedListByArray, logLinkedListByArray } = require('../tools/LogTools.js');
const list = createLinkedListByArray([1, 1, 1, 1, 2, 3, 3, 4, 4, 5, 5, 5]);
logLinkedListByArray(list);
logLinkedListByArray(deleteDuplicates(list));
