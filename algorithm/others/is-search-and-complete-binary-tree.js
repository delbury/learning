/*
 * function TreeNode(x) {
 *   this.val = x;
 *   this.left = null;
 *   this.right = null;
 * }
 */

/**
 * 给定一棵二叉树，已知其中的节点没有重复值，请判断该二叉树是否为搜索二叉树和完全二叉树。
 * 
 * @param root TreeNode类 the root
 * @return bool布尔型一维数组
 */
function judgeIt( root ) {
  // write code here
  // [是否搜索， 是否完全]
  const res = [true, true];
  if(!root) return res;
  let prev = -Infinity;
  let lastDepth = null;
  let sameLayer = true;
  const dfs = (node, depth = 0) => {
    if(!node) {
      if(lastDepth) {
        if(lastDepth - depth === 1) {
          if(sameLayer) sameLayer = false;
          lastDepth = depth;
        } else if(depth !== lastDepth) {
          res[1] = false;
        }
      }
      lastDepth = depth;
      return;
    }
    dfs(node.left, depth + 1);
    if(res[0]) {
      res[0] = node.val > prev;
      prev = node.val;
    }
    dfs(node.right, depth + 1);
  };
  dfs(root);
  return res;
}
module.exports = {
  judgeIt : judgeIt
};

const { logAssert, logBinaryTree, logHeapTree, createTreeByArray } = require('../tools/LogTools.js');
// [false, true]
const tree = createTreeByArray([107,29,89,130,12,109,85,86,52,74,121,106,122,141,65,50,28,118,61,99,57,7,25,148,4,69,151,20,142,32,120,71,117,45,83,58,19,53,60,157,101,76,125,35,3,110,96,139,145,108,27,116,135,81,6,8,150,41,127,64,43,156,104,9,1,126,14,51,22,26,67,21,153,75,143,34,2,159,158,154,94,46,147,49,15,123,70,47,16,87,59,62,138,72,97,124,144,80,90,36,149,23,160,33,44,10,114,79,54,134,129,131,82,77,115,55,39,88,68,73,5,92,38,132,24,17,40,98,146,31,100,66,137,13,63,128,84,11,119,102,103,95,152,30,105,37,78,113,91,140,155,111,18,136,42,161,133,93,48,112,56]);
// logBinaryTree(tree);
logBinaryTree(createTreeByArray([1,2,3,4,null,5,6]));
console.log(judgeIt(tree));
