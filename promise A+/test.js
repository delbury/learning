const CustomPromise = require('./CustomPromise');

CustomPromise.resolve().then(() => {
  console.log(0); // mt1
  return CustomPromise.resolve(4); // mt8
}).then((res) => {
  console.log(res); // mt2
})

CustomPromise.resolve().then(() => {
  console.log(1); // mt3
}).then(() => {
  console.log(2); // mt4
}).then(() => {
  console.log(3); // mt5
}).then(() => {
  console.log(5); // mt6
}).then(() =>{
  console.log(6); // mt7
})


