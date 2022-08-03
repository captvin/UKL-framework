var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var routes = require('./routes')
var errorHandler = require('./middlewares/errorHandler')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(routes)

app.use(errorHandler)

module.exports = app;