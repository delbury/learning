/**
 * 有一个整数数组，请你根据快速排序的思路，找出数组中第K大的数。
 * 给定一个整数数组a,同时给定它的大小n和要找的K(K在1到n之间)，请返回第K大的数，保证答案存在。
 * 
 * @param a int整型一维数组 
 * @param n int整型 
 * @param K int整型 
 * @return int整型
 */
function findKth( a ,  n = a.length ,  K ) {
  // write code here
  // 快速排序
  const fn = (arr, left, right) => {
    if(left >= right) return arr[left];
    // 取随机基准数的下标
    const index = Math.floor(Math.random() * (right - left + 1) + left);
    const temp = arr[index];
    [arr[index], arr[left]] = [arr[left], arr[index]]; // 将基准值交换到头部
    let l = left, r = right;
    while(l < r) {
      // 从后向前，查找比基准值大的数
      while(arr[r] < temp && l < r) r--;
      if(arr[r] >= temp) arr[l] = arr[r];

      // 从前向后，查找小于于等于基准值的值
      while(arr[l] >= temp && l < r) l++;
      if(arr[l] < temp) arr[r] = arr[l];
    }

    // 若基准值刚好是第 K 大个数
    if(l === K - 1) return temp;
    arr[l] = temp;
    if(K - 1 >= left && K <= l) {
      return fn(arr, left, l - 1);
    } else if(K >= l + 2 && K - 1 <= right) {
      return fn(arr, l + 1, right);
    }
  };
  return fn(a, 0, n - 1);
}
module.exports = {
  findKth : findKth
};

// console.log(findKth([3,46,12,6,1,25637,2,315,26,135,-88]));
// console.log(findKth([1,3,5,2,2],5,3));
const arr = [1332802,1177178,1514891,871248,753214,123866,1615405,328656,1540395,968891,1884022,252932,1034406,1455178,821713,486232,860175,1896237,852300,566715,1285209,1845742,883142,259266,520911,1844960,218188,1528217,332380,261485,1111670,16920,1249664,1199799,1959818,1546744,1904944,51047,1176397,190970,48715,349690,673887,1648782,1010556,1165786,937247,986578,798663];
console.log(findKth(arr,49,24)); // 986578
console.log(arr);
// console.log(arr.sort((a, b) => b - a)[23]);