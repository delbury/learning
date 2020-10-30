/**
 * 给定一个包含 0 和 1 的二维网格地图，其中 1 表示陆地 0 表示水域。
 * 网格中的格子水平和垂直方向相连（对角线方向不相连）。整个网格被水完全包围，但其中恰好有一个岛屿（或者说，一个或多个表示陆地的格子相连组成的岛屿）。
 * 岛屿中没有“湖”（“湖” 指水域在岛屿内部且不和岛屿周围的水相连）。格子是边长为 1 的正方形。网格为长方形，且宽度和高度均不超过 100 。计算这个岛屿的周长。
 * 
 * 示例 :
 * 输入:
 * [[0,1,0,0],
 * [1,1,1,0],
 * [0,1,0,0],
 * [1,1,0,0]]
 * 输出: 16
 * 
 * @param {number[][]} grid
 * @return {number}
 */

// 1. 行列扫描
var islandPerimeter = function (grid) {
  let totalCount = 0; // 总共的格子
  let adjoinCount = 0; // 相邻的边数

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[0].length; y++) {
      if (grid[x][y] == 1) {
        totalCount++;

        if (y > 0 && grid[x][y - 1] == 1) {
          adjoinCount++;
        }
        if (x < grid.length - 1 && grid[x + 1][y] == 1) {
          adjoinCount++;
        }
      }
    }
  }

  return 4 * totalCount - adjoinCount * 2;
};

// 2. DFS 深度优先遍历
const dfs = function (grid, x, y) {
  if (x < 0 || x >= grid.length || y < 0 || y >= grid[0].length) return 1; // 边界条件

  if (grid[x][y] == 0) return 1;

  if (grid[x][y] != 1) return 0;

  grid[x][y] = 2;

  return dfs(grid, x - 1, y)
    + dfs(grid, x + 1, y)
    + dfs(grid, x, y - 1)
    + dfs(grid, x, y + 1);
};

var islandPerimeterDFS = function (grid) {
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[0].length; y++) {
      if (grid[x][y] == 1) {
        return dfs(grid, x, y);
      }
    }
  }
};


const grid = [
  [0, 1, 0, 0],
  [1, 1, 1, 0],
  [0, 1, 0, 0],
  [1, 1, 0, 0],
];
console.log(islandPerimeterDFS(grid));
// console.log(islandPerimeter([[1, 1]]));
