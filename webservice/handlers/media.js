var mongoose = require('../connect'),
    models = require('../models');

exports.confirm = function(data, callback) {
    var newMedia = models.media({
        content: data.content
    });
    newMedia.save(function(err, data) {
        if(err) {
            res.send(err);
            console.log(err);
        } else {
            console.log('Media successfull saved');
        }
    });
    callback(newMedia._id);
}

exports.getAll = function(req, res) {
    models.media.find(function(err, data) {
        if(err) {
            res.send(err);
            console.log(err);
        } else {
            res.send(data);
        }
    });
}