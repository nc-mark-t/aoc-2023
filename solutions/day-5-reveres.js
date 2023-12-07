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
const mappings = parseMappings(input);
function mapsFrom(previousState, nextMap) {
  for (const [source, destination, range] of mappings[nextMap]) {
    const difference = +previousState - +source;
    if (previousState >= source && difference < +range) {
      return +destination + +difference;
    }
  }
  return +previousState;
}
function toHumidity(previousState) {
  return mapsFrom(previousState, "humidity-to-location map");
}
function toTemperature(previousState) {
  return mapsFrom(previousState, "temperature-to-humidity map");
}
function toLight(previousState) {
  return mapsFrom(previousState, "light-to-temperature map");
}
function toWater(previousState) {
  return mapsFrom(previousState, "water-to-light map");
}
function toFertilizer(previousState) {
  return mapsFrom(previousState, "fertilizer-to-water map");
}
function toSoil(previousState) {
  return mapsFrom(previousState, "soil-to-fertilizer map");
}
function toSeed(previousState) {
  return mapsFrom(previousState, "seed-to-soil map");
}
function part2Reversed() {
  const seeds = mappings["seeds"];
  const ranges = getRanges(seeds);
  for (let i = 1; i < 999999999; i++) {
    if (i % 10000000 === 0) console.log(i);
    let currentState = i;
    currentState = toHumidity(currentState);
    currentState = toTemperature(currentState);
    currentState = toLight(currentState);
    currentState = toWater(currentState);
    currentState = toFertilizer(currentState);
    currentState = toSoil(currentState);
    currentState = toSeed(currentState);
    if (inRanges(currentState, ranges)) {
      console.log(i);
      break;
    }
  }
}

function getRanges(seeds) {
  const ranges = [];
  while (seeds.length) {
    ranges.push(seeds.splice(-2, 2));
  }
  return ranges.map(([a, b]) => [+a, +a + +b]);
}
function inRanges(number, ranges) {
  return (
    (number > ranges[0][0] && number < ranges[0][1]) ||
    (number > ranges[1][0] && number < ranges[1][1]) /*  ||
    (number > ranges[2][0] && number < ranges[2][1]) ||
    (number > ranges[3][0] && number < ranges[4][1]) ||
    (number > ranges[4][0] && number < ranges[4][1]) */
  );
}

function getMaxNumber() {
  let highest = 0;
  const values = [];
  for (const key in mappings) {
    if (key === "seeds") continue;
    const max = mappings[key].map((map) => {
      return +map[1] + +map[2];
    });
    values.push(...max);
  }
  console.log(values);
  console.log(Math.max(...values));
}
console.time("reversed");
getMaxNumber();
console.timeEnd("reversed");
