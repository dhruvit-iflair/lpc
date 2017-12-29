var mongoose = require('mongoose'),
    Class = mongoose.model('Class');
    User = mongoose.model('User');
    Payment = mongoose.model('Payment');
    CustomerSignedClasses = mongoose.model('CustomerSignedClasses');
    _ = require('underscore')
    
exports.create = function(req, res, next) {
    var classes = new Class(req.body);
    classes.save(function(err, docs) {
        if(err) return next(err);
        res.json(docs);
    })
}

exports.list = function(req, res, next) {
    var classes = []
    Class.find()
         .populate('_businessId location')
         .exec(function(err, docs) {
            if(err) return next(err);
            if(docs) {
                for(var i= 0; i< docs.length; i++) {
                    if(docs[i]._businessId.account_id) {
                        classes.push(docs[i])
                    }
                }
            }
    })
    .then(function() {
        CustomerSignedClasses.findOne({_customerId: req.query.id}, function(err, data) {
            if(err) res.send(err);
            if(data) {
                for(var i= 0; i< data._classId.length; i++) {
                    index = classes.findIndex(x => x._id.equals(data._classId[i].classes))
                    if(index >= 0) {
                        classes.splice(index, 1)
                    }
                }
                res.send(classes)
            } else {
                // The original classes without splice
                res.send(classes)
            }
        })
    })
}

exports.getClassByUserId = function(req, res, next) {
    User.find({role_id: '59edcfa676463c56211c57ae'}, function(err, bus) {
        if(err) return next(err);
        res.json(bus)
    })
}

exports.getClassById = function(req, res, next) {
    Class.findOne({_id: req.params.id})
         .populate('_businessId location')
         .exec( function(err, doc) {
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

exports.getClassBusinessId = function(req, res, next, id) {
    Class.findOne({_businessId: id }, function(err, docs) {
        if(err) return next(err);
        req.classBusinessId = docs;
        next();
    })
}

exports.getClassByBusinessName = function(req, res, next) {
    var classes = []
    Class.find({_businessId: req.classBusinessId._businessId })
        .populate('_businessId')
        .populate('location')
        .exec(function(err, docs) {
            if(err) return next(err);
            for(var i= 0; i< docs.length; i++) {
                classes.push(docs[i])
            }
            // res.send(classes)
    })
    .then(function() {
        CustomerSignedClasses.findOne({_customerId: req.query._customerId}, function(err, data) {
            if(err) res.send(err);
            if(data) {
                for(var i= 0; i< data._classId.length; i++) {
                    index = classes.findIndex(x => x._id.equals(data._classId[i].classes))
                    if(index >= 0) {
                        classes.splice(index, 1);
                    }
                }
                res.send(classes)
            } else {
                res.send(classes)
            }
        })
    })
}

exports.getUserClass = function(req, res, next) {
    var all_classes = [];
    var currentDate = new Date();
    Class.find({_businessId: req.params.id})
        .populate('_businessId')
        .exec(function(err, classes) {
            if(err) return next(err);
            for(var i= 0; i< classes.length; i++) {
                if(classes[i].date >= currentDate) {
                    all_classes.push(classes[i])    
                }
            }
            res.json(all_classes)
    })
}