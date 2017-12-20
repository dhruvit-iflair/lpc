var express = require('express'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	path = require('path'),
	jwt = require('jsonwebtoken'),
	config = require('./config'),
	cors = require('./cors');

module.exports = function() {
	var app = express();

	app.use(bodyParser.urlencoded({
		extended: true,
		limit: '50mb'
	}))
	app.use(bodyParser.json({limit: '50mb'}));

	app.get('/admin', function (req, res) {
		res.sendFile(path.join(__dirname, '../index.html'));
	});
	
	app.use(cors.permission);

	require('../server/routes/user-route.js')(app);
	require('../server/routes/cms-route.js')(app);
	require('../server/routes/role-route.js')(app);

	app.use('/', express.static(path.join(__dirname, '../public')));

	app.use(function(req, res, next) {
		var token = req.body.token || req.query.token || req.headers['x-access-token'];
		if(token) {
			jwt.verify(token, config.secret, function(err, decoded) {
				if(err) {
					return res.json({message: 'Failed to authenticate token'})
				} else {
					req.decoded = decoded;
					next()
				}
			});
		} 
		else {
			res.sendFile(path.join(__dirname, '../index.html'));
		}
	});

	require('../server/routes/business-route.js')(app);
	require('../server/routes/service-route.js')(app);
	require('../server/routes/event-route.js')(app);
	require('../server/routes/class-route.js')(app);
	require('../server/routes/package-route.js')(app);
	require('../server/routes/banner-route.js')(app);
	require('../server/routes/faq-route.js')(app);
	require('../server/routes/email-route.js')(app);
	require('../server/routes/blog-route.js')(app);
	require('../server/routes/address-route.js')(app);
	require('../server/routes/business-photo-route.js')(app);
	require('../server/routes/payout-route.js')(app);
	require('../server/routes/payment-route.js')(app);
	require('../server/routes/customer-signed-classes-route.js')(app);
	require('../server/routes/refund-route.js')(app);

	app.get('*', function(req, res, next) {
		res.sendFile(path.resolve('index.html'));
	})
	
	return app;
}
