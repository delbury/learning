/**
 * @param {number} n
 * @return {boolean}
 */
// 数学法
var isHappy = function (n) {
  while (true) {
    if (n === 1) return true;
    if ([4, 16, 37, 58, 89, 145, 42, 20].includes(n)) return false;

    n = n.toString().split('').reduce((sum, it) => sum + (+it) ** 2, 0);
  }
};


// 快慢指针
// var isHappy = function (n) {
//   if (n === 1) return true;

//   let slow = n;
//   let fast = n.toString().split('').reduce((sum, it) => sum + (+it) ** 2, 0);
//   while (fast !== slow) {
//     slow = slow.toString().split('').reduce((sum, it) => sum + (+it) ** 2, 0);

//     if (slow === 1) return true;

//     fast = fast.toString().split('').reduce((sum, it) => sum + (+it) ** 2, 0);
//     fast = fast.toString().split('').reduce((sum, it) => sum + (+it) ** 2, 0);
//   }
//   return false;
// };


console.log(isHappy(19));