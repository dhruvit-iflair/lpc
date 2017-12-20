var mongoose = require('mongoose');
//var User = mongoose.model('User')
var User = require('../models/user-model');
// var Customer = require('../models/customer-model');
var Business = require('../models/business-model');
var Service = require('../models/service-model');
var Event = require('../models/event-model');
var Class = require('../models/class-model');
var Package = require('../models/package-model');
var CMS = require('../models/cms-model');
var Banner = require('../models/banner-model');
var FAQ = require('../models/faq-model');
var Email = require('../models/email-model');
var Blog = require('../models/blog-model');
var data = require('../../config/seed.json');

exports.createUser = function() {
    for(userData of data.user) {
        var user = new User(userData);
        user.save();
    }
}

exports.createCustomer = function() {
    for(customerData of data.customer) {
        var customer = new Customer(customerData);
        customer.save();
    }
}

exports.createBusiness = function() {
    for(businessData of data.business) {
        var business = new Business(businessData);
        business.save();
    }
}

exports.createService = function() {
    for(serviceData of data.service) {
        var service = new Service(serviceData);
        service.save();
    }
}

exports.createEvent = function() {
    for(eventData of data.event) {
        var event = new Event(eventData);
        event.save();
    }
}

exports.createClass = function() {
    for(classData of data.class) {
        var classes = new Class(classData);
        classes.save();   
    }
}

exports.createPackage = function(req, res) {
    var _class = [];
    Class.find({}, function(err, classes) {
        if(err) console.log(err);
        for(var i= 0; i< classes.length; i++) {
            _class.push(classes[i]._id)
        };
        data.package[0]._classId.push(_class[0],_class[1])
        data.package[1]._classId.push(_class[1])
        data.package[2]._classId.push(_class[0])
        for(packageData of data.package) {
            var package = new Package(packageData);
            package.save()
        }
    })
}

exports.createCms = function() {
    for(cmsData of data.cms) {
        var cms = new CMS(cmsData);
        cms.save();
    }
}

exports.createBanner = function() {
    for(bannerData of data.banner) {
        var banner = new Banner(bannerData);
        banner.save();
    }
}

exports.createFaq = function() {
    for(faqData of data.faq) {
        var faq = new FAQ(faqData);
        faq.save();
    }
}
exports.createEmail = function() {
    for(emailData of data.email) {
        var email = new Email(emailData);
        email.save();
    }
}
exports.createBlog = function() {
    for(blogData of data.blog) {
        var blog = new Blog(blogData);
        blog.save();
    }
}