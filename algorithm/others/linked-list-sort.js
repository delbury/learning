/*
 * function ListNode(x){
 *   this.val = x;
 *   this.next = null;
 * }
 */

/**
 * 给定一个无序单链表，实现单链表的排序(按升序排序)。
 * 
 * @param head ListNode类 the head node
 * @return ListNode类
 */
function sortInList( head ) {
  // write code here
  if(!head || !head.next) return head;
  const arr = [];
  while(head) {
    const t = head.next;
    head.next = null;
    arr.push(head);
    head = t;
  }
  arr.sort((a, b) => a.val - b.val);
  for(let i = 1; i < arr.length; i++) {
    arr[i - 1].next = arr[i];
  }
  arr[arr.length - 1].next = null;
  return arr[0];
}
module.exports = {
  sortInList : sortInList
};

const { logAssert, createLinkedListByArray, logLinkedListByArray } = require('../tools/LogTools.js');
const list = createLinkedListByArray([3,4,1,6,41,124,1241,24,6,214,62,3,52,635,2]);
logLinkedListByArray(sortInList(list));