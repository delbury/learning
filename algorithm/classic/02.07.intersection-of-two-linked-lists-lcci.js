/**
 * 给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。
 * 如果两个链表没有交点，返回 null 。
 *
 * 图示两个链表在节点 c1 开始相交：
 *       a1 -> a2
 *               ↘
 *                c1 -> c2 -> c3
 *               ↗
 *  b1 -> b2 -> b3
 *
 * 题目数据 保证 整个链式结构中不存在环。
 *
 * 注意，函数返回结果后，链表必须 保持其原始结构 。
 *
 * 示例 1：
 *      4 -> 1
 *            ↘
 *             8 -> 4 -> 5
 *            ↗
 * 5 -> 0 -> 1
 *
 * 输入：intersectVal = 8, listA = [4,1,8,4,5], listB = [5,0,1,8,4,5], skipA = 2, skipB = 3
 * 输出：Intersected at '8'
 * 解释：相交节点的值为 8 （注意，如果两个链表相交则不能为 0）。
 * 从各自的表头开始算起，链表 A 为 [4,1,8,4,5]，链表 B 为 [5,0,1,8,4,5]。
 * 在 A 中，相交节点前有 2 个节点；在 B 中，相交节点前有 3 个节点。
 *
 * 示例 2：
 * 0 -> 9 -> 1
 *            ↘
 *             2 -> 4
 *            ↗
 *           3
 *
 * 输入：intersectVal = 2, listA = [0,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
 * 输出：Intersected at '2'
 * 解释：相交节点的值为 2 （注意，如果两个链表相交则不能为 0）。
 * 从各自的表头开始算起，链表 A 为 [0,9,1,2,4]，链表 B 为 [3,2,4]。
 * 在 A 中，相交节点前有 3 个节点；在 B 中，相交节点前有 1 个节点。
 *
 * 示例 3：
 * 2 -> 6 -> 4
 *
 * 1 -> 5
 *
 * 输入：intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
 * 输出：null
 * 解释：从各自的表头开始算起，链表 A 为 [2,6,4]，链表 B 为 [1,5]。
 * 由于这两个链表不相交，所以 intersectVal 必须为 0，而 skipA 和 skipB 可以是任意值。
 * 这两个链表不相交，因此返回 null 。
 */

// A 遍历完后再遍历 B
// B 遍历完后再遍历 A
// 若有相交，则会同时处于最后一个节点
const getIntersectionNode = function (headA, headB) {
  if (!headA || !headB) return null;
  let p1 = { next: headA };
  let p2 = { next: headB };
  let firstDone1 = false;
  let firstDone2 = false;
  while (p1.next || !firstDone1 || p2.next || !firstDone2) {
    if (p1.next) {
      p1 = p1.next;
    } else if (!firstDone1) {
      p1 = headB;
      firstDone1 = true;
    }

    if (p2.next) {
      p2 = p2.next;
    } else if (!firstDone2) {
      p2 = headA;
      firstDone2 = true;
    }

    if (p1 === p2) {
      return p1;
    }
  }
  return null;
};

const { logAssert, createLinkedListByArray, logLinkedListByArray } = require('../tools/LogTools.js');
const list = createLinkedListByArray([8, 4, 5]);
const list1 = createLinkedListByArray([4, 1], { tailNode: list });
const list2 = createLinkedListByArray([5, 0, 1], { tailNode: list });

logLinkedListByArray(list1);
logLinkedListByArray(list2);
logLinkedListByArray(getIntersectionNode(list1, list2));
