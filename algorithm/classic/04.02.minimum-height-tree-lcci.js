/**
 * 给定一个有序整数数组，元素各不相同且按升序排列，编写一个算法，创建一棵高度最小的二叉搜索树。
 *
 * 示例:
 * 给定有序数组: [-10,-3,0,5,9],
 * 一个可能的答案是：[0,-3,9,-10,null,5]，它可以表示下面这个高度平衡二叉搜索树：
 *
 *           0
 *          / \
 *        -3   9
 *        /   /
 *      -10  5
 */

const sortedArrayToBST = function (nums) {
  const fn = (l, r) => {
    if (l > r) return null;
    const c = Math.ceil((r + l) / 2);
    const root = {
      val: nums[c],
      left: fn(l, c - 1),
      right: fn(c + 1, r),
    };
    return root;
  };
  return fn(0, nums.length - 1);
};

const { log, logAssert, logBinaryTree, logHeapTree, createTreeByArray } = require('../tools/LogTools.js');
// logBinaryTree(createTreeByArray([0, -3, 9, -10, null, 5]));
logBinaryTree(sortedArrayToBST([-10, -3, 0, 5, 9]));
logBinaryTree(sortedArrayToBST([-10, -3, 1, 0, 5, 9]));
