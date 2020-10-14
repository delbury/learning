/**
 * LIFO (Last In First Out)
 */

class Stack {
  constructor() {
    this.stack = [];
  }

  push(value) {
    this.stack.push(value);
  }

  pop() {
    return this.stack.pop();
  }

  isEmpty() {
    return this.stack.length === 0;
  }

  clear() {
    this.stack.length = 0;
  }

  get size() {
    return this.stack.length;
  }
}
