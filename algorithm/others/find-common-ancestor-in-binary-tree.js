/**
 * 给定一棵二叉树(保证非空)以及这棵树上的两个节点对应的val值 o1 和 o2，
 * 请找到 o1 和 o2 的最近公共祖先节点。
 * 注：本题保证二叉树中每个节点的val值均不相同。
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
 * @param o1 int整型 
 * @param o2 int整型 
 * @return int整型
 */
function lowestCommonAncestorI( root ,  o1 ,  o2 ) {
  // write code here
  const dlr = (node, target, path = '') => {
    if(!node) return '';
    path = path ? `${path},${node.val}` : node.val.toString();
    if(target === node.val) return path;
    return dlr(node.left, target, path) || dlr(node.right, target, path);
  };
  const path1 = dlr(root, o1).split(',');
  const path2 = dlr(root, o2).split(',');
  const len = Math.min(path1.length, path2.length);
  for(let i = 1; i < len; i++) {
    if(path1[i] !== path2[i]) return +path1[i - 1];
  }
  return +path1[len - 1];
}

// 2.
// 三种情况：
//   1. o1, o2 分别在公共祖先的左右两侧
//   2. o1 为 o2 的祖先
//   3. o2 为 o1 的祖先
function lowestCommonAncestor( root ,  o1 ,  o2 ) {
  // write code here
  const dlr = (node, o1, o2) => {
    if(!node || node.val === o1 || node.val === o2) return node;
    const left = dlr(node.left, o1, o2);
    const right = dlr(node.right, o1, o2);
    // 情况 2、3
    if(!left) {
      return right;
    }
    if(!right) {
      return left;
    }
    return node; // 情况 1
  }
  return dlr(root, o1, o2).val;
}

module.exports = {
  lowestCommonAncestor : lowestCommonAncestor
};

const { logBinaryTree, logHeapTree, createTreeByArray } = require('../tools/LogTools.js');
const arr = [27,32,34,19,41,17,18,9,14,44,39,null,null,24,30,null,null,null,2,7,42,28,36,null,null,11,6,null,1,null,null,null,31,16,4,22,33,null,null,null,5,10,15,37,12,8,null,35,3,null,23,21,null,null,null,29,null,null,null,40,null,null,null,null,null,null,null,null,null,13,43,null,null,null,null,null,null,25,20,null,null,38,null,26];
// logBinaryTree(createTreeByArray(arr));
const arr2 = [3,5,1,6,2,0,8,null,null,7,4];
logBinaryTree(createTreeByArray(arr2));
console.log(lowestCommonAncestor(createTreeByArray(arr2), 3, 5));