var mongoose = require('../db/db-configs'),
    schemas = require('../db/schemas');

var ArticleTemp = mongoose.model('ArticleTemp', schemas.articleTempSchema);

exports.addArticle = function(req, res) {
    var article = req.body;
    console.log('Adding article into temp: ' + JSON.stringify(article));

    if(typeof article.media.content === undefined || typeof article.incident.time === undefined || typeof article.incident.type === undefined || article.incident.coordinates.lat === undefined || article.incident.coordinates.lon === undefined || article.incident.title === undefined) {
        res.status(400).res('Requested data is invalid');
        throw "Bad request"
    }

    var newArticle = new ArticleTemp({
        media: {
            content: article.media.content
        },
        incident: {
            time: article.incident.time,
            incidentType: article.incident.type,
            coordinates: {
                lat: article.incident.coordinates.lat,
                lon: article.incident.coordinates.lon
            },
            title: article.incident.title
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
        if(err) throw err
        res.send(data);
    })
}