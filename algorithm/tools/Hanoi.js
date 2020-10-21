function hanoi(n, A = 'A', B = 'B', C = 'C') {
  if (n === 0) {
    return;
  }
  hanoi(n - 1, A, C, B);
  console.log(`${n}: ${A} --> ${C}`);
  hanoi(n - 1, B, A, C);
}

hanoi(1);
console.log(''.padEnd(10, '*'));
hanoi(2);
console.log(''.padEnd(10, '*'));
hanoi(3);