//Configuration object
var Config = {
    //facebook options
    appID: '1525144001089909',
    appSecret: '9376d28767128cd79900353019413bc2',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    //connect options
    mongoDBUrl: 'mongodb://localhost/maydan',
    mongoDBOptions: {
        user: 'padawan',
        pass: '123123'
    }
};

module.exports = Config;