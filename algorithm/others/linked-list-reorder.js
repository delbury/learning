/*
 * function ListNode(x){
 *   this.val = x;
 *   this.next = null;
 * }
 */
/**
 * 给定一个单链表，请设定一个函数，将链表的奇数位节点和偶数位节点分别放在一起，重排后输出。
 * 注意是节点的编号而非节点的数值。
 * 
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 * 
 * @param head ListNode类 
 * @return ListNode类
 */
function oddEvenList( head ) {
  // write code here
  if(!head || !head.next) return head;
  let odd = head, even = head.next;
  let cur = even.next, evenStart = even;
  while(cur) {
    odd.next = cur;
    odd = odd.next;
    cur = cur.next;
    if(!cur) break;
    even.next = cur;
    even = even.next;
    cur = cur.next;
  }
  odd.next = evenStart;
  even.next = null;
  return head;
}
module.exports = {
  oddEvenList : oddEvenList
};