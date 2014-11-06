var express = require('express'),
		router = express.Router(),
		incident = require('../db/incident'),
		article = require('../db/article');

router.get('/incident', incident.getAll);
router.get('/incident/:id', incident.getById);

router.get('/article', article.getAll);
router.get('/article/:id', article.getById);

//router.post('/incident', incident.addWine);
//router.put('/incident/:id', incident.updateWine);
//router.delete('/incident/:id', incident.deleteWine);

module.exports = router;