/*
 * function ListNode(x){
 *   this.val = x;
 *   this.next = null;
 * }
 */

/**
  * 给出一个升序排序的链表，删除链表中的所有重复出现的元素，只保留原链表中只出现一次的元素。
  * 
  * @param head ListNode类 
  * @return ListNode类
  */
function deleteDuplicates( head ) {
  // write code here
  const root = { next: null };
  let prev = root;
  while(head) {
    if(head.next && head.val === head.next.val) {
      // 跳过重复元素
      let tval = head.val;
      while(head && head.val === tval) {
        head = head.next;
        // 处理连续重复的情况
        if(head && head.val !== tval && head.next && head.next.val === head.val) {
          tval = head.val;
        }
      }
      prev.next = head;
      prev = head;
      head = head && head.next; // 当前 head 确保为不重复的节点
    } else {
      prev.next = head;
      prev = head;
      head = head.next;
    }
  }
  return root.next;
}
module.exports = {
  deleteDuplicates : deleteDuplicates
};

const { logAssert, createLinkedListByArray, logLinkedListByArray } = require('../tools/LogTools.js');
const list = createLinkedListByArray([1,2,3,3,3,4,4,5,6,6,6]);
// const list = createLinkedListByArray([1,2,3,4,5,6]);
logLinkedListByArray(list);
logLinkedListByArray(deleteDuplicates(list));