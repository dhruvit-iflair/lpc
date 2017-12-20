var mongoose = require('mongoose'),
    Email = mongoose.model('Email');

exports.create = function(req, res, next) {
    var email = new Email(req.body);
    email.save(function(err, email) {
        if(err) return next(err);
        res.json(email);
    })
}   

exports.list = function(req, res, next) {
    Email.find({}, function(err, email) {
        if(err) return next(err);
        res.json(email)
    })
}

exports.getEmailById = function(req, res, next) {
    Email.findOne({_id: req.params.id}, function(err, email) {
        if(err) return next(err);
        res.json(email);
    })
}

exports.update = function(req, res, next) {
    Email.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true},
        function(err, doc) {
            if(err) return next(err);
            res.json(doc)
    })
}

exports.delete = function(req, res, next) {
    Email.remove({_id: req.params.id}, function(err) {
        if(err) return next(err);
        res.send('Successfully deleted')
    })
}

exports.updateStatus = function(req, res) {
    Email.findOne({_id: req.params.id}, function(err, email) {
        if(err) return next(err);
        if(email.status == 'active') {
            Email.update({_id: email._id}, {status: 'inactive' }, {new: true}, 
                function(err, doc) {
                    if(err) return next(err);
                    res.json(doc)
        });
        } else if(email.status == 'inactive') {
            Email.update({_id: email._id}, {status: 'active' }, {new: true}, 
                function(err, doc) {
                    if(err) return next(err);
                    res.json(doc)
            });
        } else {
            res.send('Something went wrong');
        }
    })
}