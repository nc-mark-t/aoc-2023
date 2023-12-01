const assert = (value1, value2) => {
  if (value1 !== value2) {
    throw new Error(`${value1} does not equal ${value2}`);
  }
  console.log("test passed");
};

module.exports = { assert };
