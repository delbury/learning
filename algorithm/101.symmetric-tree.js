/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
  return fn(root, root);
};

function fn(node1, node2) {
  if(!node1 && !node2) return true;
  if(node1 && node2) {
    if(node1.val !== node2.val) return false;
    return fn(node1.left, node2.right);
  } else {
    return false;
  }
}
