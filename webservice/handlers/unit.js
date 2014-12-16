var mongoose = require('../configs/connect'),
    models = require('../configs/models');

exports.getAll = function(req, res) {
    models.unit.find(function(err, data) {
        if(err) {
            console.log(err);
            res.send(err);
        }
        res.send(data);
    });
}

exports.getById = function(req, res) {
    var id = req.params.id;
    models.unit.find({_id: id}, function(err, data) {
        if(err) {
            console.log(err);
        } else if(data) {
            res.send(data)
        } else {
            res.send(false)
        }
    });
}

exports.addUnit = function(req, res) {
    var unit = req.body;
    console.log('Adding unit: ' + JSON.stringify(unit));

    if(unit.time && unit.type && unit.coordinates && unit.title) {
        var newUnit = new models.unit({
            time: 0,
            type: 'fire',
            coordinates: {
                lat: 50.450201,
                lon: 50.450201
            },
            title: ''
        });

        newUnit.save(function(err, newIncident) {
            if(err) {
                console.log(err);
            }
            console.log('Saved');
            res.send(true);
        });
    } else {
        res.send({res: false, err: 'invalid parameters'});
    }
}

exports.updateUnit = function(req, res) {}

exports.deleteUnit = function(req, res) {
    var id = req.params.id;
    console.log('Deleting unit: ' + id);
    models.unit.remove({_id: id}, function(err) {
        if(err) {
            console.log(err);
        }
    });
}

exports.confirm = function(id, data) {
    var newUnit = new models.unit({
        _id: id,
        coordinates: {
            lat: data.coordinates.lat,
            lon: data.coordinates.lon
        },
        title: data.title,
        unitType: data.unitType,
        time: data.time
    });

    newUnit.save(function(err, data) {
        if(err) {
            console.log(err);
        }
        console.log('Incident successfull saved');
    });
}