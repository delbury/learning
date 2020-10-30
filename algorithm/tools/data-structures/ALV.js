/*
 * 自平衡二叉树 AVL
 */

const { BinaryTreeNode } = require('./BinaryTree.js');
const { BinarySearchTree } = require('./BST.js');

class AVLTreeNode extends BinaryTreeNode {
  constructor(...props) {
    super(...props);
    this.bf = 0;
  }
}

class SelfBalancingBinarySearchTree extends BinarySearchTree {
  constructor() {
    super();
    this.TreeNode = AVLTreeNode;
  }

  // 插入
  // Override
  insert(value) {
    let target = super.insert(value);

    if (value === 5) {
      console.log('inserted: ');
      logBinaryTree(this.rootNode);
    }
    while (target.parent) { // 非根节点
      if (target.childType === 'lchild') {
        target.parent.bf--;
      } else {
        target.parent.bf++;
      }

      if (target.parent.bf === 0) { // 平衡
        return;

      } else if (target.parent.bf === -1 || target.parent.bf === 1) { // 高度改变，向上更新
        target = target.parent;

      } else { // 不平衡
        console.log(target.parent.value, target.bf, target.parent.bf)

        if (target.bf === 1 && target.parent.bf === 2) {
          this.RR(target);

        } else if (target.bf === -1 && target.parent.bf === 2) {
          this.LR(target);

        } else if (target.bf === -1 && target.parent.bf === -2) {
          this.LL(target);
          target.parent.bf = 0;

        } else if (target.bf === 1 && target.parent.bf === -2) {
          this.RL(target);
        }

        return;
      }

    }
  }

  // 单旋，右旋
  // 左节点的左节点
  LL(node) {
    console.log('LL', node.value)
    this.rootNode = node; // 当前节点变为根节点
    node.parent.lchild = node.rchild; // 当前节点的 rchild 赋给原父节点的 lchild
    node.parent.lchild ? (node.parent.lchild.childType = 'lchild') : null; // 变更孩子类型
    this.rootNode.rchild = node.parent; // 原父节点变为右孩子
    this.rootNode.rchild.parent = this.rootNode; // 变更原父节点的父节点

    this.rootNode.bf = 0;
  }

  // 单旋，左旋
  // 右节点的右节点
  RR(node) { }

  LR(node) { }

  RL(node) { }

  // 删除
  // Override
  delete(...args) {
    return super.search(...args);
  }
}

const { logBinaryTree } = require('../LogTools.js');
const avl = new SelfBalancingBinarySearchTree();
// let count = 6;
// while (count--) {
//   avl.insert(Math.floor(Math.random() * 50));
// }
avl.insert(8);
avl.insert(7);
avl.insert(6);
logBinaryTree(avl.rootNode);

avl.insert(5);
avl.insert(4);
console.log('res', avl.rootNode.value, avl.rootNode.bf);
logBinaryTree(avl.rootNode);
