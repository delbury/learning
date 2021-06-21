/**
 * 判断岛屿数量
 * @param grid char字符型二维数组 
 * @return int整型
 */
function solve(grid) {
  // write code here
  let count = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] == 1) {
        const queue = [
          [i, j]
        ];
        grid[i][j] = 0;
        while (queue.length) {
          const [ii, jj] = queue.pop();
          for (let k = 0; k < 4; k++) {
            let x = ii + (k === 0 ? 1 : k === 1 ? -1 : 0);
            let y = jj + (k === 2 ? 1 : k === 3 ? -1 : 0);
            if (
              x >= 0 && x < grid.length &&
              y >= 0 && y < grid[0].length &&
              grid[x][y] == 1
            ) {
              queue.push([x, y]);
              grid[x][y] = 0;
            }
          }
        }
        count++;
      }
    }
  }
  return count;
}
module.exports = {
  solve: solve
};

console.log(solve([
  [1, 1, 0, 0, 0],
  [0, 1, 0, 1, 1],
  [0, 0, 0, 1, 1],
  [0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1]
]));
// console.log(solve([[0]]));