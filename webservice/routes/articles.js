var article = require('../handlers/article'),
    auth = require('../auth');

exports.setRoutes = function(router) {
    router.route('/articles')
        .get(article.getAll);

    router.route('/temp/articles')
        .get(article.temp.getAll)
        .post(function(req, res, next) {
            auth.checkAccess(req, res, next, 'user', article.temp.addArticle);
        });

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
}