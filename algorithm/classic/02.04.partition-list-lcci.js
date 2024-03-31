/**
 * 给你一个链表的头节点 head 和一个特定值 x ，
 * 请你对链表进行分隔，使得所有 小于 x 的节点都出现在 大于或等于 x 的节点之前。
 * 你不需要 保留 每个分区中各节点的初始相对位置。
 *
 * 示例 1：
 * 输入：head = [1,4,3,2,5,2], x = 3
 * 输出：[1,2,2,4,3,5]
 *
 * 示例 2：
 * 输入：head = [2,1], x = 2
 * 输出：[1,2]
 *
 * 提示：
 * 链表中节点的数目在范围 [0, 200] 内
 * -100 <= Node.val <= 100
 * -200 <= x <= 200
 */

const partition = function (head, x) {
  if (!head || !head.next) return head;
  const customNode = { next: head };
  let p = head;
  let prev = customNode;
  let subNode = null;
  let subNodeCur = null;
  let xNode = null;
  while (p) {
    if (p.val >= x) {
      if (!xNode) xNode = p;
      prev = p;
      p = p.next;
    } else if (p.val < x) {
      prev.next = p.next;
      if (!subNode) {
        subNode = p;
        subNodeCur = p;
      } else {
        subNodeCur.next = p;
        subNodeCur = p;
      }
      p = p.next;
    } else {
      prev = p;
      p = p.next;
    }
  }
  if (subNode) subNodeCur.next = xNode;
  return subNode || head;
};

const { logAssert, createLinkedListByArray, logLinkedListByArray } = require('../tools/LogTools.js');
// const list = createLinkedListByArray([1, 4, 3, 2, 5, 2]);
// logLinkedListByArray(list);
// logLinkedListByArray(partition(list, 3));

const list = createLinkedListByArray([1, 1]);
logLinkedListByArray(list);
logLinkedListByArray(partition(list, 0));
