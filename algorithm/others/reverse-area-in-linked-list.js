/*
 * function ListNode(x){
 *   this.val = x;
 *   this.next = null;
 * }
 */

/**
  * 将一个链表\ m m 位置到\ n n 位置之间的区间反转，
  * 要求时间复杂度 O(n)O(n)，空间复杂度 O(1)O(1)。
  * 
  * @param head ListNode类 
  * @param m int整型 
  * @param n int整型 
  * @return ListNode类
  */
function reverseBetween( head ,  m ,  n ) {
  // write code here
  if(m === n) return head;
  const root = { next: head };
  let c = 0, p = head, prev = root, t = null, last = null;
  while(c++ < n - 1) {
    if(c < m) {
      prev = p;
      p = p.next;
    } else {
      if(c === m) {
        last = p;
      }
      [p.next, p, t] = [t, p.next, p];
    }
  }
  last.next = p.next;
  p.next = t;
  prev.next = p;
  return root.next;
}
module.exports = {
  reverseBetween : reverseBetween
};

const { logAssert, createLinkedListByArray, logLinkedListByArray } = require('../tools/LogTools.js');
const list = createLinkedListByArray([1,2,3,4,5]);
logLinkedListByArray(reverseBetween(list, 2, 4))