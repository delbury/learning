/**
 * 给定一棵二叉树，设计一个算法，创建含有某一深度上所有节点的链表（比如，若一棵树的深度为 D，则会创建出 D 个链表）。
 * 返回一个包含所有深度的链表的数组。
 *
 * 示例：
 * 输入：[1,2,3,4,5,null,7,8]
 *
 *         1
 *        /  \
 *       2    3
 *      / \    \
 *     4   5    7
 *    /
 *   8
 * 输出：[[1],[2,3],[4,5,7],[8]]
 */

const listOfDepth = function (tree) {
  const linkedLists = [];
  const ps = [];
  const df = (root, n) => {
    if (root === null) return;

    const node = {
      val: root.val,
      next: null,
    };
    if (ps[n]) {
      ps[n].next = node;
      ps[n] = node;
    } else {
      linkedLists[n] = node;
      ps[n] = node;
    }
    df(root.left, n + 1);
    df(root.right, n + 1);
  };
  df(tree, 0);
  return linkedLists;
};

const { log, logBinaryTree, createTreeByArray, logLinkedListByArray } = require('../tools/LogTools.js');
const tree = createTreeByArray([1, 2, 3, 4, 5, null, 7, 8]);
logBinaryTree(tree);
const res = listOfDepth(tree);
res.forEach((ll) => logLinkedListByArray(ll));
