/**
 * 反转一个单链表。
 * 示例:
 *  输入: 1->2->3->4->5->NULL
 *  输出: 5->4->3->2->1->NULL
 *  进阶:
 *  你可以迭代或递归地反转链表。你能否用两种方法解决这道题？
 * 
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */

// 迭代
var reverseList = function(head) {
  if(!head) {
    return null;
  }
  let pc = head;
  let pt = pc.next;
  pc.next = null;

  while(pt) {
    const temp = pt.next;
    pt.next = pc;
    pc = pt;
    pt = temp;
  }

  return pc;
};

// 数组法
var reverseListArray = function(head) {
  if(!head) {
    return null;
  }

  const arr = [];
  while(head) {
    arr.push(head);
    head = head.next;
  }
  for(i = arr.length - 1; i > 0; i--) {
    arr[i].next = arr[i - 1];
  }
  arr[0].next = null;
  return arr[arr.length - 1];
};

// 递归
// 该节点之后的节点都已经反向完成
var reverseListRecursion = function(node) {
  if(!node || !node.next) {
    return node;
  }
  const np = reverseListRecursion(node.next);
  node.next.next = node;
  node.next = null;
  return np;
}


// 链表节点构造
function ListNode(val) {
  this.val = val;
  this.next = null;
}

const createNodes = () => {
  let head = null;
  let p = null;
  for(let i = 1; i <= 5; i++) {
    if(!head) {
      head = new ListNode(i);
      p = head;
    } else {
      p.next = new ListNode(i);
      p = p.next;
    }
  }
  return head;
};

// 遍历
var reverseListII = function(head) {
  if(!head || !head.next) return head;
  let p = null;
  while(head.next) {
    [head.next, p, head] = [p, head, head.next];
  }
  head.next = p;
  return head;
};

// console.log(JSON.stringify(reverseList(createNodes()), null, 0));
// console.log(JSON.stringify(reverseListArray(createNodes()), null, 0));
console.log(JSON.stringify(reverseListRecursion(createNodes()), null, 0));
