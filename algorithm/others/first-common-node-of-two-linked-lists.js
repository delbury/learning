/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
/**
 * 输入两个无环的单链表，找出它们的第一个公共结点。
 * （注意因为传入数据是链表，所以错误测试数据的提示是用其他方式显示的，保证传入数据是正确的）
 */
function FindFirstCommonNode(pHead1, pHead2) {
  // write code here
  let p1 = pHead1, p2 = pHead2;
  while(pHead1 || pHead2) {
    if(pHead1 === pHead2) return pHead1;
    pHead1 = pHead1 ? pHead1.next : p2;
    pHead2 = pHead2 ? pHead2.next : p1;
  }
  return null;
}
module.exports = {
  FindFirstCommonNode : FindFirstCommonNode
};

const common = {
  val: 6,
  next: {
    val: 7,
    next: null,
  },
};
const list1 = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: common,
    }
  }
};
const list2 = {
  val: 4,
  next: {
    val: 5,
    next: common,
  }
};

const { logAssert, createLinkedListByArray, logLinkedListByArray } = require('../tools/LogTools.js');
logLinkedListByArray(list1);
logLinkedListByArray(list2);
console.log(FindFirstCommonNode(list1, list2));