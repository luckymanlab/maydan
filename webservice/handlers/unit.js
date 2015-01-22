var mongoose = require('../connect'),
    models = require('../models');

/**
 * Get all approved units from DB
 *
 * @param {object} req request
 * @param {object} res response
 */
exports.getAll = function(req, res) {
    models.unit.find(function(err, data) {
        if(err) {
            res.send(err);
            console.log(err);
        } else {
            res.send(data);
        }
    });
}

/**
 * Get units from DB according to id
 *
 * @param {object} req request
 * @param {object} res response
 */
exports.getById = function(req, res) {
    models.unit.findOne(req.query.id, function(err, data) {
        console.log("Id is" , req.query.id);
        if(err) {
            res.send(err);
            console.log(err);
        } else {
            res.send(data);
        }
    });
}

/**
 * Get units from DB according to time range
 *
 * @param {object} req request
 * @param {object} res response
 */
exports.getByRange = function(req, res) {
    var query={};
    query.time = {};
    if (req.query.startDate) {
        query.time.$gte =  new Date(req.query.startDate).getTime();
    }
    if (req.query.endDate) {
        query.time.$lte = new Date(req.query.endDate).getTime();
    }
    models.unit.find(query, function(err, data) {
        if(err) {
            res.send(err);
            console.log(err);
        } else {
            res.send(data);
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
        res.send({ res: false, err: 'invalid parameters' });
    }
}

exports.updateUnit = function(req, res) {}

exports.deleteUnit = function(req, res) {
    var id = req.params.id;
    console.log('Deleting unit: ' + id);
    models.unit.remove({_id: id}, function(err) {
        if(err) {
            res.send(err);
            console.log(err);
        } else {
            res.send('success');
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
            res.send(err);
            console.log(err);
        } else {
            console.log('Incident successfull saved');
        }
    });
}


