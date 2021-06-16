/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
  if(q === p) return true;
  if(q === null && p || p === null && q) return false;
  const arr1 = [q], arr2 = [p];
  while(arr1.length) {
      q = arr1.pop();
      p = arr2.pop();
      if(q && p) {
          if(p.val !== q.val) return false;
          if(p.left && !q.left || p.left && !q.left) return false;
          if(p.right && !q.right || p.right && !q.right) return false;
          if(p.left) {
              arr1.push(p.left);
              arr2.push(q.left);
          }
          if(p.right) {
              arr1.push(p.right);
              arr2.push(q.right);
          }
      } else if(q && !p || p && !q) {
          return false;
      }
  }
  return true;
};

const p = {
  val: 233,
  left: null,
  right: null
};
const q = {
  val: 666,
  left: null,
  right: null
};

console.log(isSameTree(p, q))
