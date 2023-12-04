const { readAndSplit } = require("../utils/inputs");

const games = readAndSplit(4)
  .map((game) => game.replace(/Card \d: /, ""))
  .map((game) => game.split(" | "));
let total = 0;
const scratchCards = games.map((_, index) => index);
while (scratchCards.length) {
  total++;
  const gameNumber = scratchCards.pop();
  const game = games[gameNumber];
  const elfsNumbers = game[0].split(" ");
  const winningNumbers = game[1].split(" ").filter((num) => num !== "");
  const winners = elfsNumbers.filter((number) => {
    return winningNumbers.includes(number);
  });
  for (let i = 0; i < winners.length; i++) {
    scratchCards.push(i + 1 + gameNumber);
  }
}
console.log(total);
