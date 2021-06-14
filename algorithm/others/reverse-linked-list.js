/**
 * 反转链表
 */

/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/


/**
 *       ph
 *       |
 * null  a -> b -> c -> d
 *  |  
 * prev 
 * 
 *             ph
 *             |
 * null <- a   b -> c -> d
 *        |  
 *      prev 
 * 
 *                   ph
 *                   |
 * null <- a <- b    c -> d
 *             |  
 *           prev 
 * 
 *                        ph
 *                        |
 * null <- a <- b <- c    d
 *                   |  
 *                 prev 
 * 
 */
function ReverseListI(pHead) {
  // write code here
  if(!pHead) return pHead;
  let prev = null;
  while(pHead.next) {
    [pHead.next, pHead, prev] = [prev, pHead.next, pHead];    
  }
  pHead.next = prev;
  return pHead;
}

function ReverseList(pHead) {
  // write code here
  if(!pHead) return pHead;
  let prev = null;
  while(pHead) {
    [pHead.next, pHead, prev] = [prev, pHead.next, pHead];    
  }
  return prev;
}

const { logAssert, createLinkedListByArray, logLinkedListByArray } = require('../tools/LogTools.js');
logLinkedListByArray(ReverseList(createLinkedListByArray([1, 2, 3, 4, 5])));