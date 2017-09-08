var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
User = require('mongoose').model('User');

function getField(id, done) {
	User.findOne({_id: id}, ['-_id'],
		function(err, docs) {
			if(err) {
				return done(err)
			}
			return done(null, docs);
		});
} 

module.exports = function() {
	passport.use(new LocalStrategy({
		usernameField : 'email',
        passwordField : 'password'
        //passReqToCallback : true

	}, function(email, password, done) {

		User.findOne({
			email: email
		}, function(err, user) {
				if(err) {
					return done(err);
				}

				if(!user) {
					return done(null, false, {message: 'Unknown user'});
				}

				if(!user.validPassword(password)) {
					return done(null, false, {message: 'Invalid password'});
				}
				getField(user.id, done);
				//return done(null , user);
			}
		);
	}))
};