/**
 * 编写一个函数，检查输入的链表是否是回文的。
 *
 * 示例 1：
 * 输入： 1->2
 * 输出： false
 *
 * 示例 2：
 * 输入： 1->2->2->1
 * 输出： true
 *
 * 进阶：
 * 你能否用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题？
 */

// 后半部分反转链表
const isPalindrome = function (head) {
  if (!head || !head.next) return true;
  const temp = { next: head };
  let p1 = temp;
  let p2 = temp.next;
  let halfLenght = 0;
  while (p2) {
    p1 = p1.next;
    p2 = p2?.next;
    p2 = p2?.next;
    halfLenght++;
  }
  const reverse = (node) => {
    let pleft = null;
    let pright = node.next;
    while (pright) {
      const t = pright.next;
      pright.next = pleft;
      pleft = pright;
      pright = t;
    }
    return pleft;
  };
  let reversedNode = reverse(p1);
  let half = reversedNode;
  let start = head;
  let res = true;
  while (half) {
    res &&= half.val === start.val;
    half = half.next;
    start = start.next;
  }
  p1.next = reverse({ next: reversedNode });
  return res;
};

const { logAssert, createLinkedListByArray, logLinkedListByArray } = require('../tools/LogTools.js');
logAssert(isPalindrome, createLinkedListByArray([1, 2]), false);
logAssert(isPalindrome, createLinkedListByArray([1, 2, 3, 4, 2, 1]), false);
logAssert(isPalindrome, createLinkedListByArray([1, 2, 2, 1]), true);
logAssert(isPalindrome, createLinkedListByArray([1, 2, 3, 1]), false);
