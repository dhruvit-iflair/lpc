var User = require('mongoose').model('User');
var passport = require('passport');

module.exports = function (app) {
	
	app.get('/', function (req, res) {
		res.sendFile(path.join(__dirname, '../../index.html'))
	});

	app.post('/register', function (req, res, next) {
		var user = new User(req.body);

		User.findOne({email: req.body.email}, function(err, doc) {
			if(err) return next(err);
			if(!doc) {
				user.save(function(err, doc) {
					if(err) return next(err);
					var token;
					token = user.generateJwt();
					res.json({
						'token': token
					})
					//res.json(doc)
				})
			} else {
				res.send('Email already exists')
			}
		});
	});

	app.post('/login', passport.authenticate('local'),
		function(req, res) {
			res.send(req.user);
	})

	app.get('/logout', function(req, res) {
		req.logout();
		req.session.destroy()
		res.status(200).json({
			status: 'Bye'
		})
	})

	app.get('/status', function(req, res) {
		if (!req.isAuthenticated()) {
			return res.status(200).json({
			status: false
			});
		}
		res.status(200).json({
			status: true
		});
	});
}