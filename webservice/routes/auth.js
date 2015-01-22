var passport = require('../passport'),
	express = require('express'),
	router = express.Router();

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/error' }), function(req, res) {
	res.cookie('connect.sid', req.cookies['connect.sid']).redirect('http://localhost:8080/maydan4/ui/public/');
});


module.exports = router;