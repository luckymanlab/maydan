var configs = require('../getConfigs'),
    FB = require('fb'),
    NodeCache = require('node-cache'),
    myCache = new NodeCache(),
    fs = require('fs');

function setFBOptions(accessToken) {
    FB.options({
        'appSecret': configs.appSecret,
        'appId': configs.appID,
        'accessToken': accessToken
    });
}

function setUserInfo(req, profile, callback) {
    checkUserPermissions(profile, function(permissions) {
        var user = {
                profile: profile,
                permissions: permissions
            },
            ttl = 1000 * 60 * 60 * 2; // 2 hour

        myCache.set(req.headers['x-fb-token'], user, ttl);
        req.user = user;
        callback(user);
    });
}

function checkUserPermissions(profile, callback) {
    getAdminsList(function(adminsList) {
        for(var i = 0; i < adminsList.length; i++) {
            if(profile.id = adminsList[i]) {
                callback('admin');
                return
            }
        }
        callback('user');
    });
}

function getAdminsList(callback) {
    fs.readFile('./data/admins-list.json', {encoding: 'utf-8'}, function(err, adminsList) {
         if(err) {
            callback(false);
            console.log(err);
        } else {
            callback(JSON.parse(adminsList));
        }
    });
}

exports.getUserInform = function(req, res, callback) {
     var token = req.headers['x-fb-token'];
     if(token) {
        myCache.get(token, function(err, cacheValue) {
            if(!err && Object.keys(cacheValue).length > 0) {
                req.user = cacheValue[token];
                callback();
            } else {
                setFBOptions(token);
                FB.api('me', function (fbRes) {
                    if(fbRes) {
                        setUserInfo(req, fbRes, callback);
                    } else {
                        setUserInfo(req, null, callback);
                    }
                });
            }
        });
     } else {
        callback();
     }
}