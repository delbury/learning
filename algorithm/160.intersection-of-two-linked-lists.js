/**
 * 编写一个程序，找到两个单链表相交的起始节点。
 * 
 * 注意：
 * 如果两个链表没有交点，返回 null.
 * 在返回结果后，两个链表仍须保持原有的结构。
 * 可假定整个链表结构中没有循环。
 * 程序尽量满足 O(n) 时间复杂度，且仅用 O(1) 内存。
 * 
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 * 
 * 思路：快慢指针，尾指针接头指针
 * 
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */

// 1. 快慢指针
var getIntersectionNode = function (headA, headB) {
  if (!headA || !headB) return null;

  let tail = null;
  let fast = headA;
  let slow = headA;

  while (true) {
    // 构造环
    for (let i = 2; i > 0; i--) {
      // 无环，则为无交点
      if (!fast.next && tail) {
        tail.next = null;
        return null;
      }

      if (!fast.next) {
        tail = fast;
        fast.next = headB;
      }
      fast = fast.next;
    }
    slow = slow.next;

    // 有交点
    if (fast === slow) break;
  }

  slow = headA;
  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next;
  }
  tail.next = null;
  return slow;
};


// 2. 交叉迭代
var getIntersectionNodeCrossIteration = function (headA, headB) {
  let A = headA;
  let B = headB;

  while (A !== B) {
    A = A ? A.next : headB;
    B = B ? B.next : headA;
  }

  return A;
}


function ListNode(val) {
  this.val = val;
  this.next = null;
}
const A1 = new ListNode(11);
const A2 = new ListNode(12);
const A3 = new ListNode(13);
const A4 = new ListNode(14);
const B1 = new ListNode(21);
const B2 = new ListNode(22);
const B3 = new ListNode(23);

A1.next = A2;
A2.next = A3;
A3.next = A4;
B1.next = B2;
B2.next = B3;
B3.next = A3;

console.log(getIntersectionNodeCrossIteration(A1, B1));
