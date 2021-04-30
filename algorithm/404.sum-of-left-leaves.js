/**
 * 计算给定二叉树的所有左叶子之和。
 * 
 * 示例：
 *    3
 *   / \
 *  9  20
 *    /  \
 *   15   7
 * 
 * 在这个二叉树中，有两个左叶子，分别是 9 和 15，所以返回 24
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
 * @return {number}
 */

// 1. dfs
var sumOfLeftLeaves = function(root) {
  const dfs = (node, isLeft = false) => {
    if(!node.left && !node.right && isLeft) return node.val;
    return (node.left ? dfs(node.left, true) : 0) + (node.right ? dfs(node.right) : 0);
  };
  return dfs(root);
};

// 2. 另一种 dfs
var sumOfLeftLeavesII = function(root) {
  let res = 0;
  const dfs = (node, isLeft) => {
    if(!node) return 0;
    dfs(node.left, true);
    if(!node.left && !node.right && isLeft) res += node.val;
    dfs(node.right);
  };
  dfs(root);
  return res;
};

// 3. bfs
var sumOfLeftLeavesIII = function(root) {
  let res = 0;
  const queue = [root];
  while(queue.length) {
    const node = queue.shift();
    if(node.left) {
      if(!node.left.left && !node.left.right) {
        res += node.left.val;
      } else {
        queue.push(node.left);
      }
    }
    if(node.right) {
      if(node.right.left || node.right.right) {
        queue.push(node.right);
      }
    }
  }
  return res;
};


const { logAssert, logBinaryTree, logHeapTree, createTreeByArray } = require('./tools/LogTools.js');
logAssert(sumOfLeftLeavesIII, createTreeByArray([3,9,20,null,null,15,7]), 24);