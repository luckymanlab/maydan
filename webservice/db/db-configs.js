var mongoose = require('mongoose'),
    url = 'mongodb://localhost/maydan';

mongoose.connect(url, function(err) {
    if(err) {
        console.log('There was error in connection to "' + url + '"!');
    } else {
        console.log('Mongodb successful connected!');
    }
});

//Whene db will have pass and user, we'll uncomment this:
//var options = {
//  user: 'userName',
//  pass: 'userPass'
//}
//mongoose.connect(url, options, callback);

module.exports = mongoose;