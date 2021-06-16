/**
 * 给定一个二叉树，返回它的中序 遍历。
 * 
 * 示例:
 * 输入: [1,null,2,3]
 *   1
 *     \
 *     2
 *     /
 *   3
 * 输出: [1,3,2]
 * 
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */

// 中序遍历
const ldr = function (node, arr) {
  if (!node) return;

  ldr(node.left, arr);
  arr.push(node.val);
  ldr(node.right, arr);
};

// 1. 递归
var inorderTraversalRecursive = function (root) {
  const arr = [];
  ldr(root, arr);
  return arr;
};

// 2. 迭代 V1
var inorderTraversalIterative = function (root) {
  const stack = root ? [root] : []; // 构造栈
  const res = [];

  while (stack.length) {
    const node = stack.pop();

    if (typeof node !== 'object') {
      res.push(node);
      continue;
    }

    if (node.right) {
      stack.push(node.right)
    }

    stack.push(node.val);

    if (node.left) {
      stack.push(node.left)
    }
  }

  return res;
};

// 3. 迭代 V2
var inorderTraversalIterativeII = function (root) {
  const stack = []; // 构造栈
  const res = [];

  while (root || stack.length) {
    while (root) {
      stack.push(root);
      root = root.left;
    }

    const temp = stack.pop();
    res.push(temp.val);
    root = temp.right;
  }

  return res;
};

const A = { val: 1, left: null, right: null };
const B = { val: 2, left: null, right: null };
const C = { val: 3, left: null, right: null };
A.right = B;
B.left = C;

console.log(inorderTraversalIterativeII(A));
