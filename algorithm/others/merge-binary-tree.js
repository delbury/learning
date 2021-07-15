/*
 * function TreeNode(x) {
 *   this.val = x;
 *   this.left = null;
 *   this.right = null;
 * }
 */

/**
 * 已知两颗二叉树，将它们合并成一颗二叉树。
 * 合并规则是：都存在的结点，就将结点值加起来，否则空的位置就由另一个树的结点来代替。
 * 
 * @param t1 TreeNode类 
 * @param t2 TreeNode类 
 * @return TreeNode类
 */
function mergeTrees( t1 ,  t2 ) {
  // write code here
  const dfs = (n1, n2) => {
    n1.val += n2.val;

    if(n1.left && n2.left) dfs(n1.left, n2.left);
    else if(!n1.left && n2.left) n1.left = n2.left;

    if(n1.right && n2.right) dfs(n1.right, n2.right);
    else if(!n1.right && n2.right) n1.right = n2.right;
  };
  dfs(t1, t2);
  return t1;
}
module.exports = {
  mergeTrees : mergeTrees
};