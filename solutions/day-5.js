const { readFileSync } = require("fs");
const input = readFileSync("./inputs/day-5.txt", "utf-8");
function parseMappings(input) {
  const mapsData = input.split("\n\n");
  const formattedData = {};
  mapsData.forEach((map, index) => {
    if (index === 0) {
      const seeds = map.match(/\d+/g);
      formattedData["seeds"] = seeds;
    } else {
      const splitMappings = map.split("\n");
      const heading = splitMappings.shift().slice(0, -1);
      formattedData[heading] ??= [];
      splitMappings.forEach((line) => {
        const maps = line.match(/\d+/g);
        line && formattedData[heading].push(maps);
      });
    }
  });
  return formattedData;
}
function mapsOnto(currentState, nextMap) {
  for (const [destination, source, range] of nextMap) {
    const difference = +currentState - +source;
    if (+difference < +range && difference >= 0)
      return +destination + difference;
  }
  return +currentState;
}

function part1() {
  mappings = parseMappings(input);
  const mapOrder = [
    "seed-to-soil map",
    "soil-to-fertilizer map",
    "fertilizer-to-water map",
    "water-to-light map",
    "light-to-temperature map",
    "temperature-to-humidity map",
    "humidity-to-location map",
  ];
  let lowest = Infinity;
  const seeds = []; // Rand seeds in pairs of 2 accross multiple instances
  for (let j = 91926764; j < 4138877354; j++) {
    let i = 1;
    if (j % 50000000 === 0) {
      i += 1.4;
      const percent = `${i}%`;
      console.log(percent);
    }
    let currentState = j;
    for (const map of mapOrder) {
      currentState = mapsOnto(currentState, mappings[map]);
    }
    lowest = Math.min(currentState, lowest);
  }
  console.log(lowest);
}
function parseMappings(input) {
  const mapsData = input.split("\n\n");
  const formattedData = {};
  mapsData.forEach((map, index) => {
    if (index === 0) {
      const seeds = map.match(/\d+/g);
      formattedData["seeds"] = seeds;
    } else {
      const splitMappings = map.split("\n");
      const heading = splitMappings.shift().slice(0, -1);
      formattedData[heading] ??= [];
      splitMappings.forEach((line) => {
        const maps = line.match(/\d+/g);
        line && formattedData[heading].push(maps);
      });
    }
  });
  return formattedData;
}
function mapsOnto(currentState, nextMap) {
  for (const [destination, source, range] of nextMap) {
    const difference = +currentState - +source;
    if (+difference < +range && difference >= 0)
      return +destination + difference;
  }
  return +currentState;
}
function part1() {
  mappings = parseMappings(input);
  const mapOrder = [
    "seed-to-soil map",
    "soil-to-fertilizer map",
    "fertilizer-to-water map",
    "water-to-light map",
    "light-to-temperature map",
    "temperature-to-humidity map",
    "humidity-to-location map",
  ];
  let lowest = Infinity;
  const seeds = [2781720183, 218217413, 1315129829, 102999617];
  for (let i = 0; i < seeds.length; i += 2) {
    const startSeed = +seeds[i];
    const range = +seeds[i + 1];
    for (let j = startSeed; j < startSeed + range; j++) {
      if (j % 5000000 === 0) console.log(startSeed, range, j);
      let currentState = j;
      for (const map of mapOrder) {
        currentState = mapsOnto(currentState, mappings[map]);
      }
      lowest = Math.min(currentState, lowest);
    }
  }
  console.log(lowest);
}
console.time("part-2");

console.timeEnd("part-2");

function calculateRanges() {
  const ranges = [
    [91926764, 235794528],
    [3279509610, 325625103],
    [2781720183, 218217413],
    [1315129829, 102999617],
    [3995609239, 143268116],
    [358337926, 185836835],
    [1543999077, 241888600],
    [1795811745, 806228439],
    [2616560939, 56204204],
    [869828854, 224520829],
  ];
  let lowest = Infinity;
  let highest = -Infinity;
  ranges.forEach(([start, range]) => {
    lowest = Math.min(lowest, start);
    highest = Math.max(highest, start + range - 1);
  });
  console.log(lowest, highest);
}
calculateRanges();

console.time("part-2");
part1();
console.timeEnd("part-2");

function calculateRanges() {
  const ranges = [
    [91926764, 235794528],
    [3279509610, 325625103],
    [2781720183, 218217413],
    [1315129829, 102999617],
    [3995609239, 143268116],
    [358337926, 185836835],
    [1543999077, 241888600],
    [1795811745, 806228439],
    [2616560939, 56204204],
    [869828854, 224520829],
  ];
  let lowest = Infinity;
  let highest = -Infinity;
  ranges.forEach(([start, range]) => {
    lowest = Math.min(lowest, start);
    highest = Math.max(highest, start + range - 1);
  });
  console.log(lowest, highest);
}
