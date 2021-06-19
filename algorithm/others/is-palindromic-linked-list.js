/*
 * function ListNode(x){
 *   this.val = x;
 *   this.next = null;
 * }
 */

/**
 * 给定一个链表，请判断该链表是否为回文结构。
 * 
 * @param head ListNode类 the head
 * @return bool布尔型
 */
function isPail( head ) {
  // write code here
  if(!head || !head.next) return true;
  let cur = head;
  const stack = [];
  while(cur) {
    stack.push(cur.val);
    cur = cur.next;
  }
  for(let i = Math.floor(stack.length / 2); i >= 0; i--) {
    if(stack[i] !== stack[stack.length - i - 1]) return false;
  }
  return true;
}
module.exports = {
  isPail : isPail
};

const { logAssert, createLinkedListByArray, logLinkedListByArray } = require('../tools/LogTools.js');
const list = createLinkedListByArray([1,2,3,4,5,5,4,3,2,1]);
console.log(isPail(list));