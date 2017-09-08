var config = require('./config'),
	mongoose = require('mongoose');

module.exports = function() {
	mongoose.Promise = global.Promise;
	var db = mongoose.connect(config.db);

	require('../server/models/user-model');
	require('../server/models/customer-model');
	require('../server/models/business-model');
	require('../server/models/service-model');
	require('../server/models/event-model');
	require('../server/models/class-model');
	require('../server/models/package-model');

	return db;
}