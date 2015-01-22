//Configuration object
var Config = {
    //passport options
    clientID: '1525144001089909',
    clientSecret: '9376d28767128cd79900353019413bc2',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    //connect options
    mongooseUrl: 'mongodb://localhost/maydan',
    mongooseOptions: {
        user: 'padawan',
        pass: '123123'
    }
};

module.exports = Config;