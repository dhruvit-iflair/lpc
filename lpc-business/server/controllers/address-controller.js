var mongoose = require('mongoose'),
    Address = mongoose.model('Address');

exports.create = function(req, res, next) {
    var address = new Address(req.body);
    address.save(function(err, add) {
        if(err) return next(err);
        res.json(add)
    })
}

exports.list = function(req, res, next) {
    Address.find({}, function(err, addresses) {
        if(err) return next(err);
        res.json(addresses)
    })
}

exports.delete = function(req, res, next) {
    Address.findByIdAndRemove({_id: req.params.id}, function(err, doc) {
        if(err) return next(err);
        res.send('Successfully deleted')
    })
}

exports.update = function(req, res, next) {
    var address = new Address();
    Address.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}, 
        function(err, docs) {
            if(err) return next(err);
            res.json(docs)
        })
}

exports.getAddressById = function(req, res, next) {
    Address.findOne({_id: req.params.id}, function(err, doc) {
        if(err) return next(err);
        res.json(doc)
    })
}

exports.getAddressByUser = function(req, res, next) {
    Address.find({_businessId: req.params.id}, function(err, docs) {
        if(err) return next(err);
        res.json(docs)
    })
}