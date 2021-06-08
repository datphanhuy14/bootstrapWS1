const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const nunjucks = require('nunjucks');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const redis = require('redis')
const session = require('express-session')
const app = express();

const REDIS_PORT = process.env.PORT || 6379;

let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient(REDIS_PORT)

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    saveUninitialized: false,
    secret: 'Zesx',
    resave: true,
  })
)
// CHECK REDIS CONNECT
redisClient.on('connect', function() {
  console.log('connected');
  });
// view engine setup

nunjucks.configure('views', {
    autoescape: true,
    express: app
});


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  if (!req.session.key){
    console.log('false')
    req.session.key = [];
  }else{
    console.log('Have Key :TRUE')
  }
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // console.log('mmmmmm')
  if (!req.session.key){
    console.log('false')
    req.session.key = [];
  }else{
    console.log('TRUE')
  }
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
