function TreeNode(x) {
  this.val = x;
  this.left = null;
  this.right = null;
}

/**
  * 给出一个升序排序的数组，将其转化为平衡二叉搜索树（BST）.
  * 
  * @param num int整型一维数组 
  * @return TreeNode类
  */
function sortedArrayToBST( num ) {
  // write code here
  const fn = (l = 0, r = num.length - 1) => {
    if(l > r) return null;
    const m = Math.ceil((l + r) / 2);
    const node = new TreeNode(num[m]);
    node.left = fn(l, m - 1);
    node.right = fn(m + 1, r);
    return node;
  };
  return fn();
}
module.exports = {
  sortedArrayToBST : sortedArrayToBST
};

const { logAssert, logBinaryTree, logHeapTree, createTreeByArray } = require('../tools/LogTools.js');
logBinaryTree(sortedArrayToBST([-1,0,1,2]));