var createError   = require('http-errors');
var express       = require('express');
var session       = require('express-session');
var path          = require('path');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var logger        = require('morgan');
var flash         = require('connect-flash');
// TODO: Flash not showing up?

var app           = express();

var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Configure passport
require('./config/passport')(passport);

// Create session for passport
app.use(session({ secret : 'BNfoPKiVQKnQBVXtEbGy', cookie: { maxAge : 1000*60*60*24 } }));
app.use(passport.initialize());
app.use(passport.session()); // Persistent login sessions
app.use(flash());            // Flash messages stored in session

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));  // Log all requests to console
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use(cookieParser()); // Read cookies (for auth)
app.use(bodyParser());   // Get information from HTML forms
app.use(express.static(path.join(__dirname, 'public')));

// Create routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users')(app, passport);

// Use routers
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error   = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
