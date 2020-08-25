/**
 * @param {number} n
 * @return {string}
 */

const countAndSay = function(n) {
  if(n === 1) return '1';
  
  const prev = countAndSay(n - 1).split('');
  let str = '', temp = 0, count = 0;
  prev.forEach(item => {
    if(temp !== item) {
      if(temp !== 0) {
        str += count + temp;
      }
      temp = item;
      count = 1;
    } else {
      count++;
    }
  });
  str += count + temp;
  return str;
};

// console.log(countAndSay(5));

function better(string, n) {
  if(n === 1) {
    return string;
  }

  const prev = string.split('');
  let str = '', temp = 0, count = 0;
  prev.forEach(item => {
    if(temp !== item) {
      if(temp !== 0) {
        str += count + temp;
      }
      temp = item;
      count = 1;
    } else {
      count++;
    }
  });
  str += count + temp;
  return better(str, n - 1);
}

const betterStart = function(n) {
  return better('1', n);
};

