/**
 * 给定一个单链表的头节点 head ，其中的元素 按升序排序 ，将其转换为高度平衡的二叉搜索树。
 *
 * 本题中，一个高度平衡二叉树是指一个二叉树每个节点 的左右两个子树的高度差不超过 1。
 *
 * 示例 1:
 * 输入: head = [-10,-3,0,5,9]
 * 输出: [0,-3,9,-10,null,5]
 * 解释: 一个可能的答案是[0，-3,9，-10,null,5]，它表示所示的高度平衡二叉搜索树。
 *
 * 示例 2:
 * 输入: head = []
 * 输出: []
 *
 * 提示:
 * head 中的节点数在[0, 2 * 104] 范围内
 * -105 <= Node.val <= 105
 * 题目数据保证，输入的链表总是有序的
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {ListNode} head
 * @return {TreeNode}
 */
const sortedListToBST = function (head) {
  const fn = (node) => {
    if (!node) return null;
    const root = { next: node };
    let prev = root;
    let pl = node;
    let pr = node.next;
    while (pr) {
      prev = pl;
      pl = pl.next;
      pr = pr.next;
      if (!pr) break;
      pr = pr.next;
    }
    prev.next = null;
    return {
      val: pl.val,
      left: fn(root.next),
      right: fn(pl.next),
    };
  };
  return fn(head);
};

const { createLinkedListByArray, logLinkedListByArray, logBinaryTree } = require('../tools/LogTools.js');
const list = createLinkedListByArray([-10, -3, 0, 5, 9]);
logLinkedListByArray(list);
logBinaryTree(sortedListToBST(list));
