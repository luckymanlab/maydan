var mongoose = require('../db/db-configs');

var date = new Date();

var articleTempSchema = mongoose.Schema({
    media: {
        content: { type: String, required: true }
    },
    incident: {
        time: {type: Number, min: 0, max: date.getTime()},
        incidentType: {type: String, enum: ['']},
        coordinates: {
            lat: {type: Number, min: 0},
            lon: {type: Number, min: 0}
        }, 
        title: String
    }
});
var ArticleTemp = mongoose.model('ArticleTemp', articleTempSchema);

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