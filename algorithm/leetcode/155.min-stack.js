/**
 * 设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。
 * push(x) —— 将元素 x 推入栈中。
 * pop() —— 删除栈顶的元素。
 * top() —— 获取栈顶元素。
 * getMin() —— 检索栈中的最小元素。
 *
 * 示例 1:
 * 输入：
 * ["MinStack","push","push","push","getMin","pop","top","getMin"]
 * [[],[-2],[0],[-3],[],[],[],[]]
 * 输出：
 * [null,null,null,null,-3,null,0,-2]
 * 解释：
 * MinStack minStack = new MinStack();
 * minStack.push(-2);
 * minStack.push(0);
 * minStack.push(-3);
 * minStack.getMin();   --> 返回 -3
 * minStack.pop();
 * minStack.top();      --> 返回 0
 * minStack.getMin();   --> 返回 -2
 *
 * 提示：
 * -2^31 <= val <= 2^31 - 1
 * pop、top 和 getMin 操作总是在 非空栈 上调用
 * push, pop, top, and getMin最多被调用 3 * 10^4 次
 *
 * 思路：辅助栈，存放每个值对应的最小值
 * 时间复杂度：O(1)，空间复杂度：O(n)
 *
 * 思路2：单栈，保存差值
 * 1. 空栈入栈，直接入栈 push(x)，min = x
 * 2. 非空栈入栈，push(x - min)，如果 x - min < 0，则 min = x
 */
var MinStack = function () {
  this.stack = [];
  this.mins = [];
};

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function (x) {
  this.stack.push(x);

  if (!this.mins.length) {
    this.mins.push(x);
  } else {
    this.mins.push(Math.min(x, this.mins[this.mins.length - 1]));
  }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  this.mins.pop();
  return this.stack.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  return this.mins[this.mins.length - 1];
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */

const minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin(); // --> 返回 -3.
minStack.pop();
minStack.top(); // --> 返回 0.
minStack.getMin(); // --> 返回 -2.

// 最小栈，单栈方法
class MinStackAnoter {
  constructor() {
    this.stack = [];
    this.min = null;
  }

  push(x) {
    if (!this.stack.length) {
      // 空栈入栈
      this.stack.push(x);
      this.min = x;
    } else {
      // 非空栈入栈
      this.stack.push(x - this.min); // 入栈保存与最小值的差值
      if (x < this.min) {
        // 若差值小于0，则更新最小值
        this.min = x;
      }
    }
  }
  pop() {
    const temp = this.stack.pop();
    const tmin = this.min;

    if (temp < 0) {
      // 若栈顶元素小于0，则说明该元素是最小值，出栈后需要更新最小值
      this.min -= temp;
    }

    // 若出栈元素大于0，出栈前的最小值即为当前值
    // 若出栈元素小于0，出栈前的最小值 + 出栈元素的值即为当前值
    return temp > 0 && this.stack.length > 0 ? temp + tmin : tmin;
  }
  top() {
    return this.stack[this.stack.length - 1] > 0 && this.stack.length > 1
      ? this.stack[this.stack.length - 1] + this.min
      : this.min;
  }
  getMin() {
    return this.min;
  }
}

// 同理最大栈
class MaxStack {
  constructor() {
    this.stack = [];
    this.max = null;
  }

  push(x) {
    if (!this.stack.length) {
      this.stack.push(x);
      this.max = x;
    } else {
      this.stack.push(x - max);

      if (x - max > 0) {
        this.max = x;
      }
    }
  }
  pop() {
    const temp = this.stack.pop();
    const tmax = this.max;

    if (temp > 0) {
      this.max -= temp;
    }

    // 若出栈元素大于0，出栈前的最小值即为当前值
    // 若出栈元素小于0，出栈前的最小值 + 出栈元素的值即为当前值
    return temp < 0 && this.stack.length > 0 ? temp + tmax : tmax;
  }

  top() {
    return this.stack[this.stack.length - 1] < 0 && this.stack.length > 1
      ? this.stack[this.stack.length - 1] + this.max
      : this.max;
  }

  getMax() {
    return this.max;
  }
}
