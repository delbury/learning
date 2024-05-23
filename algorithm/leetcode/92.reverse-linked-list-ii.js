/**
 * 给你单链表的头指针 head 和两个整数 left 和 right ，其中 left <= right 。
 * 请你反转从位置 left 到位置 right 的链表节点，返回 反转后的链表 。
 *
 * 示例 1：
 * 输入：head = [1,2,3,4,5], left = 2, right = 4
 * 输出：[1,4,3,2,5]
 *
 * 示例 2：
 * 输入：head = [5], left = 1, right = 1
 * 输出：[5]
 *
 * 提示：
 * 链表中节点数目为 n
 * 1 <= n <= 500
 * -500 <= Node.val <= 500
 * 1 <= left <= right <= n
 *
 * 进阶： 你可以使用一趟扫描完成反转吗？
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
const reverseBetween = function (head, left, right) {
  const root = { next: head };
  let pl = root;
  let pr = root;
  let n = 1;
  let reverseTail = null;
  let reversePrev = null;
  while (true) {
    if (n < left) {
      pl = pl.next;
      pr = pr.next;
    } else if (n === left) {
      // left的前一个节点，pl停止往后找，pr继续
      pr = pr.next;
      reverseTail = pl.next;
    } else if (n > left && n <= right + 1) {
      // left到right这一段，需要反转链表
      [pr.next, reversePrev, pr] = [reversePrev, pr, pr.next];
    } else {
      // 到right，重组链表并结束
      [pl.next, reverseTail.next] = [reversePrev, pr];
      break;
    }
    n++;
  }
  return root.next;
};

const { log, logAssert, createLinkedListByArray, logLinkedListByArray } = require('../tools/LogTools.js');
const list1 = createLinkedListByArray([1, 2, 3, 4, 5]);
const list2 = createLinkedListByArray([1, 4, 3, 2, 5]);
logLinkedListByArray(list1);
logLinkedListByArray(list2);
logLinkedListByArray(reverseBetween(list1, 2, 4));
