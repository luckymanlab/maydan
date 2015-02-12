var media = require('../handlers/media');

exports.setRoutes = function(router) {
    router.route('/media')
        .get(media.getAll);
}