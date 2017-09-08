var express = require('express'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	localStrategy = require('passport-local').Strategy
	session = require('express-session'),
	path = require('path'),
	flash = require('connect-flash');

module.exports = function() {

	require('../config/passport')(passport)

	var app = express();

	app.use(bodyParser.urlencoded({
		extended: true,
		limit: '50mb'
	}))
	app.use(bodyParser.json({limit: '50mb'}));

	app.use(session({
		secret: 'iambaziambaziambaz',
		resave: false,
		saveUninitialized: true,
		//cookie: { maxAge: 60000 }
	}));

	app.use(passport.initialize());
	app.use(passport.session())
	app.use(flash())

	require('../server/routes/user-route.js')(app);
	require('../server/routes/customer-route.js')(app);
	require('../server/routes/business-route.js')(app);
	require('../server/routes/service-route.js')(app);
	require('../server/routes/event-route.js')(app);
	require('../server/routes/class-route.js')(app);
	require('../server/routes/package-route.js')(app);

	app.use('/', express.static(path.join(__dirname, '../public')));

	app.get('*', function(req, res, next) {
		res.sendFile(path.resolve('index.html'));
	})
	
	return app;
}
