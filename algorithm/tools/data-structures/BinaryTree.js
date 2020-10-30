/**
 * 二叉树
 */

// 二叉树节点
class BinaryTreeNode {
  constructor(value = null, lchild = null, rchild = null) {
    this.value = value;
    this.lchild = lchild;
    this.rchild = rchild;
    this.parent = null;
    this.childType = null;
  }
}

class BinaryTree {
  constructor() {
    this.rootNode = null;
    this.size = 0;
  }

  // 前序遍历、先根遍历 Preorder Traversal (DLR)
  DLR(cb, node = this.rootNode) {
    if (!node) return;

    cb(node);
    this.DLR(cb, node.lchild);
    this.DLR(cb, node.rchild);
  }

  // 中序遍历、中根遍历 Inorder Traversal (LDR)
  LDR(cb, node = this.rootNode) {
    if (!node) return;

    this.LDR(cb, node.lchild);
    cb(node);
    this.LDR(cb, node.rchild);
  }

  // 后序遍历、后根遍历 Postorder Traversal (LRD)
  LRD(cb, node = this.rootNode) {
    if (!node) return;

    this.LRD(cb, node.lchild);
    this.LRD(cb, node.rchild);
    cb(node);
  }

  // 节点的高度
  height(node = this.rootNode) {
    if (!node) return 0;

    return 1 + Math.max(this.height(node.lchild), this.height(node.rchild));
  }
}

module.exports = {
  BinaryTreeNode,
  BinaryTree
};
