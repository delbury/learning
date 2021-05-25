/**
 * 密码按如下规则进行计分，并根据不同的得分为密码进行安全等级划分。
 * 一、密码长度:
 * 5 分: 小于等于4 个字符
 * 10 分: 5 到7 字符
 * 25 分: 大于等于8 个字符
 * 
 * 二、字母:
 * 0 分: 没有字母
 * 10 分: 全都是小（大）写字母
 * 20 分: 大小写混合字母
 * 
 * 三、数字:
 * 0 分: 没有数字
 * 10 分: 1 个数字
 * 20 分: 大于1 个数字
 * 
 * 四、符号:
 * 0 分: 没有符号
 * 10 分: 1 个符号
 * 25 分: 大于1 个符号
 * 
 * 五、奖励:
 * 2 分: 字母和数字
 * 3 分: 字母、数字和符号
 * 5 分: 大小写字母、数字和符号
 * 
 * 最后的评分标准:
 * >= 90: 非常安全
 * >= 80: 安全（Secure）
 * >= 70: 非常强
 * >= 60: 强（Strong）
 * >= 50: 一般（Average）
 * >= 25: 弱（Weak）
 * >= 0:  非常弱
 * 
 * 对应输出为：
 * VERY_SECURE
 * SECURE,
 * VERY_STRONG,
 * STRONG,
 * AVERAGE,
 * WEAK,
 * VERY_WEAK,
 * 
 * 请根据输入的密码字符串，进行安全评定。
 * 注：
 * 字母：a-z, A-Z
 * 数字：-9
 * 符号包含如下： (ASCII码表可以在UltraEdit的菜单view->ASCII Table查看)
 * !"#$%&'()*+,-./     (ASCII码：x21~0x2F)
 * :;<=>?@             (ASCII<=><=><=><=><=>码：x3A~0x40)
 * [\]^_`              (ASCII码：x5B~0x60)
 * {|}~                (ASCII码：x7B~0x7E)
 * 
 */

const { print, createReadline } = require('./tools.js');
const readline = createReadline([
  '38$@NoNoNo',
  '123',
]);

const levels = [
  [90, 'VERY_SECURE'],
  [80, 'SECURE'],
  [70, 'VERY_STRONG'],
  [60, 'STRONG'],
  [50, 'AVERAGE'],
  [25, 'WEAK'],
  [0, 'VERY_WEAK'],
];
let pw;
while(pw = readline()) {
  let score = 0;
  // 1.长度
  if(pw.length <= 4) score += 5;
  else if(pw.length <= 7) score += 10;
  else score += 25;

  // 2. 字母
  const cs = /\w/.test(pw)
  let csLowUp = false;
  if(cs) {
    if(pw.toLowerCase() === pw || pw.toUpperCase() === pw) {
      score += 10;
    } else {
      score += 20;
      csLowUp = true;
    }
  }

  // 3. 数字
  const ns = pw.match(/\d/g);
  if(ns) {
    if(ns.length > 1) score += 20;
    else score += 10;
  }

  // 4. 符号
  const os = pw.match(/[!-/:-@[-`{-~]/g);
  if(os) {
    if(os.length > 1) score += 25;
    else score += 10;
  }

  // 5. 奖励
  if(csLowUp && ns && os) score += 5;
  else if(!csLowUp && cs && ns && os) score += 3;
  else if(cs && ns) score += 2;

  for(const level of levels) {
    if(score >= level[0]) {
      print(level[1]);
      break;
    }
  }
}