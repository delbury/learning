/**
 * 二叉树有如下定义：
 * struct Node {
 *   int val;
 *   Node *left;
 *   Node *right;
 *   Node *next;
 * }
 * 填充它的每个 next 指针，让这个指针指向其下一个右侧节点。
 * 如果找不到下一个右侧节点，则将 next 指针设置为 NULL。
 * 初始状态下，所有 next 指针都被设置为 NULL。
 *
 * 示例1：
 * 输入：root = [1,2,3,4,5,6,7]
 * 输出：[1,#,2,3,#,4,5,6,7,#]
 * 解释：给定二叉树如上图所示
 * 您的函数应该填充它的每个 next 指针，以指向其下一个右侧节点，像在上图中的红色线条所示。
 * 序列化的输出是按层序遍历排列的，除了最后一层的节点外
 * 每层的节点都展开成一个列表，隐式地表示了树结构。如第一层只有一个节点 1，
 * 第二层有两个节点 2 和 3，第三层有四个节点 4, 5, 6, 和 7。
 * 列表中的每个节点后都跟着一个 # 符号，除了最后一层的节点。
 *
 * 示例2：
 * 输入：root = []
 * 输出：[]
 *
 * 提示：
 * 树中节点的数量在 [0, 2^12 - 1] 范围内
 * -1000 <= node.val <= 1000
 */

/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *     this.val = val === undefined ? 0 : val;
 *     this.left = left === undefined ? null : left;
 *     this.right = right === undefined ? null : right;
 *     this.next = next === undefined ? null : next;
 * };
 *
 * /**
 * @param {Node} root
 * @return {Node}
 */
const connect = function (root) {
  const heads = [];
  const fn = (node, deep) => {
    if (!node) return;
    if (heads[deep]) {
      heads[deep].next = node;
    }
    heads[deep] = node;

    fn(node.left, deep + 1);
    fn(node.right, deep + 1);
  };
  fn(root, 0);
  return root;
};
