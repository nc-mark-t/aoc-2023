const { readAndSplit } = require("../utils/inputs");
console.time();
const races = readAndSplit(6);
const times = races[0].match(/\d+/g).join("");
const distances = races[1].match(/\d+/g).join("");
let multiplier = 1;
for (let i = 0; i < times.length; i++) {
  let winningCombos = 0;
  const time = times[i];
  const distance = distances[i];
  for (let j = 1; j < time; j++) {
    if (j * (time - j) > distance) winningCombos += 1;
  }
  multiplier *= winningCombos;
}

console.log(multiplier);
console.timeEnd();
