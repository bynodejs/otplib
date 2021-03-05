'use strict';

const createError = require('http-errors');
const config = require('config');
const express = require('express');
const logger = require('morgan');
const app = express();

console.log('====================');
console.log('=== server start ===');
console.log(`=== ${config.get('env')} ===`);
console.log('====================');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', require('./routes/users.route'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.error('[ERROR]', err);

  // send the error code
  res.sendStatus(err.status || 500);
});

module.exports = app;
