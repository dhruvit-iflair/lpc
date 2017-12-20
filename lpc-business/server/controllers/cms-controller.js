var mongoose = require('mongoose'),
    CMS = mongoose.model('Cms');

exports.create = function(req, res, next) {
    var cms = new CMS(req.body);
    cms.save(function(err, cms) {
        if(err) return next(err);
        res.json(cms);
    })
}   

exports.list = function(req, res, next) {
    CMS.find({}, function(err, cms) {
        if(err) return next(err);
        res.json(cms)
    })
}

exports.getCMSById = function(req, res, next) {
    CMS.findOne({_id: req.params.id}, function(err, cms) {
        if(err) return next(err);
        res.json(cms);
    })
}

exports.update = function(req, res, next) {
    CMS.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true},
        function(err, doc) {
            if(err) return next(err);
            res.json(doc)
    })
}

exports.delete = function(req, res, next) {
    CMS.remove({_id: req.params.id}, function(err) {
        if(err) return next(err);
        res.send('Successfully deleted')
    })
}

exports.updateStatus = function(req, res) {
    CMS.findOne({_id: req.params.id}, function(err, cms) {
        if(err) return next(err);
        if(cms.status == 'active') {
            CMS.update({_id: cms._id}, {status: 'inactive' }, {new: true}, 
                function(err, doc) {
                    if(err) return next(err);
                    res.json(doc)
        });
        } else if(cms.status == 'inactive') {
            CMS.update({_id: cms._id}, {status: 'active' }, {new: true}, 
                function(err, doc) {
                    if(err) return next(err);
                    res.json(doc)
            });
        } else {
            res.send('Something went wrong');
        }
    })
}

exports.getCMSByTitle = function(req, res, next) {
    CMS.findOne({title: req.params.title}, function(err, docs) {
        if(err) return next(err);
        res.json(docs);
    })
}