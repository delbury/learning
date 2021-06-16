/**
 * 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
 * 
 * 进阶：你能尝试使用一趟扫描实现吗？
 * 
 * 示例 1：
 * 输入：head = [1,2,3,4,5], n = 2
 * 输出：[1,2,3,5]
 * 
 * 示例 2：
 * 输入：head = [1], n = 1
 * 输出：[]
 * 
 * 示例 3：
 * 输入：head = [1,2], n = 1
 * 输出：[1]
 *  
 * 提示：
 * 链表中结点的数目为 sz
 * 1 <= sz <= 30
 * 0 <= Node.val <= 100
 * 1 <= n <= sz
 * 
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */

// 1. 两次遍历
var removeNthFromEndI = function(head, n) {
  const root = { next: head };
  let count = 0;
  let node = head;
  while(node) {
    count++;
    node = node.next;
  }
  count = count - n;
  let pnode = root;
  node = pnode.next;
  while(count--) {
    pnode = node;
    node = node.next;
  }
  pnode.next = node.next;
  return root.next;
};

// 2. 单次遍历，栈结构
var removeNthFromEndII = function(head, n) {
  const root = { next: head };
  let deep = 0;
  const stack = (node, pnode) => {
    if(!node) return;
    stack(node.next, node);

    // 删除该节点
    if(++deep === n) {
      pnode.next = node.next;
    }
  };
  stack(root, head);
  return root.next;
};

// 3. 双指针
var removeNthFromEnd = function(head, n) {
  const root = { next: head };
  let fast = root;
  let slow = root;
  while(fast) {
    if(n-- >= 0) {
      fast = fast.next;
      continue;
    }
    fast = fast.next;
    slow = slow.next;
  }
  slow.next = slow.next.next;
  return root.next;
};

const { logLinkedListByArray, createLinkedListByArray } = require('./tools/LogTools.js');
const list = createLinkedListByArray([1, 2, 3, 4, 5]);
logLinkedListByArray(removeNthFromEnd(list, 2));