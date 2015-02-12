var unitTypes = require('../handlers/unit-types');

exports.setRoutes = function(router) {
    router.route('/unit-types')
        .get(unitTypes.getTypes);
}