/**
 * 给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。
 * 为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。
 * 说明：不允许修改给定的链表。
 * 
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 * 
 * 思路：
 * - 快慢指针
 * - slow = a + b
 * - fast = a + b + nc
 * - fast = 2 * slow
 * - (a：环外长度，b：慢指针环内部分长度，c：整个环的长度)
 */


/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function(head) {
  if(!head) return null;

  let p1 = head;
  let p2 = head.next;

  while(p2) {
    if(p1 === p2) break;

    p2 = p2.next;

    if(!p2) return null;

    p1 = p1.next;
    p2 = p2.next;
  }

  if(!p2) return null;

  p1 = p1.next;
  p2 = head;
  while(1) {
    if(p1 === p2) return p1;

    p1 = p1.next;
    p2 = p2.next;
  }
};

const head = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};
head.next.next.next.next = head.next;
console.log(detectCycle(head));