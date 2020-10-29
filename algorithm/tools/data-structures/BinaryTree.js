/**
 * 二叉树
 */

// 二叉树节点
class BinaryTreeNode {
  constructor(value = null, lchild = null, rchild = null) {
    this.value = value;
    this.lchild = lchild;
    this.rchild = rchild;
  }
}

class BinaryTree {
  constructor() {
    this.rootNode = null;
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
}

module.exports = {
  BinaryTreeNode,
  BinaryTree
};
