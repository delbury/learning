// 二叉树节点
class BinaryTreeNode {
  constructor(data = null, lchild = null, rchild = null) {
    this.data = data;
    this.lchild = lchild;
    this.rchild = rchild;
  }
}

class BinaryTree {
  constructor() {
    this.rootNode = null;
  }

  // 前序遍历、先根遍历 Preorder Traversal (DLR)
  DLR(node, cb) {
    cb(node);
    this.DLR(node.lchild, cb);
    this.DLR(node.rchild, cb);
  }

  // 中序遍历、中根遍历 Inorder Traversal (LDR)
  LDR(node, cb) {
    this.LDR(node.lchild, cb);
    cb(node);
    this.LDR(node.rchild, cb);
  }

  // 后序遍历、后根遍历 Postorder Traversal (LRD)
  LRD(node, cb) {
    this.LRD(node.lchild, cb);
    this.LRD(node.rchild, cb);
    cb(node);
  }
}

// 二叉搜索树
class BinarySearchTree extends BinaryTree {
  constructor() {
    super();
  }

  // 一维有序数组生成二叉搜索树
  generateTreeByOrderedArray(arr) { }

  // 获取最小值
  getMinimum() { }

  // 获取最大值
  getMaxnimum() { }

  // 查询
  search() { }

  // 插入
  insert(node) { }

  // 删除
  delete(node) { }
}