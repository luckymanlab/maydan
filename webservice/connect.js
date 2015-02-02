var mongoose = require('mongoose'),
    Config = require('./configs/config'),
    url = Config.mongoDBUrl,
    options = Config.mongoDBOptions;

mongoose.connect(url, options, function(err) {
    if(err) {
        console.log('Error in connection to db');
        throw err
    }
    console.log('Mongodb successful connected!');
});

module.exports = mongoose;