const { readAndSplit } = require("../utils/inputs");

const games = readAndSplit(2);
const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;

const getMaxQuantity = (game, color) => {
  const colorRegExp = new RegExp(`[0-9]+ ${color}`, "g");
  const cubesMatches = game.match(colorRegExp);
  const highestRequired = cubesMatches?.reduce((highest, current) => {
    const cubesNeeded = parseInt(current.match(/[0-9]+/));
    return Math.max(highest, cubesNeeded);
  }, 0);
  return highestRequired ?? 0;
};
const gameValidator = (game) => {
  if (getMaxQuantity(game, "red") > MAX_RED) {
    return false;
  }
  if (getMaxQuantity(game, "green") > MAX_GREEN) {
    return false;
  }
  if (getMaxQuantity(game, "blue") > MAX_BLUE) {
    return false;
  }
  return true;
};
const getGameId = (game) => {
  return parseInt(game.match(/[0-9]+/)[0]);
};
const getValidGameIds = () => {
  const validGameIds = [];
  games.forEach((game) => {
    if (gameValidator(game)) {
      validGameIds.push(getGameId(game));
    }
  });
  return validGameIds;
};

const sumIds = (ids) => {
  return ids.reduce((acc, curr) => acc + curr);
};

const fewestCubesNeeded = (game) => {
  return {
    red: getMaxQuantity(game, "red"),
    green: getMaxQuantity(game, "green"),
    blue: getMaxQuantity(game, "blue"),
  };
};
const powerOfSet = (set) => {
  let total = 1;
  for (const color in set) {
    total *= set[color];
  }
  return total;
};

const cubesNeeded = games.map((game) => {
  return fewestCubesNeeded(game);
});

const powers = cubesNeeded.map(powerOfSet);
const answer = powers.reduce((acc, curr) => acc + curr);
console.log(answer);
