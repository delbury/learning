const createReadline = (lines) => {
  const fn = function*() {
    for(let line of lines) {
      yield line;
    }
  };
  const gen = fn();
  const next = gen.next.bind(gen);
  return () => next().value;
};

const print = (...args) => {
  console.log(...args);
};

module.exports = {
  print,
  createReadline,
};