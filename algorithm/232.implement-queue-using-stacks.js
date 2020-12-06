/**
 * 请你仅使用两个栈实现先入先出队列。队列应当支持一般队列的支持的所有操作（push、pop、peek、empty）：
 * 
 * 实现 MyQueue 类：
 * void push(int x) 将元素 x 推到队列的末尾
 * int pop() 从队列的开头移除并返回元素
 * int peek() 返回队列开头的元素
 * boolean empty() 如果队列为空，返回 true ；否则，返回 false
 *  
 * 说明：
 * 你只能使用标准的栈操作 —— 也就是只有 push to top, peek/pop from top, size, 和 is empty 操作是合法的。
 * 你所使用的语言也许不支持栈。你可以使用 list 或者 deque（双端队列）来模拟一个栈，只要是标准的栈操作即可。
 *  
 * 进阶：
 * 你能否实现每个操作均摊时间复杂度为 O(1) 的队列？
 * 换句话说，执行 n 个操作的总时间复杂度为 O(n) ，即使其中一个操作可能花费较长时间。
 *  
 * 示例：
 * 输入：
 * ["MyQueue", "push", "push", "peek", "pop", "empty"]
 * [[], [1], [2], [], [], []]
 * 输出：
 * [null, null, null, 1, 1, false]
 * 解释：
 * MyQueue myQueue = new MyQueue();
 * myQueue.push(1); // queue is: [1]
 * myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)
 * myQueue.peek(); // return 1
 * myQueue.pop(); // return 1, queue is [2]
 * myQueue.empty(); // return false
 *  
 * 提示：
 * 1 <= x <= 9
 * 最多调用 100 次 push、pop、peek 和 empty
 * 假设所有操作都是有效的 （例如，一个空的队列不会调用 pop 或者 peek 操作）
 * 
 * 
 * Initialize your data structure here.
 */
var MyQueue = function () {
  this.stackTemp = [];
  this.stack = [];
};

/**
 * Push element x to the back of queue. 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function (x) {
  while (this.stack.length) {
    this.stackTemp.push(this.stack.pop());
  }
  this.stackTemp.push(x);

  while (this.stackTemp.length) {
    this.stack.push(this.stackTemp.pop());
  }
};

/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function () {
  return this.stack.pop();
};

/**
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function () {
  return this.stack[this.stack.length - 1];
};

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function () {
  return this.stack.length === 0;
};

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */

(() => {
  var MyQueue = function () {
    this.stack1 = [];
    this.stack2 = [];
    this.front = null;
  };

  /**
   * Push element x to the back of queue. 
   * @param {number} x
   * @return {void}
   */
  MyQueue.prototype.push = function (x) {
    if (!this.stack1.length) this.front = x;
    this.stack1.push(x);
  };

  /**
   * Removes the element from in front of queue and returns that element.
   * @return {number}
   */
  MyQueue.prototype.pop = function () {
    if (!this.stack2.length) {
      while (this.stack1.length) this.stack2.push(this.stack1.pop());
    }
    return this.stack2.pop();
  };

  /**
   * Get the front element.
   * @return {number}
   */
  MyQueue.prototype.peek = function () {
    return this.stack2.length ? this.stack2[this.stack2.length - 1] : this.front
  };

  /**
   * Returns whether the queue is empty.
   * @return {boolean}
   */
  MyQueue.prototype.empty = function () {
    return !this.stack1.length && !this.stack2.length
  };
})()