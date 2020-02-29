var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');

// official site
var indexRouter = require('./routes/index');
var introRouter = require('./routes/intro')
// function
var menuRouter = require('./routes/menu');
var usersRouter = require('./routes/users');
var walletRouter = require('./routes/wallet');
var gameRouter = require('./routes/game');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// use cookie / session ??
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
  // use session store???
  // mongodb or onedb ??
  // store : new FileStore()
}));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/intro', introRouter);
app.use('/menu', menuRouter);
app.use('/users', usersRouter);
app.use('/wallet', walletRouter);
app.use('/game', gameRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
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
