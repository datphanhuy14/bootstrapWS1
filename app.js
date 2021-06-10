const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const nunjucks = require("nunjucks");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const redis = require("redis");
var client = redis.createClient();
// const session = require('express-session')
const app = express();

// let RedisStore = require('connect-redis')(session)

var idList = [];
var listValue = [];
// view engine setup
app.set("view engine", "html");
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

client.on("error", function (error) {
  console.error(error);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  if (err) {
    console.log("false");
  } else {
    console.log(err);
  }
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error", { err: err.message });
});
module.exports = app;
