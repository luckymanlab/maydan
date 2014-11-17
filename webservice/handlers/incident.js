var mongoose = require('../db/connect'),
    schemas = require('../db/schemas');

var Incident = mongoose.model('Incident', schemas.incidentSchema);

exports.getAll = function(req, res) {
    Incident.find(function(err, data) {
        if(err) throw err
        res.send(data);
    });
};

exports.getById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving incident: ' + id);
    Incident.find({_id: id}, function(err, data) {
        if(err) throw err
        if(data) res.send(data)
        if(!data) res.send(false)
    })
};

exports.addIncident = function(req, res) {
    var incident = req.body;
    console.log('Adding incident: ' + JSON.stringify(incident));

    if(incident.time && incident.type && incident.coordinates && incident.title) {
        var newIncident = new Incident({
            time: 0,
            type: 'fire',
            coordinates: {
                lat: 50.450201,
                lon: 50.450201
            },
            title: ''
        });

        newIncident.save(function(err, newIncident) {
            if(err) throw err
            console.log('Saved');
            res.send(true);
        });
    } else {
        res.send({res: false, err: 'invalid parameters'});
    }
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

exports.deleteIncident = function(req, res) {
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
//Populate database with sample data -- Only used once: the first time the application is started.
//You'd typically not find this code in a real-life app, since the database would already exist.
//var populateDB = function() {
//
// var newIncident = new Incident({
//  time: 0,
//  type: 'fire',
//  coordinates: {
//    lat: 50.450201,
//    lon: 50.450201
//  },
//  title: ''
// });
// 
// newIncident.save(function(err, newIncident) {
//  if(err) throw err
//  console.log('Saved');
// })
//
//
//};