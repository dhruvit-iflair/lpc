var mongoose = require('mongoose'),
    FAQ = mongoose.model('FAQ');

exports.create = function(req, res, next) {
    var faq = new FAQ(req.body);
    faq.save(function(err, faq) {
        if(err) return next(err);
        res.json(faq);
    })
}   

exports.list = function(req, res, next) {
    FAQ.find({}, function(err, faq) {
        if(err) return next(err);
        res.json(faq)
    })
}

exports.getfaqById = function(req, res, next) {
    FAQ.findOne({_id: req.params.id}, function(err, faq) {
        if(err) return next(err);
        res.json(faq);
    })
}

exports.update = function(req, res, next) {
    FAQ.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true},
        function(err, doc) {
            if(err) return next(err);
            res.json(doc)
    })
}

exports.delete = function(req, res, next) {
    FAQ.remove({_id: req.params.id}, function(err) {
        if(err) return next(err);
        res.send('Successfully deleted')
    })
}

exports.updateStatus = function(req, res) {
    FAQ.findOne({_id: req.params.id}, function(err, faq) {
        if(err) return next(err);
        if(faq.status == 'active') {
            FAQ.update({_id: faq._id}, {status: 'inactive' }, {new: true}, 
                function(err, doc) {
                    if(err) return next(err);
                    res.json(doc)
        });
        } else if(faq.status == 'inactive') {
            FAQ.update({_id: faq._id}, {status: 'active' }, {new: true}, 
                function(err, doc) {
                    if(err) return next(err);
                    res.json(doc)
            });
        } else {
            res.send('Something went wrong');
        }
    })
}