/*
 * function ListNode(x){
 *   this.val = x;
 *   this.next = null;
 * }
 */

/**
  * 将两个有序的链表合并为一个新链表，（升序）
  * 要求新的链表是通过拼接两个链表的节点来生成的，且合并后新链表依然有序。
  * 
  * @param l1 ListNode类 
  * @param l2 ListNode类 
  * @return ListNode类
  */
function mergeTwoLists( l1 ,  l2 ) {
  // write code here
  const root = { next: null };
  let prev = root;
  while(l1 && l2) {
    if(l1.val < l2.val) {
      prev.next = l1;
      l1 = l1.next;
      prev = prev.next;
    } else {
      prev.next = l2;
      l2 = l2.next;
      prev = prev.next;
    }
  }
  prev.next = l1 || l2;
  return root.next;
}
module.exports = {
  mergeTwoLists : mergeTwoLists
};