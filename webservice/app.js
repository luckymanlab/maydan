var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    passport = require('passport'),
    cors = require('cors'),
    session = require('express-session'),
    router = require('./routes/index'),
    auth = require('./routes/auth');

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger('dev'));
app.use(session({secret: 'a4f8071f-c873-4447-8ee2'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '../ui')));

app.use('/', router);
app.use('/auth', auth);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = app;