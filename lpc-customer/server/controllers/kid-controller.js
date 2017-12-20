var mongoose = require('mongoose'),
    // Kid = mongoose.model('Kid');
    Kid = require('../models/kid-model.js')

exports.create = function(req, res, next) {
    var kid = new Kid(req.body);
    kid.save(function(err, doc) {
        if(err) return next(err);
        res.json(doc)
    })
}

exports.list = function(req, res, next) {
    Kid.find({}, function(err, kids) {
        if(err) return next(err);
        res.json(kids)
    })
}

exports.delete = function(req, res, next) {
    Kid.findByIdAndRemove({_id: req.params.id}, function(err, doc) {
        if(err) return next(err);
        res.send('Kid removed successfully')
    })
}

exports.update = function(req, res, next) {
    Kid.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true},
        function(err, kid) {
            if(err) return next(err);
            res.json(kid)
    })
}

exports.getKidById = function(req, res, next) {
    Kid.findOne({_id: req.params.id}, function(err, doc) {
        if(err) return next(err);
        res.json(doc)
    })
}

exports.getKidByUser = function(req, res, next) {
    Kid.find({_customerId: req.params.id}, function(err, doc) {
        if(err) return next(err);
        res.json(doc)
    })
}