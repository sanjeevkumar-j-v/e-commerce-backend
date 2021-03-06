var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts = require("express-ejs-layouts");
var cors = require('cors');
const db = require("./config/mongoose");
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require("connect-mongo");

var indexRouter = require('./routes/index');

var app = express();

app.use(cors());
app.use(expressLayouts);

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// // mongo strore is used to store session cookie
app.use(
  session({
    secret: "blahblah",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    //     store: new MongoStore(
    //       {
    //         mongooseConnection: db,
    //         autoRemove: "disabled",
    //       },
    //       function (err) {
    //         console.log(err || "connect-mongodb setup ok");
    //       }
    //     ),
    store: MongoStore.create({
      mongoUrl:
        "mongodb://localhost/sweet_tooth_store"
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/', indexRouter);

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
