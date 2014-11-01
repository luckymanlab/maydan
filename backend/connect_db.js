var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db;

exports.BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('maydan', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'maydan' database");
        db.collection('articles', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'articles' collection doesn't exist. Creating it with sample data...");
            }
        });

    }
});




