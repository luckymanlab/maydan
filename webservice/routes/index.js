var express = require('express'),
    router = express.Router(),
    subRoutes = {
        article: require('./articles'),
        unit: require('./unit'),
        media: require('./media'),
        unitTypes: require('./unit-types'),
        setRoutes: function() {
            this.article.setRoutes(router);
            this.unit.setRoutes(router);
            this.media.setRoutes(router);
            this.unitTypes.setRoutes(router);
        }
    };

subRoutes.setRoutes();

module.exports = router;