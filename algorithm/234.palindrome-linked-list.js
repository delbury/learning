/**
 * 请判断一个链表是否为回文链表。
 * 
 * 示例 1:
 * 输入: 1->2
 * 输出: false
 * 
 * 示例 2:
 * 输入: 1->2->2->1
 * 输出: true
 * 进阶：
 * 你能否用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题？
 * 
 * 
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */

// 1. 递归
let temp = null;
const check = function (node) {
  if (!node) return true;
  const res = check(node.next) && (temp.val === node.val);
  temp = temp.next;
  return res;
};
var isPalindrome = function (head) {
  temp = head;
  return check(head);
};

// 2. 快慢指针，翻转后半部分链表
const reverse = function (head) {
  let prev = null;
  while (head) {
    const next = head.next;
    head.next = prev;
    prev = head;
    head = next;
  }
  return prev;
}
var isPalindromeII = function (head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
  }

  // 判断奇偶个数
  if (fast) {
    slow = slow.next;
  }
  slow = reverse(slow); // 翻转后半部分
  fast = head;
  while (slow) {
    if (fast.val !== slow.val) return false;
    fast = fast.next;
    slow = slow.next;
  }
  return true
};


const { logAssert, createLinkedListByArray } = require('./tools/LogTools.js');
logAssert(isPalindromeIII, createLinkedListByArray([1, 2]), false);
logAssert(isPalindromeIII, createLinkedListByArray([1, 2, 2, 1]), true);
