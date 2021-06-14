/**
 * 判断给定的链表中是否有环。如果有环则返回true，否则返回false。
 *
 * function ListNode(x){
 *   this.val = x;
 *   this.next = null;
 * }
 */

/**
 * 
 * @param head ListNode类 
 * @return bool布尔型
 */
function hasCycle( head ) {
  // write code here
  if(!head || !head.next) return false;
  let p1 = head.next, p2 = head;
  while(p1) {
    if(p1 === p2) return true;
    p1 = p1.next;
    if(!p1) break;
    p1 = p1.next;
    p2 = p2.next;
  }
  return false;
}
module.exports = {
  hasCycle : hasCycle
};