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
  5,
  3,
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
  null,
  4,
  5,
  6,
  null,
  // 7,
  // null,
  // null,
  // 4,
];

const arr2 = [
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
  null,
  null,
  null,
  7,
  8,

  ...Array(29).fill(null),
  9,
  9,
  9,

  ...Array(61).fill(null),
  1,
  1,
  1,
  1,
];

logByColumn(
  [
    () => {
      // const tree = createRandomTree({ treeDeep: 3 });
      tree = createTreeByArray(arr2);
      const heap = transferBinaryTreeToHeap(tree);
      flog(heap);
      // logBinaryTreeV2(tree, { compressedByLayer: false });
      logBinaryTreeV2(tree, { compressedByLayer: true });
    },
    // () => logBinaryTreeV2(createTreeByArray(arr2)),
    // () => logBinaryTreeV2(createTreeByArray(arr), { compressedByLayer: true }),
  ],
  {
    disabled: true,
  }
);
