/*
 * function ListNode(x){
 *   this.val = x;
 *   this.next = null;
 * }
 */

/**
 * 给定head链表 1->2->3->4, 重新排列为 1->4->2->3
 * 给定head链表 1->2->3->4->5, 重新排列为 1->5->2->4->3
 * 
 * @param head ListNode类 
 * @return void
 */
function reorderList( head ) {
  // write code here
  // 找到中间节点
  if(!head || !head.next) return head;
  let slow = head, fast = head.next;
  while(fast) {
    fast = fast.next;
    if(!fast) break;
    fast = fast.next;
    slow = slow.next;
  }

  // 重设指针
  fast = slow.next;
  slow = head;

  // dfs 重排后半部分节点到前半部分
  const dfs = node => {
    if(!node) return;
    dfs(node.next);
    const temp = slow.next;
    slow.next = node;
    node.next = temp;
    slow = temp;
  };
  dfs(fast);
  slow.next = null;
  return head;
}
module.exports = {
  reorderList : reorderList
};

const { logAssert, createLinkedListByArray, logLinkedListByArray } = require('../tools/LogTools.js');
const list1 = createLinkedListByArray([1,2,3,4,5]);
const list2 = createLinkedListByArray([1,2,3,4]);
logLinkedListByArray(reorderList(list1));
logLinkedListByArray(reorderList(list2));