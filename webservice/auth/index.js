var configs = require('../configs/config'),
    FB = require('fb'),
    NodeCache = require( "node-cache" ),
    myCache = new NodeCache();

function setFBOptions(accessToken) {
    FB.options({
        'appSecret': configs.appSecret,
        'appId': configs.appID,
        'accessToken': accessToken
    });
}

function getUserInform(req, res, callback) {
     var token = req.headers['x-fb-token'];
     if(token) {
        myCache.get(token, function(err, cacheValue) {
            if(!err && Object.keys(cacheValue).length > 0) {
                req.user = cacheValue[token];
                callback('user');
            } else {
                setFBOptions(token);
                FB.api('me', function (fbRes) {
                    if(fbRes) {
                        var ttl = 1000 * 60 * 60 * 4 // 4 hour
                        myCache.set(token, fbRes, ttl);
                        req.user = fbRes;
                        callback('user');
                    } else {
                        callback('guest');
                    }
                });
            }
        });
     } else {
        callback(false);
     }
}

exports.checkAccess = function(req, res, next, suggested, callback) {
    getUserInform(req, res, function(status) {
        if(status === suggested) {
            callback(req, res, next);
        } else {
            res.status(403).send('No permissions');
        }
    });
}