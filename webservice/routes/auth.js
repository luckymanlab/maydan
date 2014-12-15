var passport = require('../configs/passport'),
	express = require('express'),
	router = express.Router();

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/error' }), function(req, res) {
  console.log("Response is very nice answer", res);
  var popUpScript = function(accessToken) {
		 if (window.opener != null && !window.opener.closed) {
			window.opener.document.cookie = 'accessToken=' + accessToken;
		}
		window.close();
	};

	res.send('<html><body><script>(' + popUpScript + ')(' + JSON.stringify(req.user.accessToken) + ')</script></body>');
});

module.exports = router;