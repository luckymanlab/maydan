var mongoose = require('../configs/connect'),
    models = require('../configs/models');

exports.confirm = function(data, callback) {
    var newMedia = models.media({
        content: data.content
    });
    newMedia.save(function(err, data) {
        if(err) {
            console.log(err);
        }
        console.log('Media successfull saved');
    });
    callback(newMedia._id);
}

exports.getAll = function(req, res) {
    models.media.find(function(err, data) {
        if(err) {
            console.log(err);
        } else {
            res.send(data);
        }
    });
}