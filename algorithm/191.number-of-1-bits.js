/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function(n) {
    // 1.
    // return Array.from(n.toString(2)).reduce((sum, bit) => sum + +bit, 0);

    // 2.
    // let count = 0;
    // while(n) {
    //     count++;
    //     n &= n - 1;
    // }
    // return count;

    // 3.
    let count = 0;
    while(n) {
        count += n & 1;
        n >>>= 1;
    }
    return count;
};