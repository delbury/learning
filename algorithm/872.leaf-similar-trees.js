/**
 * 请考虑一棵二叉树上所有的叶子，这些叶子的值按从左到右的顺序排列形成一个 叶值序列 。
 * 举个例子，如上图所示，给定一棵叶值序列为 (6, 7, 4, 9, 8) 的树。
 * 如果有两棵二叉树的叶值序列是相同，那么我们就认为它们是 叶相似 的。
 * 如果给定的两个根结点分别为 root1 和 root2 的树是叶相似的，则返回 true；否则返回 false 。
 * 
 * 示例 1：
 * 输入：root1 = [3,5,1,6,2,9,8,null,null,7,4], root2 = [3,5,1,6,7,4,2,null,null,null,null,null,null,9,8]
 * 输出：true
 * 
 * 示例 2：
 * 输入：root1 = [1], root2 = [1]
 * 输出：true
 * 
 * 示例 3：
 * 输入：root1 = [1], root2 = [2]
 * 输出：false
 * 
 * 示例 4：
 * 输入：root1 = [1,2], root2 = [2,2]
 * 输出：true
 * 
 * 示例 5：
 * 输入：root1 = [1,2,3], root2 = [1,3,2]
 * 输出：false
 *  
 * 提示：
 * 给定的两棵树可能会有 1 到 200 个结点。
 * 给定的两棵树上的值介于 0 到 200 之间。
 * 
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */

// 1.
var leafSimilarI = function(root1, root2) {
  const dlr = (node, arr) => {
    if(!node) return;
    if(!node.left && !node.right) arr.push(node.val);
    dlr(node.left, arr);
    dlr(node.right, arr);
  }
  const arr1 = [];
  const arr2 = [];
  dlr(root1, arr1);
  dlr(root2, arr2);
  if(arr1.length !== arr2.length || arr1.some((val, ind) => val !== arr2[ind])) return false;
  return true;
};

// 2. 优化
var leafSimilar = function(root1, root2) {
  const dlr = (node, arr, isCheck) => {
    if(!node) return;
    if(!node.left && !node.right) {
      if(isCheck) {
        if(arr.length && arr[0] === node.val) {
          arr.shift();
        } else {
          arr.push(NaN);
          return;
        }
      } else {
        arr.push(node.val);
      }
      return;
    }
    dlr(node.left, arr, isCheck);
    dlr(node.right, arr, isCheck);
  }
  const arr = [];
  dlr(root1, arr, false);
  dlr(root2, arr, true);
  return !arr.length;
};

const { logAssert, logBinaryTree, logHeapTree, createTreeByArray } = require('./tools/LogTools.js');
const root1 = createTreeByArray([3,5,1,6,2,9,8,null,null,7,4]);
const root2 = createTreeByArray([3,5,1,6,7,4,2,null,null,null,null,null,null,9,8]);
// logAssert(leafSimilar, root1, root2, true);
// logAssert(leafSimilar, createTreeByArray([1]), createTreeByArray([2]), false);
logAssert(
  leafSimilar, 
  createTreeByArray([3,5,1,6,2,9,8,null,null,7,4]), 
  createTreeByArray([3,5,1,6,7,4,2,null,null,null,null,null,null,9,11,null,null,8,10]),
  false
);

