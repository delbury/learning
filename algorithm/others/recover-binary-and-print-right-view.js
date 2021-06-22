/**
 * 请根据二叉树的前序遍历，中序遍历恢复二叉树，并打印出二叉树的右视图
 * 
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 * 求二叉树的右视图
 * @param xianxu int整型一维数组 先序遍历
 * @param zhongxu int整型一维数组 中序遍历
 * @return int整型一维数组
 */
function solve( xianxu ,  zhongxu ) {
  // write code here
  const fn = (xl, xr, zl, zr) => {
    if(xl > xr) return null;
    const index = zhongxu.indexOf(xianxu[xl]);

    return {
      val: xianxu[xl],
      left: fn(xl + 1, xl + index - zl, zl, index - 1),
      right: fn(xr - zr + index + 1, xr, index + 1, zr),
    }
  };
  const root = fn(0, xianxu.length - 1, 0, zhongxu.length - 1);
  const queue = [root, null];
  const res = [];
  while(queue.length) {
    const node = queue.shift();
    if(!node) {
      if(queue.length) {
        queue.push(null);
      }
    } else {
      if(node.left) queue.push(node.left);
      if(node.right) queue.push(node.right);
    }
    if(node && !queue[0]) {
      // 每一层的最后一个元素
      res.push(node.val);
    }
  }
  return res;
}
module.exports = {
  solve : solve
};


solve([1,2,4,5,3],[4,2,5,1,3]);