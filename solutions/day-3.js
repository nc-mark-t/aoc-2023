const { readAndSplit } = require("../utils/inputs");

const input = readAndSplit(3);
const getGearLocations = () => {
  const locations = [];
  input.forEach((line, y) => {
    [...line].forEach((symbol, x) => {
      if (input[y][x] === "*") {
        locations.push(`${y},${x}`);
      }
    });
  });
  return locations;
};
const gearLocations = getGearLocations();
const getMatches = (string) => string.matchAll(/\d+/g);
const getAdjacent = (x, y) => {
  const neighbours = [];
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const newX = x + i;
      const newY = y + j;
      if (i === 0 && j === 0) continue;
      if (
        newX >= 0 &&
        newY >= 0 &&
        newX < input[0].length &&
        newY < input.length
      ) {
        neighbours.push([newX, newY]);
      }
    }
  }
  return neighbours;
};

const hasSymbolAdjacent = (x, y) => {
  const neighbours = getAdjacent(x, y);
  for (let i = 0; i < neighbours.length; i++) {
    const [xToCheck, yToCheck] = neighbours[i];
    console.log(input[yToCheck][xToCheck]);
    if (input[yToCheck][xToCheck].match(/[^\d\.]/)) {
      return true;
    }
  }
  return false;
};
const hasGearAdjacent = (x, y) => {
  const neighbours = getAdjacent(x, y);
  for (let i = 0; i < neighbours.length; i++) {
    const [xToCheck, yToCheck] = neighbours[i];
    if (gearLocations.includes(`${yToCheck},${xToCheck}`)) {
      return `${xToCheck},${yToCheck}`;
    }
  }
  return false;
};
const matchNumberWithIndex = (string) => {
  const matchMetaData = [];
  const matches = string.matchAll(/\d+/g);
  let match = matches.next();
  while (match.value) {
    let index = match.value.index;
    matchMetaData.push({ index, number: match.value[0] });
    match = matches.next();
  }
  return matchMetaData;
};

let gearCombinations = {};
let total = 0;
input.forEach((line, y) => {
  const numbers = matchNumberWithIndex(line);
  numbers.forEach(({ number, index: x }) => {
    for (let i = 0; i < number.length; i++) {
      const gearLocation = hasGearAdjacent(x + i, y);
      if (gearLocation) {
        gearCombinations[gearLocation] ??= [];
        gearCombinations[gearLocation].push(number);
        break;
      }
    }
  });
});
for (const key in gearCombinations) {
  const parts = gearCombinations[key];
  if (parts.length === 2) {
    total += parts[0] * parts[1];
  }
}
console.log(total);
