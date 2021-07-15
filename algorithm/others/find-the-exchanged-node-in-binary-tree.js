/*
 * function TreeNode(x) {
 *   this.val = x;
 *   this.left = null;
 *   this.right = null;
 * }
 */

/**
 * 一棵二叉树原本是搜索二叉树，但是其中有两个节点调换了位置，使得这棵二叉树不再是搜索二叉树，
 * 请按升序输出这两个错误节点的值。(每个节点的值各不相同)
 * 
 * 1, 2, 7, 4, 5, 6, 3, 8, 9
 * 
 * @param root TreeNode类 the root
 * @return int整型一维数组
 */
function findError( root ) {
  // write code here
  const res = [];
  let prev = -Infinity;
  const ldr = (node) => {
    if(!node) return;
    ldr(node.left);
    if(node.val < prev) {
      if(!res.length) {
        res.push(node.val, prev);
      } else {
        res[0] = node.val;
      }
    }
    prev = node.val;
    ldr(node.right);
  };
  ldr(root);
  return res;
}
module.exports = {
  findError : findError
};

const root = {
  val: 1,
  left: { val: 2 },
  right: { val: 3 },
};
console.log(findError(root));