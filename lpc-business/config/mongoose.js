var config = require('./config'),
	mongoose = require('mongoose'),
	seedCtrl = require('../server/controllers/seed-controller'),
	data = require('./seed.json');

module.exports = function() {
	mongoose.Promise = global.Promise;
	var conn = mongoose.connect(config.db);
	
	require('../server/models/user-model');
	require('../server/models/business-model');
	require('../server/models/service-model');
	require('../server/models/event-model');
	require('../server/models/class-model');
	require('../server/models/package-model');
	require('../server/models/cms-model');
	require('../server/models/banner-model');
	require('../server/models/faq-model');
	require('../server/models/email-model');
	require('../server/models/blog-model');
	require('../server/models/role-model');
	require('../server/models/address-model');
	require('../server/models/business-photo-model');
	require('../server/models/payout-model');
	require('../server/models/payment-model');
	require('../server/models/customer-signed-classes-model');
	require('../server/models/refund-model');

	return conn;
}