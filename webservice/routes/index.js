var express = require('express'),
    router = express.Router(),
    unit = require('../handlers/unit'),
    media = require('../handlers/media'),
    article = require('../handlers/article'),
    unitTypes = require('../handlers/unit-types');

router.route('/articles')
    .get(article.getAll);
// .put(unit.updateWine)
// .delete(unit.deleteWine)

router.route('/unit')
    .get(unit.getAll)
    .post(unit.addUnit);

router.route('/media')
    .get(media.getAll);

router.route('/temp/articles')
    .get(article.temp.getAll)
    .post(article.temp.addArticle);
//  .delete(article.temp.removeAll)

router.route('/temp/articles/:id')
    .delete(article.temp.removeById)
    .put(function(req, res) {
        if(req.body.type) {
            if(req.body.type === 'confirm') {
                article.temp.confirm(req, res);
            } else if (req.body.type === 'update') {
                article.temp.update(req, res);
            }
        } else {
            res.status(403).send('err');
        }
    });

router.route('/unit-types')
    .get(unitTypes.getTypes);

module.exports = router;