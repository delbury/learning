// 二叉树节点
class BinaryTreeNode {
  constructor(data = null, lchild = null, rchild = null) {
    this.data = data;
    this.lchild = lchild;
    this.rchild = rchild;
  }
}

// 二叉搜索树
class BinarySearchTree {
  constructor(rootNode = null) {
    this.rootNode = rootNode;
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