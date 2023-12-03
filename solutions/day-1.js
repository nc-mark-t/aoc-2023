const { readAndSplit } = require("../utils/inputs");

const inputLines = readAndSplit(1);
const getFirstDigit = (string) => {
  const firstInt = string.match(/\d/)[0];
  return firstInt;
};
const getLastDigit = (string) => {
  const lastInt = string.match(/[\d]/g).at(-1);
  return lastInt;
};
// PART 2
const numbersAsString = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const getFirstNumber = (string) => {
  const firstNumberAsStringOrDigitRegex = new RegExp(
    `${Object.keys(numbersAsString).join("|")}|[1-9]`
  );
  const firstNumber = string.match(firstNumberAsStringOrDigitRegex)[0];
  return numbersAsString[firstNumber] ?? firstNumber;
};
const getLastNumber = (string) => {
  const numberAsStringOrDigitRegex = new RegExp(
    `${Object.keys(numbersAsString).join("|")}|[1-9]`
  );
  let lastMatch, index;
  let currentString = string;
  do {
    const currentMatch = currentString.match(numberAsStringOrDigitRegex);
    if (currentMatch) [lastMatch, index] = currentMatch;
    currentString = currentString.slice(index);
  } while (currentString.length);
  return numbersAsString[lastMatch] ?? lastMatch;
};

const sumFirstAndLast = () => {
  let total = 0;
  for (const line of inputLines) {
    const firstDigit = getFirstNumber(line);
    const lastDigit = getLastNumber(line);
    total += parseInt(firstDigit + lastDigit);
  }
  return total;
};
const solution = sumFirstAndLast();
console.log(solution);

module.exports = { getFirstDigit, getLastDigit, getFirstNumber, getLastNumber };
