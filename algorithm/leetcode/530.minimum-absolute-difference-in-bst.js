/**
 * 给你一棵所有节点为非负值的二叉搜索树，请你计算树中任意两节点的差的绝对值的最小值。
 * 
 * 示例：
 * 输入：
 *   1
 *     \
 *     3
 *     /
 *   2
 * 输出：
 * 1
 * 解释：
 * 最小绝对差为 1，其中 2 和 1 的差的绝对值为 1（或者 2 和 3）。
 *  
 * 提示：
 * 树中至少有 2 个节点。
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
// 1.
var getMinimumDifference = function(root) {
  let min = Infinity;
  let prev = null;
  const dlr = (node) => {
    if(!node) return;
    dlr(node.left);
    if(prev !== null) {
      min = Math.min(min, node.val - prev);
    }
    prev = node.val;
    dlr(node.right);
  };
  dlr(root);
  return min;
};