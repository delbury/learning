/**
 * 编写代码，移除未排序链表中的重复节点。保留最开始出现的节点。
 *
 * 示例1:
 * 输入：[1, 2, 3, 3, 2, 1]
 * 输出：[1, 2, 3]
 *
 * 示例2:
 * 输入：[1, 1, 1, 1, 2]
 * 输出：[1, 2]
 *
 * 提示：
 * 链表长度在[0, 20000]范围内。
 * 链表元素在[0, 20000]范围内。
 *
 * 进阶：
 * 如果不得使用临时缓冲区，该怎么解决？
 */

const removeDuplicateNodes = function (head) {
  const set = new Set();
  let p = head;
  let prev = null;
  while (p) {
    if (set.has(p.val)) {
      p = p.next;
      prev.next = p;
    } else {
      set.add(p.val);
      prev = p;
      p = p.next;
    }
  }
  return head;
};

const { logAssert, logLinkedListByArray, createLinkedListByArray } = require('../tools/LogTools.js');
logAssert(removeDuplicateNodes, createLinkedListByArray([1, 2, 3, 3, 2, 1]), createLinkedListByArray([1, 2, 3]));

logAssert(removeDuplicateNodes, createLinkedListByArray([1, 1, 1, 1, 2]), createLinkedListByArray([1, 2]));
