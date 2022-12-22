const ExpressError = require("./expressError");

function handleIpt(strArr, op) {
  if (strArr.length < 1) {
    throw new ExpressError("nums are required.", 400);
  }
  let numStrs = strArr.split(",");
  let nums = parseNums(numStrs);
  if (typeof nums === "string") {
    throw new ExpressError(nums, 400);
  }
  let answer;
  if (op === "mean") {
    answer = getMean(nums);
    return formatRes(answer, op)
  } else if (op === "mode") {
    answer = getMode(nums);
    return formatRes(answer, op)
  } else if (op === "median") {
    answer = getMedian(nums);
    return formatRes(answer, op)
  } else {
    return (response = {
        operation: "all",
        mean: getMean(nums),
        median: getMedian(nums),
        mode: getMode(nums)
      });
  }
}

function parseNums(arr) {
  let nums = [];
  for (let i = 0; i < arr.length; i++) {
    let num = parseInt(arr[i]);
    if (Number.isNaN(num)) {
      return `${arr[i]} is not a number`;
    }
    nums.push(num);
  }
  return nums;
}

function formatRes(res, op) {
  return (response = {
    operation: op,
    value: res,
  });
}

function getMean(nums) {
    if (nums.length < 1) return 0
  return parseFloat((nums.reduce((prev, curr) => prev + curr) / nums.length).toFixed(2));
}

function getMedian(nums) {
  nums.sort((a, b) => a - b);
  let middleIdx = Math.floor(nums.length / 2);
  if (nums.length % 2 === 0) {
    console.log('hit')
    return (nums[middleIdx] + nums[middleIdx - 1]) / 2;
  } else {
    return nums[middleIdx];
  }
}

function getMode(nums) {
  let freqObj = nums.reduce((prev, curr) => {
    prev[curr] = (prev[curr] || 0) + 1;
    return prev;
  }, {});
  let count = 0;
  let mode;
  for (let key in freqObj) {
    if (freqObj[key] > count) {
      mode = key;
      count = freqObj[key];
    }
  }
  return +mode;
}

module.exports = {
  parseNums,
  formatRes,
  getMean,
  getMedian,
  handleIpt,
  getMode
};
