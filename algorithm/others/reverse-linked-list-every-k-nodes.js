/*
 * function ListNode(x){
 *   this.val = x;
 *   this.next = null;
 * }
 */

/**
  * 将给出的链表中的节点每\ k k 个一组翻转，返回翻转后的链表
  * 如果链表中的节点数不是\ k k 的倍数，将最后剩下的节点保持原样
  * 你不能更改节点中的值，只能更改节点本身。
  * 要求空间复杂度 \ O(1) O(1)
  * 
  * @param head ListNode类 
  * @param k int整型 
  * @return ListNode类
  */
function reverseKGroup( head ,  k ) {
  // write code here
  const root = { next: head }; // 虚拟节点，保存头节点
  let prev = root; // 上一部分的尾节点
  let start = head; // 翻转区间的开始节点
  let end = head; // 翻转区间的结束节点
  let count = 1; // 用于翻转计数
  while(end) {
    if(count === k) {
      // 缓存
      const cacheDoneEnd = start; // 缓存当前区间翻转后的尾结点，即为未翻转前的开始节点

      /** 区间翻转开始 **/
      // 翻转前区间为：prev -> n1(cacheDoneEnd) -> ... -> nk -> cacheNextStart
      // 翻转后：prev -> nk -> ... -> n1(cacheDoneEnd) -> cacheNextStart
      // 下一区间：prev(n1(cacheDoneEnd)) -> cacheNextStart(start) -> ...
      let tp = end.next; // 翻转后的节点指向的节点，第一个翻转的节点变为最后一个节点，所以要指向下一区间的开始节点
      while(count > 1) {
        // 当前节点指向前一个节点
        // 前一个节点更新为当前节点
        // 当前节点更新为下一个节点
        [start.next, tp, start] = [tp, start, start.next];
        count--; // 翻转 k - 1 次，即 k 个节点
      }
      start.next = tp; // 将翻转后的最后一个节点指向前一个节点
      /** 区间翻转完成 **/

      // 更新下一区间
      prev.next = start; // 将上一区间的尾节点指向当前区间的开头节点，start 迭代到区间的末尾节点，因为链表翻转，又成为区间的开始节点
      prev = cacheDoneEnd; // 将当前区间的尾结点更新为下一区间的上一区间尾结点
      start = prev.next; // 更新下一区间的开始节点
      end = start; // 重新设置下一区间的尾节点
    } else {
      // 区间范围不足，扩大区间
      end = end.next;
      count++;
    }
  }
  return root.next;
}
module.exports = {
  reverseKGroup : reverseKGroup
};

const { logAssert, createLinkedListByArray, logLinkedListByArray } = require('../tools/LogTools.js');
const list1 = createLinkedListByArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
const list2 = createLinkedListByArray([4, 3, 2, 1, 8, 7, 6, 5, 9]);
logLinkedListByArray(list1);
logLinkedListByArray(list2);
logLinkedListByArray(reverseKGroup(list1, 4));