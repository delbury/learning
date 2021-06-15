/**
 * 给定一个二叉树和一个值 sum，
 * 请找出所有的根节点到叶子节点的节点值之和等于 sum 的路径，
 * 
 * function TreeNode(x) {
 *   this.val = x;
 *   this.left = null;
 *   this.right = null;
 * }
 */

/**
  * 
  * @param root TreeNode类 
  * @param sum int整型 
  * @return int整型二维数组
  */
function pathSum( root ,  sum ) {
  // write code here
  const res = [];
  const fn = (node, tot = 0, path = []) => {
    if(!node) return;
    tot = tot + node.val;
    if(!node.left && !node.right && tot === sum) {
      res.push([...path, node.val]);
    }
    if(node.left) fn(node.left, tot, [...path, node.val]);
    if(node.right) fn(node.right, tot, [...path, node.val]);
  };
  fn(root);
  return res;
}
module.exports = {
  pathSum : pathSum
};