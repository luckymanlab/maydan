var mongoose = require('../configs/connect'),
    models = require('../configs/models'),
    media = require('./media'),
    unit = require('./unit'),
    https = require('https');

exports.addArticle = function(req, res) {
    var article = req.body;
    console.log('Adding article into temp: ' + JSON.stringify(article));

    if(
        typeof article.media.content === undefined
        || typeof article.unit.time === undefined
        || typeof article.unit.type === undefined
        || typeof article.unit.coordinates.lat === undefined
        || typeof article.unit.coordinates.lon === undefined
        || typeof article.unit.title === undefined
        || typeof article.creatorId === undefined
    ) {
        res.status(400).res('Requested data is invalid');
        console.log('Bad request');
    }
    var access_token = article.accessToken;
    var buffer = '';
    var request = https.get("https://graph.facebook.com/me?access_token=" + access_token,
        function(result){
            result.setEncoding('utf8');
            result.on('data', function(chunk){
                buffer += chunk;
            });
            
            result.on('end', function(){
                var newArticle = new models.articleTemp({
                    media: {
                        content: article.media.content
                    },
                    unit: {
                        time: article.unit.time,
                        unitType: article.unit.type,
                        coordinates: {
                            lat: article.unit.coordinates.lat,
                            lon: article.unit.coordinates.lon
                        },
                        title: article.unit.title
                    },
                    creatorId: JSON.parse(buffer).id
                });

                newArticle.save(function(err, data) {
                    if(err) {
                        res.status(400).send(err);
                        console.log(err);
                    } else {
                        res.send('Success');
                    }
                });
            });
    });
},

exports.getAll = function(req, res) {
    models.articleTemp.find(function(err, data) {
        if(err) {
             console.log(err);
             res.send(err);
        } else {
            res.send(data);
        }
    });
},

exports.removeById = function(req, res) {
    var id = req.params.id;
    models.articleTemp.remove({ _id: id }, function (err) {
        if(err) {
            console.log(err);
            res.send(err);
        } else {
            console.log('Deleting article: ' + id);
            res.send('Success');
        }
    });
},

exports.confirm = function(req, res) {
    var id = req.params.id;
    console.log('Confirm: ' + id);
    models.articleTemp.find({ _id: id }, function(err, data) {
        if(err) {
            console.log(err);
            res.send(err);
        } else {
            var id = media.confirm(data[0].media, function(id) {
                unit.confirm(id, data[0].unit);
            });
        }
    });
    models.articleTemp.remove({_id: id}, function(err) {
        if(err) {
            console.log(err);
            res.send(err);
        } else {
            res.send('success');
        }
    });
}

exports.update = function(req, res) {}