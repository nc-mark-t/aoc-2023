console.time("recursive");
const { readAndSplit } = require("../utils/inputs");
const games = readAndSplit(4).map((game) => {
  newGame = game.split(" | ");
  newGame[0].replace(/Card \d: /, "");
  return newGame;
});
const cache = {};
function calculateWinners(gameIndex) {
  const cached = cache[gameIndex];
  if (cached) return cached;
  let total = 0;
  const game = games[gameIndex];
  const elfsNumbers = game[0].split(" ");
  const winningNumbers = game[1].split(" ").filter((num) => num !== "");
  const winners = elfsNumbers.filter((number) => {
    return winningNumbers.includes(number);
  });
  total += winners.length;
  for (let i = 0; i < winners.length; i++) {
    total += calculateWinners(i + 1 + gameIndex);
  }
  cache[gameIndex] = total;
  return total;
}
let allWinners = 0;
for (let i = 0; i < games.length; i++) {
  allWinners += 1 + calculateWinners(i);
}
console.log(allWinners);
console.timeEnd("recursive");
