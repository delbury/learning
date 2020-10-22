/**
 * 双向链表
 */

class ListNode {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  getList(tail = false) {
    return tail ? this.tail : this.head;
  }

  getListArray(tail = false) {
    const arr = [];
    let p = tail ? this.tail : this.head;
    while(p) {
      arr.push(p.value);
      p = tail ? p.prev : p.next;
    }

    return arr;
  }

  append(value) {
    if(!this.tail) {
      this.tail = new ListNode(value);
      this.head = this.tail;
    } else {
      this.tail.next = new ListNode(value);
      this.tail.next.prev = this.tail;
      this.tail = this.tail.next;
    }
  }

  prepend(value) {
    if(!this.head) {
      this.head = new ListNode(value);
      this.tail = this.head;
    } else {
      this.head.prev = new ListNode(value);
      this.head.prev.next = this.head;
      this.head = this.head.prev;
    }
  }

  search(value) {}

  insert(position, value) {}

  remove(value) {}

  isEmpty() {}

  get size() {
    return this.length;
  }
}

const list = new DoublyLinkedList();
list.append(1);
list.append(2);
list.append(3);
list.prepend(4);
list.prepend(5);
console.log(JSON.stringify(list.getListArray()));
console.log(JSON.stringify(list.getListArray(true)));
