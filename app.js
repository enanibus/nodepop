'use strict';

let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

let routes = require('./routes/index');

// Database connection
require('./lib/connectDatabase');
// Models
require('./models/Anuncio');
require('./models/Usuario');
require('./models/Token');
require('./models/Tag');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  req.lang = req.get('x-lang') || 'en';
  next();
});



app.use('/', require('./routes/index'));

// API routes
app.use ('/images/anuncios', express.static (__dirname + '/public/images/anunc' +
    'ios'));
app.use('/api/v1/anuncios', require('./routes/api/v1/anuncios'));
app.use('/api/v1/usuarios', require('./routes/api/v1/usuarios'));
app.use('/api/v1/pushtokens', require('./routes/api/v1/pushtokens'));
app.use('/api/v1/tags', require('./routes/api/v1/tags'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
