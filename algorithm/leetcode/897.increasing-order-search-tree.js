/**
 * 给你一棵二叉搜索树，请你 按中序遍历 将其重新排列为一棵递增顺序搜索树，
 * 使树中最左边的节点成为树的根节点，并且每个节点没有左子节点，只有一个右子节点。
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
 * @return {TreeNode}
 */
// 1. 辅助队列
const ldr = function(arr, node) {
  if(!node) return;
  ldr(arr, node.left);
  arr.push(node);
  ldr(arr, node.right);
}
var increasingBST = function(root) {
  if(!root) return null;
  const arr = [];
  ldr(arr, root);
  for(let i = 0; i < arr.length - 1; i++) {
    arr[i].left = null;
    arr[i].right = arr[i + 1];
  }
  arr[arr.length - 1].left = null;
  return arr[0];
};


// 2. 不使用辅助队列
const increasingBSTII = function(root) {
  // if(!root) return null;
  const head = {};
  let res = head;
  const ldr = (node) => {
    if(!node) return null;
    ldr(node.left);

    res.right = node;
    node.left = null;
    res = node;

    ldr(node.right);
  };
  ldr(root);
  return head.right ?? null;
};

// 3. 中序，先右边节点
const increasingBSTIII = function(root) {
  let current = null;
  const rdl = (node) => {
    if(!node) return null;
    rdl(node.right);
    node.right = current;
    current = node;
    rdl(node.left);
    node.left = null;
  };
  rdl(root);
  return current;
};

const { logAssert, logBinaryTree, logHeapTree, createTreeByArray } = require('./tools/LogTools.js');
// const root = createTreeByArray([5, 3, 6, 2, 4, null, 8, 1, null, null, null, null, null, 7, 9]);
const root = createTreeByArray([2, 1, 4, null, null, 3, 5]);
// const root = { val: 2, left: { val: 1, left: null, right: null }, right: { val: 4, left: { val: 3, left: null, right: null } } };
// logBinaryTree(root);
console.log(increasingBSTIII(root));
// console.log(increasingBSTIII(null));