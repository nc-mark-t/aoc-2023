const {
  getFirstDigit,
  getLastDigit,
  getFirstNumber,
  getLastNumber,
} = require("../solutions/day-1");
const { assert } = require("./test-utils");

const test1 = getFirstDigit("asd1dfdf2");
const test2 = getLastDigit("123djsfhdsfh2klasfd");
const test3 = getFirstNumber("abthreejds12lkds");
const test4 = getLastNumber("abjds12lkoneds");
const test5 = getLastNumber("a1jtwo12lkoneds");
const test6 = getLastNumber("abjds12lkoned2s");

assert(getFirstNumber("sevenine"), "7");
assert(getLastNumber("sevenine"), "9");
assert(getFirstNumber("two1nine"), "2");
assert(getFirstNumber("eightwothree"), "8");
assert(getFirstNumber("abcone2threexyz"), "1");
assert(getFirstNumber("xtwone3four"), "2");
assert(getFirstNumber("4nineeightseven2"), "4");
assert(getFirstNumber("zoneight234"), "1");
assert(getFirstNumber("7pqrstsixteen"), "7");
assert(getLastNumber("two1nine"), "9");
assert(getLastNumber("eightwothree"), "3");
assert(getLastNumber("abcone2threexyz"), "3");
assert(getLastNumber("xtwone3four"), "4");
assert(getLastNumber("4nineeightseven2"), "2");
assert(getLastNumber("zoneight234"), "4");
assert(getLastNumber("7pqrstsixteen"), "6");
assert(test1, "1");
assert(test2, "2");
assert(test3, "3");
assert(test4, "1");
assert(test5, "1");
assert(test6, "2");
