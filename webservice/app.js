var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    cors = require('cors'),
    router = require('./routes/index'),
    auth = require('./auth'),
    app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger('dev'));

app.use(express.static(path.join(__dirname, './public')));
app.use('/', router);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = app;