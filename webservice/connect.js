var mongoose = require('mongoose'),
    сonfig = require('./getConfigs'),
    url = сonfig.mongoDBUrl,
    options = сonfig.mongoDBOptions;

mongoose.connect(url, options, function(err) {
    if(err) {
        console.log('Error in connection to db');
        throw err
    }
    console.log('Mongodb successful connected!');
});

module.exports = mongoose;