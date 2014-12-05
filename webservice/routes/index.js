var express = require('express'),
    router = express.Router(),
    incident = require('../handlers/incident'),
    media = require('../handlers/media'),
    article = require('../handlers/article'),
    incidentTypes = require('../handlers/incident-types');

router.route('/articles')
    .get(article.getAll);
// .put(incident.updateWine)
// .delete(incident.deleteWine)

router.route('/incident')
    .get(incident.getAll)
    .post(incident.addIncident);

router.route('/media')
    .get(media.getAll);

router.route('/temp/articles')
    .get(article.temp.getAll)
    .post(article.temp.addArticle);
//  .delete(article.temp.removeAll)

router.route('/temp/article/:id')
    .delete(article.temp.removeById)
    .put(function(req, res) {
        if(req.body.type) {
            if(req.body.type === 'confirm') {
                article.temp.confirm(req, res);
            } else if (req.body.type === 'update') {
                article.temp.update(req, res);
            }
        }
    });

router.route('/incident-types')
    .get(incidentTypes.getTypes);

module.exports = router;