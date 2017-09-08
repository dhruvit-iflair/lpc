var mongoose = require('mongoose'),
    Class = mongoose.model('Class');

exports.create = function(req, res, next) {
    var classes = new Class(req.body);
    
    classes.save(function(err, docs) {
        if(err) return next(err);
        res.json(docs);
    })
}

exports.list = function(req, res, next) {
    Class.find(function(err, docs) {
        if(err) return next(err);
        res.json(docs);
    })
}

exports.getClassById = function(req, res, next) {
    Class.findOne({_id: req.params.id}, function(err, doc) {
        if(err) return next(err);
        res.json(doc);
    })
}

exports.update = function(req, res, next) {
    var classes = new Class(req.body);
    
    var docs = {
        'week': req.body.week,
        'day': req.body.day
    }
    var all = Object.assign(req.body, docs)

    Class.findByIdAndUpdate({_id: req.params.id}, all, {new: true},
        function(err, doc) {
            if(err) return next(err);
            if(req.body.duplicate != 'Weekly') {
                doc.week = undefined;
                doc.day = undefined;
            }
            res.json(doc)
        })
}

exports.delete = function(req, res, next) {
    Class.remove({_id: req.params.id}, function(err) {
        if(err) return next(err);
        res.send('Successfully deleted')
    })
}

exports.updateStatus = function(req, res) {
    Class.findOne({_id: req.params.id}, function(err, doc) {
        if(err) return next(err);
        if(doc.status == 'active') {
            Class.update({_id: doc._id}, {status: 'inactive' }, {new: true}, 
                function(err, cla) {
                    if(err) return next(err);
                    res.json(cla)
            });
        } else if(doc.status == 'inactive') {
            Class.update({_id: doc._id}, {status: 'active' }, {new: true}, 
                function(err, cla) {
                    if(err) return next(err);
                    res.json(cla)
            });
        } else {
            res.send('Something went wrong');
        }
    })
}