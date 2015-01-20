var mongoose = require('mongoose'),
    Config = require('./configs/config'),
    url = Config.mongooseUrl,
    options = Config.mongooseOptions;

mongoose.connect(url, options, function(err) {
    if(err) {
        console.log('Error in connection to db');
        throw err
    }
    console.log('Mongodb successful connected!');
});

module.exports = mongoose;