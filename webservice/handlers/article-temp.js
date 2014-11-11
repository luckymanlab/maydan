var mongoose = require('../db/db-configs'),
    schemas = require('../db/schemas');

var ArticleTemp = mongoose.model('ArticleTemp', schemas.articleTempSchema);

exports.addArticle = function(req, res) {
    var article = req.body;
    console.log('Adding article into temp: ' + JSON.stringify(article));

    var newArticle = new ArticleTemp({
        media: {
            content: article.mediaContent
        },
        incident: {
            time: article.incidentTime,
            incidentType: article.incidentType,
            coordinates: {
                lat: article.incidentCoordinatesLat,
                lon: article.incidentCoordinatesLon
            },
            title: article.incidentTitle
        }
    });

    newArticle.save(function(err, data) {
        if(err) {
            res.send({
                message: 'Error',
                err: err
            })
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