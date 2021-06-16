/**
 * 在二叉树中，根节点位于深度 0 处，每个深度为 k 的节点的子节点位于深度 k+1 处。
 * 如果二叉树的两个节点深度相同，但 父节点不同 ，则它们是一对堂兄弟节点。
 * 我们给出了具有唯一值的二叉树的根节点 root ，以及树中两个不同节点的值 x 和 y 。
 * 只有与值 x 和 y 对应的节点是堂兄弟节点时，才返回 true 。否则，返回 false。
 * 
 * 提示：
 * 二叉树的节点数介于 2 到 100 之间。
 * 每个节点的值都是唯一的、范围为 1 到 100 的整数。
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
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */

// 1. DFS
var isCousinsI = function(root, x, y) {
  let xl = null, yl = null;
  const dfs = (node, level = 0) => {
    if(!node) return true;
    if(node.val === x) xl = level;
    else if(node.val === y) yl = level;

    if(node.left && node.right && (node.left.val === x && node.right.val === y || node.left.val === y && node.right.val === x)) return false;
    return dfs(node.left, level + 1) && dfs(node.right, level + 1);
  };

  return dfs(root) && xl === yl;
};

// 2. BFS
var isCousins = function(root, x, y) {
  const queue = [root];
  while(queue.length) {
    let len = queue.length;
    let count = 0;
    while(len--) {
      const node = queue.shift();
      if(node.left && node.right && (node.left.val === x && node.right.val === y || node.left.val === y && node.right.val === x)) return false;
      if(node.val === x || node.val === y) count++;
      if(count === 2) return true;
      if(node.left) queue.push(node.left);
      if(node.right) queue.push(node.right);
    }
  }
  return false;
};