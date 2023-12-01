const { readFileSync } = require("fs");

const readAndSplit = (dayNum) => {
  const file = readFileSync(`inputs/day-${dayNum}.txt`, "utf-8");
  const lines = file.split(`\n`);
  return lines;
};

module.exports = { readAndSplit };
