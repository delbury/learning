/*
 * function ListNode(x){
 *   this.val = x;
 *   this.next = null;
 * }
 */

/**
 * 对于一个给定的链表，返回环的入口节点，如果没有环，返回null
 * 拓展：
 * 你能给出不利用额外空间的解法么？
 * 
 * @param head ListNode类 
 * @return ListNode类
 */
// 快慢指针，相遇的时候存在环
// 快指针指回 head，与慢指针同时同步进前进，相遇的节点为入口节点
function detectCycle( head ) {
  // write code here
  if(!head || !head.next) return null;
  let fast = head.next, slow = head;
  while(fast) {
    if(fast === slow) break;
    fast = fast.next;
    if(!fast) return null;
    fast = fast.next;
    slow = slow.next;
  }
  if(!fast) return null;

  // 相遇后
  fast = head;
  slow = slow.next;
  while(true) {
    if(fast === slow) return fast;
    fast = fast.next;
    slow = slow.next;
  }
}
module.exports = {
  detectCycle : detectCycle
};