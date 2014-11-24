var express = require('express'),
    router = express.Router(),
    incident = require('../handlers/incident'),
    article = require('../handlers/article'),
    incidentTypes = require('../handlers/incident-types');

router.route('/articles')
    .get(article.getAll);
// .put(incident.updateWine)
// .delete(incident.deleteWine)

// router.route('/incident')
//     .get(incident.getAll)
//     .post(incident.addIncident);

router.route('/temp/articles')
    .get(article.temp.getAll)
    .post(article.temp.addArticle);
//  .delete(article.temp.removeAll)

// router.route('/temp/article/:id')
//  .delete(article.temp.removeById);
//  .put(article.temp.refreshById);

router.route('/incident-types')
    .get(incidentTypes.getTypes);

module.exports = router;
