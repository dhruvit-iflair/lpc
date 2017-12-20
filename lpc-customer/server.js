// process.env.NODE_ENV = process.env.NODE_ENV || 'development';
require('dotenv').config()
var	config = require('./config/config'),
	mongoose = require('./config/mongoose'),
	express = require('./config/express');

var db = mongoose(),
	app = express();

app.listen(config.port);

module.exports = app;

console.log(process.env.NODE_ENV  + ' server running at http://192.168.1.50:' + config.port);