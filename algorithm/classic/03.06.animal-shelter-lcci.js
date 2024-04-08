/**
 * 动物收容所。有家动物收容所只收容狗与猫，且严格遵守“先进先出”的原则。
 * 在收养该收容所的动物时，收养人只能收养所有动物中“最老”（由其进入收容所的时间长短而定）的动物，或者可以挑选猫或狗（同时必须收养此类动物中“最老”的）。
 * 换言之，收养人不能自由挑选想收养的对象。
 * 请创建适用于这个系统的数据结构，实现各种操作方法，比如enqueue、dequeueAny、dequeueDog和dequeueCat。
 * 允许使用Java内置的LinkedList数据结构。
 * enqueue方法有一个animal参数，animal[0]代表动物编号，animal[1]代表动物种类，其中 0 代表猫，1 代表狗。
 * dequeue*方法返回一个列表[动物编号, 动物种类]，若没有可以收养的动物，则返回[-1,-1]。
 *
 * 示例1:
 *  输入：
 * ["AnimalShelf", "enqueue", "enqueue", "dequeueCat", "dequeueDog", "dequeueAny"]
 * [[], [[0, 0]], [[1, 0]], [], [], []]
 *  输出：
 * [null,null,null,[0,0],[-1,-1],[1,0]]
 *
 * 示例2:
 *  输入：
 * ["AnimalShelf", "enqueue", "enqueue", "enqueue", "dequeueDog", "dequeueCat", "dequeueAny"]
 * [[], [[0, 0]], [[1, 0]], [[2, 1]], [], [], []]
 *  输出：
 * [null,null,null,null,[2,1],[0,0],[1,0]]
 *
 * 说明:
 * 收纳所的最大容量为20000
 */

const AnimalShelf = function () {
  this.head = null;
  this.tail = this.head;
};

/**
 * @param {number[]} animal
 * @return {void}
 */
AnimalShelf.prototype.enqueue = function (animal) {
  const node = {
    type: animal[1],
    val: animal[0],
    next: null,
  };
  if (this.head) {
    this.tail.next = node;
    this.tail = this.tail.next;
  } else {
    this.head = node;
    this.tail = this.head;
  }
};

/**
 * @return {number[]}
 */
AnimalShelf.prototype.dequeueAny = function () {
  if (!this.head) return [-1, -1];
  const res = [this.head.val, this.head.type];
  this.head = this.head.next;
  if (!this.head) this.tail = null;
  return res;
};

/**
 * @return {number[]}
 */
AnimalShelf.prototype.dequeueDog = function () {
  const temp = { next: this.head };
  let prev = temp;
  let cur = this.head;
  while (cur) {
    if (cur.type === 1) {
      prev.next = cur.next;
      this.head = temp.next;
      if (!this.head) this.tail = null;
      if (cur === this.tail) this.tail = prev;
      return [cur.val, cur.type];
    }
    prev = cur;
    cur = cur.next;
  }
  return [-1, -1];
};

/**
 * @return {number[]}
 */
AnimalShelf.prototype.dequeueCat = function () {
  const temp = { next: this.head };
  let prev = temp;
  let cur = this.head;
  while (cur) {
    if (cur.type === 0) {
      prev.next = cur.next;
      this.head = temp.next;
      if (!this.head) this.tail = null;
      if (cur === this.tail) this.tail = prev;
      return [cur.val, cur.type];
    }
    prev = cur;
    cur = cur.next;
  }
  return [-1, -1];
};

/**
 * Your AnimalShelf object will be instantiated and called as such:
 * var obj = new AnimalShelf()
 * obj.enqueue(animal)
 * var param_2 = obj.dequeueAny()
 * var param_3 = obj.dequeueDog()
 * var param_4 = obj.dequeueCat()
 */

const actions = [
  AnimalShelf,
  'dequeueDog',
  'dequeueCat',
  'dequeueAny',
  'dequeueAny',
  'dequeueCat',
  'dequeueAny',
  'enqueue',
  'dequeueAny',
  'dequeueDog',
  'dequeueDog',
  'enqueue',
  'dequeueCat',
  'dequeueCat',
  'dequeueCat',
  'dequeueAny',
  'enqueue',
  'dequeueCat',
  'dequeueDog',
  'dequeueCat',
  'enqueue',
  'enqueue',
  'dequeueDog',
  'dequeueCat',
  'enqueue',
  'dequeueAny',
  'enqueue',
  'enqueue',
  'enqueue',
  'dequeueDog',
  'enqueue',
  'dequeueAny',
  'dequeueCat',
  'dequeueAny',
  'dequeueAny',
  'dequeueAny',
  'dequeueCat',
  'dequeueDog',
  'enqueue',
  'dequeueCat',
  'enqueue',
  'enqueue',
  'enqueue',
  'enqueue',
  'dequeueCat',
  'enqueue',
  'dequeueDog',
  'dequeueCat',
  'dequeueAny',
  'dequeueAny',
  'dequeueAny',
  'dequeueCat',
  'enqueue',
  'dequeueCat',
  'dequeueCat',
  'dequeueDog',
  'dequeueCat',
  'dequeueDog',
  'dequeueCat',
  'dequeueCat',
  'dequeueAny',
  'dequeueCat',
];
const args = [
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [[0, 1]],
  [],
  [],
  [],
  [[1, 1]],
  [],
  [],
  [],
  [],
  [[2, 0]],
  [],
  [],
  [],
  [[3, 0]],
  [[4, 1]],
  [],
  [],
  [[5, 0]],
  [],
  [[6, 0]],
  [[7, 0]],
  [[8, 1]],
  [],
  [[9, 0]],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [[10, 0]],
  [],
  [[11, 0]],
  [[12, 1]],
  [[13, 0]],
  [[14, 1]],
  [],
  [[15, 0]],
  [],
  [],
  [],
  [],
  [],
  [],
  [[16, 1]],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
];
const expects = [
  null,
  [-1, -1],
  [-1, -1],
  [-1, -1],
  [-1, -1],
  [-1, -1],
  [-1, -1],
  null,
  [0, 1],
  [-1, -1],
  [-1, -1],
  null,
  [-1, -1],
  [-1, -1],
  [-1, -1],
  [1, 1],
  null,
  [2, 0],
  [-1, -1],
  [-1, -1],
  null,
  null,
  [4, 1],
  [3, 0],
  null,
  [5, 0],
  null,
  null,
  null,
  [8, 1],
  null,
  [6, 0],
  [7, 0],
  [9, 0],
  [-1, -1],
  [-1, -1],
  [-1, -1],
  [-1, -1],
  null,
  [10, 0],
  null,
  null,
  null,
  null,
  [11, 0],
  null,
  [12, 1],
  [13, 0],
  [14, 1],
  [15, 0],
  [-1, -1],
  [-1, -1],
  null,
  [-1, -1],
  [-1, -1],
  [16, 1],
  [-1, -1],
  [-1, -1],
  [-1, -1],
  [-1, -1],
  [-1, -1],
  [-1, -1],
];

const act2 = [AnimalShelf, 'enqueue', 'enqueue', 'enqueue', 'enqueue', 'enqueue', 'enqueue'];
const arg2 = [[], [[0, 0]], [[1, 1]], [[2, 0]], [[3, 0]], [[4, 1]], [[5, 0]]];
const exp2 = [null, null, null, null, null, null, null];
const { logAssert, runActionArgByArray } = require('../tools/LogTools.js');
const res = runActionArgByArray(actions, args, { expects, stopAtError: true, stopAtIndex: 29 });
// const res = runActionArgByArray(act2, arg2, { expects: exp2, stopAtError: true, stopAtIndex: 3 });
// console.log(res);
