var config = require('./config'),
	mongoose = require('mongoose'),
	data = require('./seed.json');

module.exports = function() {
	mongoose.Promise = global.Promise;
	var conn = mongoose.connect(config.db);
	
	require('../server/models/customer-model');
	require('../server/models/kid-model');
	
	return conn;
}