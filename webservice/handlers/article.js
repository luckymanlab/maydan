var mongoose = require('../db/db-configs'),
    temp = require('./article-temp'),
    schemas = require('../db/schemas');

var Article = mongoose.model('Article', schemas.articleSchema);

exports.getAll = function(req, res) {
    Article.find(function(err, data) {
        if(err) throw err
        res.send(data);
    })
};

exports.getById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving article: ' + id);
    db.collection('articles', function(err, collection) {
        collection.findOne({'_id':new connectDB.BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.temp = temp;