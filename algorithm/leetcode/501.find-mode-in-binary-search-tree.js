/**
 * 给定一个有相同值的二叉搜索树（BST），找出 BST 中的所有众数（出现频率最高的元素）。
 * 假定 BST 有如下定义：
 * 结点左子树中所含结点的值小于等于当前结点的值
 * 结点右子树中所含结点的值大于等于当前结点的值
 * 左子树和右子树都是二叉搜索树
 * 
 * 例如：
 * 给定 BST [1,null,2,2],
 *   1
 *    \
 *     2
 *    /
 *   2
 * 返回[2].
 * 
 * 提示：如果众数超过1个，不需考虑输出顺序
 * 进阶：你可以不使用额外的空间吗？（假设由递归产生的隐式调用栈的开销不被计算在内）
 * 
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

// 1. DFS
var findMode = function(root) {
  let cur = 0, max = 1, prev = null;
  const res = [];
  const ldf = (node) => {
    if(!node) return;
    ldf(node.left);
    if(prev === null || prev === node.val) {
      cur++;
    } else {
      cur = 1;
    }
    prev = node.val;
    // 多个相同数量的值
    if(cur === max) {
      res.push(node.val);
    } else if(cur > max) {
      res.length = 0;
      res.push(node.val);
      max = cur;
    }
    ldf(node.right);
  };
  ldf(root);
  return res;
};

const { logAssert, createTreeByArray } = require('./tools/LogTools.js');
logAssert(findMode, createTreeByArray([1, null, 2, null, null, 2]), [2]);
logAssert(findMode, createTreeByArray([2, 1]), [1, 2]);
