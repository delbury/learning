/**
 * 验证IP地址
 * 编写一个函数来验证输入的字符串是否是有效的 IPv4 或 IPv6 地址
 * 
 * @param IP string字符串 一个IP地址字符串
 * @return string字符串，IPv4 | IPv6 | Neither
 */
function solve( IP ) {
  // write code here
  if(IP.includes('.')) {
    const arr = IP.split('.');
    if(arr.length !== 4) return 'Neither';
    for(let i = 0; i < arr.length; i++) {
      if(+arr[i] > 255 || (arr[i][0] === '0' && arr[i].length > 1)) return 'Neither';
    }
    return 'IPv4';
  } else {
    const arr = IP.split(':');
    if(arr.length !== 8) return 'Neither';
    for(let i = 0; i < arr.length; i++) {
      if(!arr[i] || (arr[i].length > 1 && !+('0x' + arr[i]))) return 'Neither';
    }
    return 'IPv6';
  }
}
module.exports = {
  solve : solve
};