const { readAndSplit } = require("../utils/inputs");

function part1() {
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
  console.log(input);
  console.log(
    input.reduce((acc, curr, i) => {
      return acc + +curr[1] * (i + 1);
    }, 0)
  );
}

function part2() {
  const input = readAndSplit(7).map((line) => line.split(" "));
  const hands = {
    noPair: [],
    pair: [],
    twoPair: [],
    threeOfAKind: [],
    fullHouse: [],
    fourOfAKind: [],
    fiveOfAKind: [],
  };
  const cardStrengths = {
    J: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    T: 10,
    Q: 12,
    K: 13,
    A: 14,
  };
  const order = [
    "noPair",
    "pair",
    "twoPair",
    "threeOfAKind",
    "fullHouse",
    "fourOfAKind",
    "fiveOfAKind",
  ];
  const cardWeights = {
    noPair: [1, 1, 1, 1, 1],
    pair: [2, 1, 1, 1],
    twoPair: [2, 2, 1],
    threeOfAKind: [3, 1, 1],
    fullHouse: [3, 2],
    fourOfAKind: [4, 1],
    fiveOfAKind: [5],
  };
  function getHandLabel(hand) {
    if (hand[0] === "JJJJJ") {
      hands["fiveOfAKind"].push(hand);
      return;
    }
    const letters = {};
    for (const letter of hand[0]) {
      letters[letter] ??= 0;
      letters[letter]++;
    }
    const js = letters["J"];
    delete letters["J"];
    const values = Object.values(letters).sort((a, b) => b - a);
    if (js) values[0] += js;
    for (const weight in cardWeights) {
      const expected = cardWeights[weight];
      if (expected.every((a, i) => a === values[i])) {
        hands[weight].push(hand);
        flag = 0;
      }
    }
  }
  function sortFromValues(a, b) {
    const handA = a[0];
    const handB = b[0];
    for (let i = 0; i < handA.length; i++) {
      if (handA[i] !== handB[i]) {
        return cardStrengths[handA[i]] - cardStrengths[handB[i]];
      }
    }
    return 0;
  }
  input.forEach((hand) => {
    getHandLabel(hand);
  });
  for (const key in hands) {
    const collection = hands[key];
    collection.sort(sortFromValues);
  }
  let final = [];
  for (const key of order) {
    final = [...final, ...hands[key]];
  }
  console.log(
    final.reduce((acc, curr, i) => {
      return acc + +curr[1] * (i + 1);
    }, 0)
  );
}
