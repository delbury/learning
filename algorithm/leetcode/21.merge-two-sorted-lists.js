/**
 * 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。
 * 示例：
 * 输入：1->2->4, 1->3->4
 * 输出：1->1->2->3->4->4
 *
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const mergeTwoLists = function (l1, l2) {
  let head = { next: null };
  let current = head;
  while (l1 && l2) {
    if (l1.val < l2.val) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }

  if (!l1) {
    current.next = l2;
  } else {
    current.next = l1;
  }
  // current.next = l1 ?? l2;

  return head.next;
};

// 2024.5.6
const mergeTwoLists2 = (l1, l2) => {
  let head = { next: null };
  let p = head;
  while (l1 || l2) {
    if (!l1 || !l2) {
      p.next = l1 ?? l2;
      break;
    } else if (l1.val > l2.val) {
      p.next = l2;
      l2 = l2.next;
    } else {
      p.next = l1;
      l1 = l1.next;
    }
    p = p.next;
  }
  return head.next;
};
