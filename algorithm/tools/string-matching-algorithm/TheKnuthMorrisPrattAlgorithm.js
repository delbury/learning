/**
 * KMP 算法 (The Knuth-Morris-Pratt Algorithm)
 * 时间复杂度 O(m+n)
 * 
 *
 * next[i] 表示 p[0] ~ p[i] 这一子串的最大相同前后缀的长度，记为 "len"
 * 即当 (i+1) 位上发生不匹配时，匹配串需要跳到下标为 (next[i]) 的位置重新开始匹配。
 * 
 * 计算 next 数组：
 * 1. 初始化当前前缀的尾指针为 j = 0，当前后缀的尾指针为 i = 1
 *   （后缀尾指针 i 每一次循环后 ++，前缀尾指针通过 ++ 和回溯计算 len）
 * 2. next[0] = 0 （即子串为一位时，没有前后缀）
 * 3. while(j > 0 && p[i] !== p[j]) { j = p[j-1] }
 *    当 j 不为 0 时（即前缀尾指针不在首字符时）
 *    并且子串的前缀为字符和后缀尾字符不匹配时，则表示当前下标下的 len 需要重新回溯计算
 *    前缀尾指针 j 需要回溯到当前下标的前一位 next[j-1] 所记录的坐标（即比当前子串少一个字符的上一个子串的 len）
 * 4. if(p[i] === p[j]) { j++ }
 *    如果当前前缀的尾指针指向的字符和后缀尾指针指向的字符相等，则表示到目前为止前后缀都是相同的
 *    则前后的尾指针都要后移一位，匹配下一个字符（后缀尾指针 i 在每一次循环后自动 ++）
 *   （即 len = j + 1，下标 +1 即为长度，在这里因为 j 需要后移一位，则直接先后移再取后移后的值最为 len）
 * 5. next[i] = j;
 *    更新 next 数组
 *    此刻 j 即为最大相同前后缀的长度，表示匹配到下标 i+1 时若不匹配时，则需要回溯到的下标
 */

const kmp = function(target, pattern) {
  // 空的匹配串返回 0
  // 匹配串长度与原串长度相等时，直接比较两者是否相等，相等则返回 0，不相等返回 -1
  // 匹配串大于原串直接返回 -1
  if(!pattern.length) return 0;
  if(target.length === pattern.length) return target === pattern ? 0 : -1;
  if(pattern.length > target.length) return -1;

  const next = [0]; // 初始化 next 数组，设置第 0 位的值为 0
  // 计算 next 数组
  // i：后缀的尾指针，j：前缀的尾指针
  for(let j = 0, i = 1; i < pattern.length; i++) {
    // 不匹配时，j 回溯到前一个子串的，直到匹配或者 回到首字符
    while(j > 0 && pattern[i] !== pattern[j]) {
      j = next[j - 1]; 
    }
    // 匹配时
    if(pattern[i] === pattern[j]) {
      j++; // 最大相同前后缀的长度 +1
    }
    next[i] = j;
  }

  // 匹配原串
  // i：原串的当前匹配字符的指针，j：匹配串的当前匹配字符的指针
  for(let i = 0, j = 0; i < target.length; i++) {
    // 若余下未匹配的匹配串长度大于原创未匹配的长度，则直接返回 -1
    if(pattern.length - j > target.length - i) break;
    // 若不匹配，则回溯，直到匹配或回到首字符
    while(j > 0 && target[i] !== pattern[j]) {
      j = next[j - 1];
    }
    // 当前字符匹配，移动 j 指针，（i 指针会在当前循环结束后自动移动）
    if(target[i] === pattern[j]) {
      j++;
    }
    // 判断是否匹配成功（即判断 j 指针是否已经到匹配串的末尾）
    if(j === pattern.length) {
      // 返回匹配成功时的匹配串在原串起始位置
      // 即当前原串的下标 - 匹配串的长度 + 1
      return i - pattern.length + 1;
    }
  }

  // 没有匹配到这返回 -1
  return -1;
};

console.log(kmp('hello', 'll'));
