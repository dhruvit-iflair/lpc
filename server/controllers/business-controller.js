var mongoose = require('mongoose'),
    Business = mongoose.model('Business');

exports.list = function(req, res) {
    Business.find({}, function(err, business) {
        if(err) return next(err)
        res.json(business)
    })
}

exports.getBusinessById = function(req, res, next) {
	//var business = new Business(req.body);
	Business.findOne({_id: req.params.id}, function(err, business) {
		if(err) return next(err);
		res.json(business);
	})
}

exports.delete = function(req, res, next) {
	Business.remove({_id: req.params.id}, function(err) {
		if(err) return next(err);
		res.send('Deleted')
	})
}

exports.updateStatus = function(req, res) {
    Business.findOne({_id: req.params.id}, function(err, business) {
        if(err) return next(err);
        if(business.status == 'active') {
            Business.update({_id: business._id}, {status: 'inactive' }, {new: true}, 
                function(err, doc) {
                    if(err) return next(err);
                    res.json(doc)
            });
        } else if(business.status == 'inactive') {
            Business.update({_id: business._id}, {status: 'active' }, {new: true}, 
                function(err, doc) {
                    if(err) return next(err);
                    res.json(doc)
            });
        } else {
            res.send('Something went wrong');
        }
    })
}