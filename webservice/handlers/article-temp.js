var mongoose = require('../db/connect'),
    schemas = require('../db/schemas'),
    media = require('./media'),
    incident = require('./incident');
var ArticleTemp = mongoose.model('ArticleTemp', schemas.articleTempSchema);

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
        || typeof article.user_id === undefined
    ) {
        res.status(400).res('Requested data is invalid');
        throw "Bad request"
    }

    var newArticle = new ArticleTemp({
        user_id: article.user_id,
        media: {
            content: article.media.content
        },
        incident: {
            time: article.unit.time,
            incidentType: article.unit.type,
            coordinates: {
                lat: article.unit.coordinates.lat,
                lon: article.unit.coordinates.lon
            },
            title: article.unit.title
        }
    });

    newArticle.save(function(err, data) {
        if(err) {
            res.status(400).send(err);
            throw err
        }
        res.send('Success');
    });
}

exports.getAll = function(req, res) {
    ArticleTemp.find(function(err, data) {
        if(err) throw err;
        res.send(data);
    })
}

exports.removeById = function(req, res) {
    var id = req.params.id;
    ArticleTemp.remove({ _id: id }, function (err) {
        if (err) return handleError(err);
        console.log('Deleting article: ' + id);
        res.send('Success');
    });
}

exports.confirm = function(req, res) {
    var id = req.params.id;
    console.log('Confirm: ' + id);
    ArticleTemp.find({_id: id}, function(err, data) {
        if(err) console.log(err);
        var id = media.confirm(data[0].media, function(id) {
            incident.confirm(id, data[0].incident);
        });
    });
    ArticleTemp.remove({_id: id}, function(err) {
        if(err) console.log(err);
        res.send('success');
    });
}

exports.update = function(req, res) {}