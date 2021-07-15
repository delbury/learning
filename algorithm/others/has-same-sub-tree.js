/*
 * function TreeNode(x) {
 *   this.val = x;
 *   this.left = null;
 *   this.right = null;
 * }
 */

/**
 * 
 * @param root1 TreeNode类 
 * @param root2 TreeNode类 
 * @return bool布尔型
 */
function isContainsI( root1 ,  root2 ) {
  // write code here
  if(!root1 || !root2) return false;
  const strs = {
    s1: '',
    s2: ''
  };
  const dfs = (node, key) => {
    if(!node) return strs[key] += 'null';
    strs[key] += (strs[key] ? ',' : '') + node.val
    dfs(node.left, key);
    dfs(node.right, key);
  };
  dfs(root1, 's1');
  dfs(root2, 's2');
  return strs.s1.includes(strs.s2);
}


function isSame(node1, node2) {
  if(!node1 && !node2) return true;
  if(!node1 || !node2) return false;
  if(node1.val !== node2.val) return false;
  return isSame(node1.left, node2.left) && isSame(node1.right, node2.right);
}
function isContains( root1 ,  root2 ) {
  if(!root1 && !root2) return true;
  if(!root1 || !root2) return false;
  return isSame(root1, root2) || isContains(root1.left, root2) || isContains(root1.right, root2);
}

module.exports = {
  isContains : isContains
};