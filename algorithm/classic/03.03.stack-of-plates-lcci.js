/**
 * 堆盘子。设想有一堆盘子，堆太高可能会倒下来。
 * 因此，在现实生活中，盘子堆到一定高度时，我们就会另外堆一堆盘子。
 * 请实现数据结构SetOfStacks，模拟这种行为。SetOfStacks应该由多个栈组成，并且在前一个栈填满时新建一个栈。
 * 此外，SetOfStacks.push()和SetOfStacks.pop()应该与普通栈的操作方法相同
 * （也就是说，pop()返回的值，应该跟只有一个栈时的情况一样）。
 *
 *  进阶：实现一个popAt(int index)方法，根据指定的子栈，执行pop操作。
 *
 * 当某个栈为空时，应当删除该栈。当栈中没有元素或不存在该栈时，pop，popAt 应返回 -1.
 *
 * 示例1:
 *  输入：
 * ["StackOfPlates", "push", "push", "popAt", "pop", "pop"]
 * [[1], [1], [2], [1], [], []]
 *  输出：
 * [null, null, null, 2, 1, -1]
 *
 * 示例2:
 *  输入：
 * ["StackOfPlates", "push", "push", "push", "popAt", "popAt", "popAt"]
 * [[2], [1], [2], [3], [0], [0], [0]]
 *  输出：
 * [null, null, null, null, 2, 1, 3]
 */

const StackOfPlates = function (cap) {
  this.cap = cap;
  this.stacks = [];
};

/**
 * @param {number} val
 * @return {void}
 */
StackOfPlates.prototype.push = function (val) {
  if (!this.cap) return;
  if (!this.stacks.length || this.stacks[this.stacks.length - 1].length >= this.cap) {
    this.stacks.push([val]);
  } else {
    this.stacks[this.stacks.length - 1].push(val);
  }
};

/**
 * @return {number}
 */
StackOfPlates.prototype.pop = function () {
  if (!this.stacks.length) return -1;
  const stack = this.stacks[this.stacks.length - 1];
  const res = stack.pop();
  if (!stack.length) this.stacks.pop();
  return res;
};

/**
 * @param {number} index
 * @return {number}
 */
StackOfPlates.prototype.popAt = function (index) {
  const stack = this.stacks[index];
  if (!stack) return -1;
  const res = stack.pop();
  if (!stack.length) this.stacks.splice(index, 1);
  return res;
};

const obj = new StackOfPlates(0);
obj.push(1);
obj.push(2);
obj.push(3);
obj.push(4);
obj.push(5);
console.log(obj);
