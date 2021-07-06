/*
 * function ListNode(x){
 *   this.val = x;
 *   this.next = null;
 * }
 */

/**
  * 删除给出链表中的重复元素（链表中元素从小到大有序），使链表中的所有元素都只出现一次
  * 
  * @param head ListNode类 
  * @return ListNode类
  */
function deleteDuplicates( head ) {
  // write code here
  let p = head;
  while(p) {
    while(p && p.next && p.val === p.next.val) {
      // 删除下一个重复节点
      p.next = p.next.next
    }
    p = p.next;
  }
  return head;
}
module.exports = {
  deleteDuplicates : deleteDuplicates
};

const { logAssert, createLinkedListByArray, logLinkedListByArray } = require('../tools/LogTools.js');
const list = createLinkedListByArray([1,1,1]);
logLinkedListByArray(deleteDuplicates(list));