var mongoose = require('mongoose'),
	User = mongoose.model('User');
	Payout = mongoose.model('Payout');
	Business = mongoose.model('Business');
 	seedCtrl = require('../controllers/seed-controller');
	businessCtrl = require('../controllers/business-controller');
	userCtrl = require('../controllers/user-controller');
 	jwt = require('jsonwebtoken');
	config = require('../../config/config'),
	multer = require('multer');
	path = require('path'),
	fs = require('fs'),
	multipart = require('connect-multiparty'),
	app = require('express');
	qs = require('querystring');
	AUTHORIZE_URI = 'https://connect.stripe.com/oauth/authorize',
	TOKEN_URI = 'https://connect.stripe.com/oauth/token',
	request = require('request'),
	url = require('url')
	stripe = require('stripe')('sk_test_5tOuRyslg0a37W0JI4ZswoZg')	

// For creating and updating businesses
var imageFilter = function(res, file, cb) {
	if(!file.originalname.match(/\.(jpg|jpeg|png|gif|bmp)$/)) {
		return cb(new Error('Only images are allowed!'), false);
	}
	cb(null, true);
}

var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, "./public/upload")
	}, filename: function(req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname))
	}
})
var upload = multer({storage: storage, fileFilter: imageFilter});

module.exports = function (app) {

	// They are here coz dey can't pass without 
	// token, so given in user-route

	app.post('/register', upload.single('cover_photo'), userCtrl.create)
	app.post('/businessEmail', userCtrl.findByEmail)
	app.get('/users', userCtrl.get)
	app.get('/users/:id', userCtrl.getUserById);
	app.put('/users/:id', upload.single('cover_photo'), userCtrl.update)
	app.delete('/users/:id', userCtrl.delete);
	app.get('/userStatus/:id', userCtrl.updateStatus);

	app.post('/login', userCtrl.login);
	
	app.get('/logout', function(req, res) {
		req.logout();
		req.session.destroy()
		res.status(200).json({
			status: 'Bye'
		})
	})

	app.get('/usercustomer/:firstname', userCtrl.getUserForCustomer);

	app.get('/seed', function(req, res) {
	
		var User = mongoose.model('User');
		// var Customer = mongoose.model('Customer');
		var Business = mongoose.model('Business');
		var Service = mongoose.model('Service');
		var Event = mongoose.model('Event');
		var Class = mongoose.model('Class');
		var Package = mongoose.model('Package');
		var CMS = mongoose.model('Cms');
		var Banner = mongoose.model('Banner');
		var FAQ = mongoose.model('FAQ');
		var Email = mongoose.model('Email');
		var Blog = mongoose.model('Blog');
	
		User.count({}, function (err,count) {
			if (err) console.log(err);
			if (count == 0) {
				seedCtrl.createUser();
			}
		})
		// Customer.count({}, function (err,count) {
		// 	if (err) console.log(err);
		// 	if (count == 0) {
		// 		seedCtrl.createCustomer();
		// 	}
		// })
		Business.count({}, function (err,count) {
			if (err) {
				console.log(err);
			} else {
				if (count == 0) {
					seedCtrl.createBusiness();
				}
			}
		})
		Service.count({}, function (err,count) {
			if (err) {
				console.log(err);
			} else {
				if (count == 0) {
					seedCtrl.createService();
				}
			}
		})
		Event.count({}, function (err,count) {
			if (err) {
				console.log(err);
			} else {
				if (count == 0) {
					seedCtrl.createEvent();
				}
			}
		})
		Class.count({}, function (err,count) {
			if(err) console.log(err);
			if (count == 0) {
				seedCtrl.createClass();
			}
		})
		Package.count({}, function (err,count) {
			if(err) console.log(err);
			if (count == 0) {
				seedCtrl.createPackage();
			}
		})
		CMS.count({}, function (err,count) {
			if(err) console.log(err);
			if (count == 0) {
				seedCtrl.createCms();
			}
		})	
		Banner.count({}, function (err,count) {
			if(err) console.log(err);
			if (count == 0) {
				seedCtrl.createBanner();
			}
		})	
		FAQ.count({}, function (err,count) {
			if(err) console.log(err);
			if (count == 0) {
				seedCtrl.createFaq();
			}
		})	
		Email.count({}, function (err,count) {
			if(err) console.log(err);
			if (count == 0) {
				seedCtrl.createEmail();
			}
		})

		Blog.count({}, function (err,count) {
			if(err) console.log(err);
			if (count == 0) {
				seedCtrl.createBlog();
			}
		})
	
		res.sendFile(path.join(__dirname, '../../index.html'))
	})
}

