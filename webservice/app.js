//var http = require('http'),
//    url = require('url');
//
//var server = http.Server();
//server.listen(1337, '127.0.0.1');
//
// server.on('request', function(req, res){
//    debugger;
//    var i =1;
//    var parsedUrl = url.parse(req.url);
//    console.log(parsedUrl);
//    res.end('Connect')
// });

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

//app.configure(function () {
//    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
//    app.use(express.bodyParser());
//});

module.exports = app;