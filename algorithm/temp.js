const {
  log,
  createTreeByArrayLayer,
  logBinaryTreeV2,
  logBinaryTree,
  logByColumn,
  createRandomTree,
  flog,
  transferBinaryTreeToHeap,
  createTreeByArray,
} = require('./tools/LogTools.js');

const arr = [
  9,
  null,
  2,
  null,
  null,
  5,
  9,
  null,
  null,
  null,
  null,
  5,
  3,
  null,
  4,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  4,
  5,
  6,
  // 7,
  // null,
  // null,
  // 4,
];

logByColumn(
  [
    // () => {
    //   const tree = createRandomTree({ treeDeep: 5 });
    //   const heap = transferBinaryTreeToHeap(tree);
    //   flog(heap);
    //   logBinaryTreeV2(tree);
    // },
    () => logBinaryTreeV2(createTreeByArray(arr)),
    // () => logBinaryTreeV2(createTreeByArray(arr), { compressedByLayer: true }),
  ],
  {
    disabled: true,
  }
);
