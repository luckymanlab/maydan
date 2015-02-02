var configs = require('../configs/config'),
    FB = require('fb');

exports.detectUser = function(req, res, next) {
    if(req.headers['x-fb-token']) {
        FB.options({
            'appSecret': configs.appSecret,
            'appId': configs.appID,
            'accessToken': req.headers['x-fb-token']
        });

        FB.api('me', function (res) {
            if(res) {
                console.log('FB user detected. User id: ', res.id);
                req.user = res;
                next();
            } else {
                console.log('Authorization error');
                next();
            }
        });
    } else {
        console.log('x-fb-token missed');
        next();
    }
};