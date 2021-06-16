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
var isSymmetricI = function(root) {
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


// 2.
var isSymmetric = function(root1, root2 = root1) {
  if(!root1 && !root2) return true;
  if(root1 && root2) {
    if(root1.val !== root2.val) return false;
    return isSymmetric(root1.left, root2.right) && isSymmetric(root1.right, root2.left);
  }
  return false;
};