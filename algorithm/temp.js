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

const arr3 = [
  0,
  1,
  7,
  3,
  5,
  2,
  2,
  null,
  2,
  1,
  8,
  8,
  9,
  2,
  6,
  null,
  null,
  3,
  9,
  5,
  null,
  7,
  5,
  null,
  3,
  null,
  null,
  1,
  5,
];
logByColumn(
  [
    () => {
      const tree = createRandomTree({ treeDeep: 6, nodeCount: void 0 });
      // tree = createTreeByArray(arr3);

      const heap = transferBinaryTreeToHeap(tree);
      flog(heap);
      logBinaryTreeV2(tree, { compressedByLayer: void 0, alignCenterByCharBeta: void 0, evenDistanceGap: void 0 });
    },
  ],
  {
    disabled: true,
    interval: 2000,
  }
);
