var auth = require('./user-info'),
    permissionGraduation = [
        'guest',
        'user',
        'admin',
        'root'
    ];

exports.checkAccess = function(req, res, next, suggested, callback) {
    auth.getUserInform(req, res, function() {
        if(permissionGraduation.indexOf(req.user.permissions) >= permissionGraduation.indexOf(suggested)) {
            callback(req, res, next);
        } else {
            res.status(403).send('No permissions');
        }
    });
}