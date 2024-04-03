/**
 * 实现一个MyQueue类，该类用两个栈来实现一个队列。
 *
 * 示例：
 * MyQueue queue = new MyQueue();
 *
 * queue.push(1);
 * queue.push(2);
 * queue.peek();  // 返回 1
 * queue.pop();   // 返回 1
 * queue.empty(); // 返回 false
 *
 * 说明：
 * 你只能使用标准的栈操作 -- 也就是只有 push to top, peek/pop from top, size 和 is empty 操作是合法的。
 * 你所使用的语言也许不支持栈。你可以使用 list 或者 deque（双端队列）来模拟一个栈，只要是标准的栈操作即可。
 * 假设所有操作都是有效的 （例如，一个空的队列不会调用 pop 或者 peek 操作）。
 */

const MyQueue = function () {
  // push 用
  this.stack1 = [];
  // pop / peek 用
  this.stack2 = [];
};

/**
 * Push element x to the back of queue.
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.change = function () {
  const from = this.stack1.length ? this.stack1 : this.stack2;
  const to = this.stack1.length ? this.stack2 : this.stack1;
  while (from.length) {
    to.push(from.pop());
  }
};
MyQueue.prototype.push = function (x) {
  if (this.stack2.length) {
    this.change();
  }
  this.stack1.push(x);
};

/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function () {
  if (this.stack1.length) {
    this.change();
  }
  return this.stack2.pop();
};

/**
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function () {
  if (this.stack1.length) {
    this.change();
  }
  return this.stack2[this.stack2.length - 1];
};

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function () {
  return !this.stack1.length && !this.stack2.length;
};

const queue = new MyQueue();

console.log(queue.push(1));
console.log(queue.push(2));
console.log(queue.peek()); // 返回 1
console.log(queue.pop()); // 返回 1
console.log(queue.empty()); // 返回 false
