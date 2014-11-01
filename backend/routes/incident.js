var connectDB = require('../connect_db');

exports.getAll = function(req, res) {
    db.collection('incidents', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};


exports.getById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving incident: ' + id);
    db.collection('incidents', function(err, collection) {
        collection.findOne({'_id':new connectDB.BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.addIncident = function(req, res) {
    var incident = req.body;
    console.log('Adding incident: ' + JSON.stringify(incident));
    db.collection('incidents', function(err, collection) {
        collection.insert(incident, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateIncident = function(req, res) {
    var id = req.params.id;
    var incident = req.body;
    console.log('Updating incidents: ' + id);
    console.log(JSON.stringify(incident));
    db.collection('incidents', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, incident, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating wine: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(incident);
            }
        });
    });
}

exports.deleteWine = function(req, res) {
    var id = req.params.id;
    console.log('Deleting incident: ' + id);
    db.collection('incidents', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
//var populateDB = function() {
//
//    var wines = [
//        {
//            name: "CHATEAU DE SAINT COSME",
//            year: "2009",
//            grapes: "Grenache / Syrah",
//            country: "France",
//            region: "Southern Rhone",
//            description: "The aromas of fruit and spice...",
//            picture: "saint_cosme.jpg"
//        },
//        {
//            name: "LAN RIOJA CRIANZA",
//            year: "2006",
//            grapes: "Tempranillo",
//            country: "Spain",
//            region: "Rioja",
//            description: "A resurgence of interest in boutique vineyards...",
//            picture: "lan_rioja.jpg"
//        }];
//
//    db.collection('wines', function(err, collection) {
//        collection.insert(wines, {safe:true}, function(err, result) {});
//    });
//
//};