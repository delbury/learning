/**
 * 栈排序。 编写程序，对栈进行排序使最小元素位于栈顶。
 * 最多只能使用一个其他的临时栈存放数据，但不得将元素复制到别的数据结构（如数组）中。
 * 该栈支持如下操作：push、pop、peek 和 isEmpty。当栈为空时，peek 返回 -1。
 *
 * 示例1:
 *  输入：
 * ["SortedStack", "push", "push", "peek", "pop", "peek"]
 * [[], [1], [2], [], [], []]
 *  输出：
 * [null,null,null,1,null,2]
 *
 * 示例2:
 *  输入：
 * ["SortedStack", "pop", "pop", "push", "pop", "isEmpty"]
 * [[], [], [], [1], [], []]
 *  输出：
 * [null,null,null,null,null,true]
 *
 * 说明:
 * 栈中的元素数目在[0, 5000]范围内。
 */

const SortedStack = function () {
  this.stack = [];
  this.helper = [];
};

/**
 * @param {number} val
 * @return {void}
 */
SortedStack.prototype.push = function (val) {
  if (this.isEmpty() || this.stack[this.stack.length - 1] >= val) {
    this.stack.push(val);
  } else {
    while (this.stack.length) {
      const top = this.stack.pop();
      if (top >= val) {
        this.stack.push(top);
        this.stack.push(val);
        while (this.helper.length) {
          this.stack.push(this.helper.pop());
        }
        return;
      }
      this.helper.push(top);
    }
    this.stack.push(val);
    while (this.helper.length) {
      this.stack.push(this.helper.pop());
    }
  }
};

/**
 * @return {void}
 */
SortedStack.prototype.pop = function () {
  return this.stack.pop();
};

/**
 * @return {number}
 */
SortedStack.prototype.peek = function () {
  if (this.isEmpty()) return -1;
  return this.stack[this.stack.length - 1];
};

/**
 * @return {boolean}
 */
SortedStack.prototype.isEmpty = function () {
  return !this.stack.length;
};

/**
 * Your SortedStack object will be instantiated and called as such:
 * var obj = new SortedStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.isEmpty()
 */

const { logAssert, runActionArgByArray } = require('../tools/LogTools.js');
console.log(
  runActionArgByArray([SortedStack, 'push', 'push', 'push', 'push'], [[], [4], [2], [5], [1]], {
    logInstance: true,
  })
);
