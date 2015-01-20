var passport = require('passport'),
	FacebookStrategy = require('passport-facebook').Strategy,
	Config = require('./configs/config'),
	facebook = {};

passport.use(new FacebookStrategy({
	clientID: Config.clientID,
	clientSecret: Config.clientSecret,
	callbackURL: Config.callbackURL
}, function(accessToken, refreshToken, profile, done) {
		done(null, {
			accessToken: accessToken,
			name: profile.displayName
		});
	}
));

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

module.exports = passport;