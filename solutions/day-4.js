const { readAndSplit } = require("../utils/inputs");

const games = readAndSplit(4)
  .map((game) => game.replace(/Card \d: /, ""))
  .map((game) => game.split(" | "));
let total = 0;
games.forEach((game) => {
  const elfsNumbers = game[0].split(" ");
  const winningNumbers = game[1].split(" ").filter((num) => num !== "");
  const winners = elfsNumbers.filter((number) => {
    return winningNumbers.includes(number);
  });
  console.log(elfsNumbers, winningNumbers);
  if (winners.length) {
    console.log(winners.length);
    total += 2 ** (winners.length - 1);
  }
});
console.log(total);
