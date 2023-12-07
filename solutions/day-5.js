const { log } = require("console");
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
function rangeMapping(ranges, nextMap) {
  const newRanges = [];
  outer: while (ranges.length) {
    const range = ranges.pop();
    const low = range[0];
    const high = range[1];
    const highestMap = nextMap.reduce((acc, [_, source, range]) => {
      return Math.max(+source + +range, acc);
    }, 0);
    const lowestMap = nextMap.reduce((acc, [_, source, range]) => {
      return Math.min(+source, acc);
    }, Infinity);
    while (ranges.length) {
      if (low < lowestMap && high > highestMap) {
        newRanges.push([low, lowestMap]);
        newRanges.push([highestMap, high]);
        newRanges.push([lowestMap, highestMap]);
      }
      if (low < lowestMap && high !== highestMap) {
        newRanges.push([low, lowestMap]);
        newRanges.push([lowestMap, high]);
      }
      if (high > highestMap && low !== lowestMap) {
        newRanges.push([low, highestMap]);
        newRanges.push([highestMap, high]);
      }
      break;
    }
    const pair = [mapsOnto(low, nextMap), mapsOnto(high, nextMap)];
    pair.sort();
    newRanges.push(pair);
    console.log(newRanges);
    return newRanges;
  }
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
  const seeds = mappings["seeds"];

  for (const seed of seeds) {
    let currentState = seed;
    for (const map of mapOrder) {
      currentState = mapsOnto(currentState, mappings[map]);
    }
    lowest = Math.min(currentState, lowest);
  }
  console.log(lowest);
}
function part2() {
  const mappings = parseMappings(input);
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
  const seeds = mappings["seeds"];
  let ranges = seeds.reduce((pairs, current, i) => {
    if (i % 2 === 0) {
      pairs.push([+current, +seeds[i + 1] + +current]);
    }
    return pairs;
  }, []);

  for (let range of ranges) {
    console.log(range);
    for (const map of mapOrder) {
      range = rangeMapping([range], mappings[map]);
      lowest = Math.min(...range.map((range) => range[0]));
    }
  }
  console.log(lowest);
}
console.time("part-1");
part1();
console.timeEnd("part-1");

console.time("part-2");
part2();
console.timeEnd("part-2");
