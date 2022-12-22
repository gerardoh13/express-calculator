const { getMean, getMedian, getMode, parseNums } = require("./helpers");

describe("#getMedian", () => {
  it("finds the median of an even set", () => {
    expect(getMedian([1, -1, 4, 2])).toEqual(1.5);
  });
  it("finds the median of an odd set", function () {
    expect(getMedian([1, -1, 4])).toEqual(1);
  });
});

describe("#getMean", () => {
  it("finds the mean of an empty array", () => {
    expect(getMean([])).toEqual(0);
  });
  it("finds the mean of an array of numbers", () => {
    expect(getMean([1, -1, 4, 2])).toEqual(1.5);
  });
});

describe("#findMode", () => {
  it("finds the mode", () => {
    expect(getMode([1, 1, 1, 2, 2, 3])).toEqual(1);
  });
});

describe("#parseNums", () => {
  it("converts array of strings to numbers", () => {
    expect(parseNums(["1", "3", "5", "7"])).toEqual([1, 3, 5, 7]);
    expect(parseNums(["1", "3", "5", "foo"])).toEqual("foo is not a number");
  });
});
