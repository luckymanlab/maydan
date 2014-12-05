var mongoose = require('../db/connect'),
    schemas = require('../db/schemas');
var Media = mongoose.model('Media', schemas.mediaSchema);

exports.confirm = function(data, callback) {
    var newMedia = Media({
        content: data.content
    });
    newMedia.save(function(err, data) {
        if(err) console.log(err);
        console.log('Media successfull saved');
    });
    callback(newMedia._id);
}

exports.getAll = function(req, res) {
    Media.find(function(err, data) {
        if(err) {
            console.log(err);
        } else {
            res.send(data);
        }
    });
}