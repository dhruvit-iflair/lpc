// require('dotenv').config()
var express = require('express'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	path = require('path'),
	jwt = require('jsonwebtoken'),
	config = require('./config'),
	pug = require('pug'),
	cors = require('./cors'),
	compression = require('compression')

module.exports = function() {
	var app = express();
	app.use(bodyParser.urlencoded({
		extended: true,
		limit: '50mb'
	}))
	app.use(bodyParser.json({limit: '50mb'}));

	app.set('view engine', 'pug');
	app.set('views', path.join(__dirname, '../server' ))
	app.set('view cache', true);
	app.use(compression());	
	
	app.get('/admin', function (req, res) {
		res.sendFile(path.join(__dirname, '../index.html'));
	});
	
	app.use(cors.permission);

	require('../server/routes/customer-route.js')(app);
	
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
	
	require('../server/routes/kid-route.js')(app);
	
	app.use(function(req, res) {
		//res.render('404')
		// res.status(404).send({url: req.originalUrl + ' not found'})
		res.send('404, Page don\'t\ exists')
	});

	app.get('*', function(req, res, next) {
		res.sendFile(path.resolve('index.html'));
	})

	return app;
}
