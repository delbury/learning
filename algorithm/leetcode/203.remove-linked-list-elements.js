/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
// var removeElements = function (head, val) {
//   while (head) {
//     if (head.val === val) {
//       head = head.next;
//     } else {
//       break;
//     }
//   }

//   if (!head) return null;

//   let prev = head;
//   let current = head.next;
//   while (current) {
//     if (current.val === val) {
//       current = current.next;
//       prev.next = current;
//     } else {
//       prev.next = current;
//       prev = current;
//       current = prev.next;
//     }
//   }

//   return head;
// };

// 哨兵节点
var removeElements = function (head, val) {
  const sentinel = { next: head };

  let prev = sentinel;
  let current = sentinel.next;
  while (current) {
    if (current.val === val) {
      current = current.next;
      prev.next = current;
    } else {
      prev.next = current;
      prev = current;
      current = prev.next;
    }
  }

  return sentinel.next;
}


const test = function (arr, val) {
  const head = {};
  let cp = head;
  arr.forEach((item, index) => {
    cp.val = item;
    if (index !== arr.length - 1) {
      cp.next = {};
      cp = cp.next;
    } else {
      cp.next = null;
    }
  });

  console.log(JSON.stringify(removeElements(head, val), null, 0));
}

test([1, 2, 6, 3, 4, 5, 6], 6);