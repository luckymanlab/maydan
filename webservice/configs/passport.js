var passport = require('passport'),
	FacebookStrategy = require('passport-facebook').Strategy,
	facebook = {};

passport.use(new FacebookStrategy({
	clientID: '1525144001089909',
	clientSecret: '9376d28767128cd79900353019413bc2',
	callbackURL: 'http://localhost:3000/auth/facebook/callback'
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