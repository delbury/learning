class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  getList() {
    return this.head;
  }

  search(value) {
    let p = this.head;
    while(p) {
      if(p.value === value) {
        return p;
      }
      p = p.next;
    }
    return null;
  }

  has(value) {
    return !!this.search(value);
  }

  append(value) {
    if(this.isEmpty()) {
      this.head = new ListNode(value);
    } else {
      let p = this.head;
      while(p.next) {
        p = p.next;
      }
      p.next = new ListNode(value);
    }
    this.increase();

    return this;
  }

  insert(position, value) {
    if(position < 0 || position > this.size) {
      return false;
    }
    
    const root = new ListNode(null);
    root.next = this.head;

    let index = 0;
    let prev = root;
    while(prev.next || position === index) {
      if(position === index) {
        const curr = prev.next;
        prev.next = new ListNode(value);
        prev.next.next = curr;

        this.head = root.next;
        this.increase();
        return true;
      }
      index++;
      prev = prev.next;
    }
    return false;
  }

  remove(value) {
    if(this.isEmpty()) {
      return;
    }

    const root = new ListNode(null);
    root.next = this.head;
    let prev = root;
    let curr = root.next;
    while(curr) {
      if(curr.value === value) {
        prev.next = curr.next;
        this.decrease();
      } else {
        prev = curr;
      }
      curr = curr.next;
    }
    this.head = root.next;
  }

  isEmpty() {
    return !this.head;
  }

  increase() {
    this.length++;
  }

  decrease() {
    this.length--;
  }

  get size() {
    return this.length;
  }
}

// const list = new LinkedList();
// list.append(1);
// list.append(2);
// list.append(3);
// list.append(2);
// list.append(4);
// list.append(5);
// list.remove(2);
// list.remove(1);
// list.insert(3, 1);
// console.log(JSON.stringify(list.getList()));
// console.log(JSON.stringify(list.search(4)));
// console.log(JSON.stringify(list.has(2)));
// console.log(list.size);
