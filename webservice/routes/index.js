var express = require('express'),
		router = express.Router(),
		incident = require('../data/incident'),
		article = require('../data/article');

router.get('/incident', incident.getAll);
router.get('/incident/:id', incident.getById);

router.get('/article', article.getAll);
router.get('/article/:id', article.getById);

//router.post('/incident', incident.addWine);
//router.put('/incident/:id', incident.updateWine);
//router.delete('/incident/:id', incident.deleteWine);