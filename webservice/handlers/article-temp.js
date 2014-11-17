var mongoose = require('../db/connect'),
    schemas = require('../db/schemas');

var ArticleTemp = mongoose.model('ArticleTemp', schemas.articleTempSchema);

exports.addArticle = function(req, res) {
    var article = req.body;
    console.log('Adding article into temp: ' + JSON.stringify(article));

    if(!article.media.content || !article.incident.time || !article.incident.type || !article.incident.coordinates.lat || !article.incident.coordinates.lon || !article.incident.title) {
        res.status(400).end();
        throw "Bad request"
    } else {
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
}

exports.getAll = function(req, res) {
    ArticleTemp.find(function(err, data) {
        if(err) throw err
        res.send(data);
    })
}