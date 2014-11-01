//var http = require('http'),
//    url = require('url');
//
//var server = http.Server();
//server.listen(1337, '127.0.0.1');
//
//server.on('request', function(req, res){
//    debugger;
//    var i =1;
//    var parsedUrl = url.parse(req.url);
//    console.log(parsedUrl);
//    res.end('Connect')
//});

var express = require('express'),
    incident = require('./routes/incident'),
    article = require('./routes/article');

var app = express();

//app.configure(function () {
//    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
//    app.use(express.bodyParser());
//});

app.get('/incident', incident.getAll);
app.get('/incident/:id', incident.getById);

app.get('/article', article.getAll);
app.get('/article/:id', article.getById);


//app.post('/incident', incident.addWine);
//app.put('/incident/:id', incident.updateWine);
//app.delete('/incident/:id', incident.deleteWine);

app.listen(3000);
console.log('Listening on port 3000...');