/**
 * 假设链表中每一个节点的值都在 0 - 9 之间，那么链表整体就可以代表一个整数。
 * 给定两个这种链表，请生成代表两个整数相加值的结果链表。
 * 例如：链表 1 为 9->3->7，链表 2 为 6->3，最后生成新的结果链表为 1->0->0->0。
 * 
 * function ListNode(x){
 *   this.val = x;
 *   this.next = null;
 * }
 */
function ListNode(x){
  this.val = x;
  this.next = null;
}
/**
 * 
 * @param head1 ListNode类 
 * @param head2 ListNode类 
 * @return ListNode类
 */
function addInList( head1 ,  head2 ) {
  // write code here
  const stack1 = [];
  const stack2 = [];
  while(head1) {
    stack1.push(head1.val);
    head1 = head1.next;
  }
  while(head2) {
    stack2.push(head2.val);
    head2 = head2.next;
  }
  let head = null;
  let carry = 0;
  while(stack1.length || stack2.length) {
    let t = carry + (stack1.length ? stack1.pop() : 0) + (stack2.length ? stack2.pop() : 0)
    carry = 0;
    if(t >= 10) {
      carry = 1;
      t -= 10;
    }
    const th = new ListNode(t);
    th.next = head;
    head = th;
  }
  if(carry) {
    const th = new ListNode(1);
    th.next = head;
    head = th;
  }
  return head;
}
module.exports = {
  addInList : addInList
};

const { logAssert, createLinkedListByArray, logLinkedListByArray } = require('../tools/LogTools.js');
logLinkedListByArray(addInList(createLinkedListByArray([9,3,7]), createLinkedListByArray([6,3])))
