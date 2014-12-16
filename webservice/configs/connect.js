var mongoose = require('mongoose'),
    url = 'mongodb://localhost/maydan';

var options = {
    user: 'padawan',
    pass: '123123'
};

mongoose.connect(url, options, function(err) {
    if(err) {
        console.log('Error in connection to db');
        throw err
    }
    console.log('Mongodb successful connected!');
});

module.exports = mongoose;