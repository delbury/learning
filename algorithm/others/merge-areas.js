
function Interval(a, b){
  this.start = a || 0;
  this.end = b || 0;
}

/**
 * 给出一组区间，请合并所有重叠的区间。
 * 请保证合并后的区间按区间起点升序排列。
 * 
 * @param intervals Interval类一维数组 
 * @return Interval类一维数组
 */
function merge( intervals ) {
  // write code here
  if(intervals.length < 2) return intervals;
  // 排序
  intervals.sort((a, b) => a.start - b.start);
  const res = [intervals[0]];
  for(let i = 1; i < intervals.length; i++) {
    if(intervals[i].start > res[res.length - 1].end) {
      // 不可合并
      res.push(intervals[i]);
    } else {
      // 可合并
      const prev = res.pop();
      res.push(new Interval(prev.start, Math.max(intervals[i].end, prev.end)));
    }
  }
  return res;
}
module.exports = {
  merge : merge
};

const { logAssert, logAssertDisorder } = require('../tools/LogTools.js');
// logAssert(merge, [[10,30],[20,60],[80,100],[150,180]], [[10,60],[80,100],[150,180]]);
// logAssert(merge, [[10,30],[20,60],[80,100],[150,180]], [[10,60],[80,100],[150,180]]);