const express = require("express");
const { handleIpt } = require("./helpers");
const ExpressError = require("./expressError");
const app = express();

app.get("/", function (req, res, next) {
    let result = `    
    <form>
    <input type="text" name="nums" />
    <button type="submit" formaction="/mode">Mode</button>
    <button type="submit" formaction="/median">Median</button>
    <button type="submit" formaction="/median">Mean</button>
    <button type="submit" formaction="/all">All</button>
  </form>`

    return res.send(result);
  });

app.get("/mean", function (req, res, next) {
  let result = handleIpt(req.query.nums, "mean");
  return res.send(result);
});

app.get("/median", function (req, res, next) {
  let result = handleIpt(req.query.nums, "median");
  return res.send(result);
});

app.get("/mode", function (req, res, next) {
  let result = handleIpt(req.query.nums, "mode");
  return res.send(result);
});

app.get("/all", function (req, res, next) {
  let result = handleIpt(req.query.nums, "all");
  return res.send(result);
});

app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});

app.use(function (err, req, res, next) {
  let status = err.status || 500;
  let message = err.message;

  return res.json({
    error: { message, status },
  });
});

app.listen(3000, function () {
  console.log("App on port 3000");
});

