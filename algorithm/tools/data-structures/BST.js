/**
 * 二叉搜索树 BST
 */

const { BinaryTreeNode, BinaryTree } = require('./BinaryTree.js');

class BinarySearchTree extends BinaryTree {
  constructor() {
    super();
  }

  // 查找
  search(value, node = this.rootNode) {
    if (!node) return null;

    if (value < node.value) {
      return this.search(value, node.lchild);
    } else if (value > node.value) {
      return this.search(value, node.rchild);
    } else {
      return node;
    }
  }

  // 查找全部
  searchAll(value) {
    const res = [];
    let current = this.rootNode;

    do {
      current = this.search(value, current);

      if (current) {
        res.push(current);
        current = current.rchild;
      }
    } while (current);

    return res;
  }

  // 插入
  insert(value, node = this.rootNode) {
    if (!this.rootNode) {
      this.rootNode = new BinaryTreeNode(value);
      return this;
    }

    if (!node) return this;

    if (value < node.value) {
      if (!node.lchild) {
        node.lchild = new BinaryTreeNode(value);
      } else {
        return this.insert(value, node.lchild);
      }
    } else {
      if (!node.rchild) {
        node.rchild = new BinaryTreeNode(value);
      } else {
        return this.insert(value, node.rchild);
      }
    }

    return this;
  }

  // 删除
  delete(value, node = this.rootNode, parent = null, key = '') {
    if (!node) return false;

    if (value < node.value) { // 左子树
      return this.delete(value, node.lchild, node, 'lchild');

    } else if (value > node.value) { // 右子树
      return this.delete(value, node.rchild, node, 'rchild');

    } else { // 当前节点
      if (node.lchild && node.rchild) { // 左右都非空
        const target = this.getMaxNode(node.lchild, node, 'lchild');
        node.value = target.node.value;

        this.delete(target.node.value, target.node, target.parent, target.key);

      } else if (!node.lchild && !node.rchild) { // 删除的为叶子节点
        if (!parent) {
          this.rootNode = null;
        } else {
          parent[key] = null;
        }

      } else if (!node.lchild && node.rchild) { // 左空，右非空
        if (!parent) {
          this.rootNode = node.rchild;
        } else {
          parent[key] = node.rchild;
        }

      } else if (node.lchild && !node.rchild) { // 左非空，右空
        if (!parent) {
          this.rootNode = node.lchild;
        } else {
          parent[key] = node.lchild;
        }

      }

      return node;
    }
  }

  // 获取最小节点
  getMinNode(node = this.rootNode, parent, key) {
    if (!node) return null;

    if (node.lchild) {
      return this.getMinNode(node.lchild, node, 'lchild');
    } else {
      return {
        node,
        parent,
        key,
      };
    }
  }

  // 获取最大节点
  getMaxNode(node = this.rootNode, parent, key) {
    if (!node) return null;

    if (node.rchild) {
      return this.getMaxNode(node.rchild, node, 'rchild');
    } else {
      return {
        node,
        parent,
        key,
      };
    }
  }
}

const { logBinaryTree } = require('../LogTools.js');
const bst = new BinarySearchTree();
let count = 6;
while (count--) {
  bst.insert(Math.floor(Math.random() * 50));
}
// bst
//   .insert(20)
//   .insert(44)
//   .insert(34)
//   .insert(47)
//   .insert(36)
//   .insert(35);
logBinaryTree(bst.rootNode);
bst.LDR(node => console.log(node.value));

// bst.delete(20);
// logBinaryTree(bst.rootNode);

// bst.delete(44);
// logBinaryTree(bst.rootNode);

// bst.delete(36);
// bst.delete(35);
// bst.delete(34);
// bst.delete(47);
// logBinaryTree(bst.rootNode);

