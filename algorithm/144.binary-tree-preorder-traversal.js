/**
 * 
 * 给你二叉树的根节点 root ，返回它节点值的 前序 遍历。
 * 
 * 提示：
 * 树中节点数目在范围 [0, 100] 内
 * -100 <= Node.val <= 100
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
 * @return {number[]}
 */

// 1. DFS
var preorderTraversalI = function(root) {
  const res = [];
  const dfs = (node) => {
    if(!node) return;
    res.push(node.val);
    dfs(node.left);
    dfs(node.right);
  };
  dfs(root);
  return res;
};


// 2. BFS
var preorderTraversalII = function(root) {
  const stack = [root];
  const res = [];
  while(stack.length) {
    const node = stack.pop();
    if(!node) continue;
    res.push(node.val);
    stack.push(node.right);
    stack.push(node.left);
  }
  return res;
};

// 3. BFS
var preorderTraversalIII = function(root) {
  const stack = [];
  const res = [];
  let node = root;
  while(node || stack.length) {
    while(node) {
      res.push(node.val);
      stack.push(node);
      node = node.left;
    }
    node = stack.pop();
    node = node.right;
  }
  return res;
};


// 4. Morris 遍历
var preorderTraversal = function(root) {
  let cur = root;
  let mr = null;
  const res = [];
  while(cur) {
    mr = cur.left;
    if(mr) {
      while(mr.right && mr.right !== cur) mr = mr.right;
      if(!mr.right) {
        mr.right = cur;
        res.push(cur.val);
        cur = cur.left;
        continue;
      }
    } else {
      res.push(cur.val);
    }
    cur = cur.right;
  }
  return res;
};