var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    router = require('./routes/index');

var app = express();

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, '../ui')));

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = app;
