const { readAndSplit } = require("../utils/inputs");

const input = readAndSplit(7).map((line) => line.split(" "));

const cardStrengths = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

function sortHands(b, a) {
  const uniqueCardsA = [...new Set(a)];
  const uniqueCardsB = [...new Set(b)];
  const uniqueRank = uniqueCardsA.length - uniqueCardsB.length;
  if (uniqueRank !== 0) return uniqueRank;
  return sortSameRank(uniqueCardsA, uniqueCardsB, uniqueCardsA.length);
  function sortSameRank(uniqueCardsA, uniqueCardsB, rank) {
    const polarityA = uniqueCardsA.some((char) => {
      const letterRegEx = new RegExp(char, "g");
      return a.match(letterRegEx)?.length === rank;
    });
    const polarityB = uniqueCardsB.some((char) => {
      const letterRegEx = new RegExp(char, "g");
      return b.match(letterRegEx)?.length === rank;
    });
    const aStrength = polarityA ? 1 : 0;
    const bStrength = polarityB ? 1 : 0;
    if (aStrength - bStrength !== 0)
      return rank > 3 ? aStrength - bStrength : bStrength - aStrength;
    for (let i = 0; i < a.length; i++) {
      if (cardStrengths[b[i]] - cardStrengths[a[i]] !== 0) {
        return cardStrengths[b[i]] - cardStrengths[a[i]];
      }
    }
    return 0;
  }
}

input.sort((a, b) => {
  return sortHands(a[0], b[0]);
});

console.log(
  input.reduce((acc, curr, i) => {
    return acc + +curr[1] * (i + 1);
  }, 0)
);
