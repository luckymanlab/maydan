var connectDB = require('../connect_db');

exports.getAll = function(req, res) {
    db.collection('articles', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
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