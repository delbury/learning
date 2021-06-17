/*
 * function ListNode(x){
 *   this.val = x;
 *   this.next = null;
 * }
 */

/**
  * 给定一个链表，删除链表的倒数第 nn 个节点并返回链表的头指针
  * 
  * @param head ListNode类 
  * @param n int整型 
  * @return ListNode类
  */
function removeNthFromEnd( head ,  n ) {
  // write code here
  const root = { next: head };
  let count = 0;
  const fn = node => {
    if(!node) return;

    fn(node.next);
    if(count++ === n) {
      // 删除该节点的后一个节点
      node.next = node.next.next;
    }
  };
  fn(root);
  return root.next;
}
module.exports = {
  removeNthFromEnd : removeNthFromEnd
};

const { logAssert, createLinkedListByArray, logLinkedListByArray } = require('../tools/LogTools.js');
logLinkedListByArray(removeNthFromEnd(createLinkedListByArray([1]), 1));