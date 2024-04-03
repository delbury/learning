/**
 * 三合一。描述如何只用一个数组来实现三个栈。
 * 你应该实现push(stackNum, value)、pop(stackNum)、isEmpty(stackNum)、peek(stackNum)方法。
 * stackNum表示栈下标，value表示压入的值。
 * 构造函数会传入一个stackSize参数，代表每个栈的大小。
 *
 * 示例1:
 *  输入：
 * ["TripleInOne", "push", "push", "pop", "pop", "pop", "isEmpty"]
 * [[1], [0, 1], [0, 2], [0], [0], [0], [0]]
 *  输出：
 * [null, null, null, 1, -1, -1, true]
 * 说明：当栈为空时`pop, peek`返回-1，当栈满时`push`不压入元素。
 *
 * 示例2:
 *  输入：
 * ["TripleInOne", "push", "push", "push", "pop", "pop", "pop", "peek"]
 * [[2], [0, 1], [0, 2], [0, 3], [0], [0], [0], [0]]
 *  输出：
 * [null, null, null, null, 2, 1, -1, -1]
 *
 * 提示：
 * 0 <= stackNum <= 2
 */

const TripleInOne = function (stackSize) {
  this.size = stackSize;
  this.stack = Array(stackSize * 3).fill(null);
  this.lengths = Array(3).fill(0);
};

/**
 * @param {number} stackNum
 * @param {number} value
 * @return {void}
 */
TripleInOne.prototype.push = function (stackNum, value) {
  if (this.lengths[stackNum] < this.size) {
    const stackIndex = this.lengths[stackNum] * 3 + stackNum;
    this.stack[stackIndex] = value;
    this.lengths[stackNum]++;
  }
  return null;
};

/**
 * @param {number} stackNum
 * @return {number}
 */
TripleInOne.prototype.pop = function (stackNum) {
  if (this.isEmpty(stackNum)) return -1;
  const stackIndex = (this.lengths[stackNum] - 1) * 3 + stackNum;
  const res = this.stack[stackIndex];
  this.stack[stackIndex] = null;
  this.lengths[stackNum]--;
  return res;
};

/**
 * @param {number} stackNum
 * @return {number}
 */
TripleInOne.prototype.peek = function (stackNum) {
  if (this.isEmpty(stackNum)) return -1;
  const stackIndex = (this.lengths[stackNum] - 1) * 3 + stackNum;
  if (stackIndex < 0) return -1;
  return this.stack[stackIndex];
};

/**
 * @param {number} stackNum
 * @return {boolean}
 */
TripleInOne.prototype.isEmpty = function (stackNum) {
  return this.lengths[stackNum] < 1;
};

const stacks = new TripleInOne(1);
console.log(stacks.push(0, 1));
console.log(stacks.push(0, 2));
console.log(stacks.stack, stacks.lengths);
console.log(stacks.pop(0));
console.log(stacks.pop(0));
console.log(stacks.pop(0));
console.log(stacks.isEmpty(0));
