/**
 * 给你一个二叉树，请你返回其按 层序遍历 得到的节点值。 （即逐层地，从左到右访问所有节点）。
 * 
 *示例：
 *二叉树：[3,9,20,null,null,15,7],
 *    3
 *  / \
 *  9  20
 *    /  \
 *  15   7
 *返回其层序遍历结果：

 * [
 *  [3],
 *  [9,20],
 *  [15,7]
 * ]
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
 * @return {number[][]}
 */

// 1. BFS + 双队列
const levelOrderI = function (root) {
  if (!root) return [];
  const queue1 = [root];
  const queue2 = [];
  const res = [];
  let cq = queue1;
  let oq = queue2;
  while (queue1.length || queue2.length) {
    const t = [];
    while (cq.length) {
      const node = cq.shift();
      t.push(node.val);
      node.left && oq.push(node.left);
      node.right && oq.push(node.right);
    }
    res.push(t);
    [cq, oq] = [oq, cq];
  }
  return res;
};

// 2. BFS
const levelOrderII = function (root) {
  if (!root) return [];
  const queue = [root, null];
  const res = [];
  let t = [];
  while (queue.length) {
    const node = queue.shift();
    t.push(node.val);
    node.left && queue.push(node.left);
    node.right && queue.push(node.right);
    if (queue[0] === null) {
      queue.length !== 1 && queue.push(null);
      queue.shift();
      res.push(t);
      t = [];
    }
  }
  return res;
};

// 3. DFS
const levelOrder = function (root) {
  const res = [];
  const dfs = (node, deep) => {
    if (!node) return;
    if (!res[deep]) res[deep] = [node.val];
    else res[deep].push(node.val);

    dfs(node.left, deep + 1);
    dfs(node.right, deep + 1);
  };
  dfs(root, 0);
  return res;
};

const { logAssert, createTreeByArray } = require('./tools/LogTools.js');
logAssert(levelOrder, createTreeByArray([3, 9, 20, null, null, 15, 7]), [[3], [9, 20], [15, 7]]);
