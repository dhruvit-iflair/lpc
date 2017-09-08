var mongoose = require('mongoose'),
    Service = mongoose.model('Service');

exports.create = function(req, res, next) {
    var service = new Service(req.body);

    service.save(function(err, service) {
        if(err) return next(err);
        res.json(service);
    })
}   

exports.list = function(req, res, next) {
    Service.find({}, function(err, services) {
        if(err) return next(err);
        res.json(services)
    })
}

exports.getServiceById = function(req, res, next) {
    Service.findOne({_id: req.params.id}, function(err, service) {
        if(err) return next(err);
        res.json(service);
    })
}

exports.update = function(req, res, next) {
    Service.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true},
        function(err, doc) {
            if(err) return next(err);
            res.json(doc)
        })
}

exports.delete = function(req, res, next) {
    Service.remove({_id: req.params.id}, function(err) {
        if(err) return next(err);
        res.send('Successfully deleted')
    })
}

exports.updateStatus = function(req, res) {
    Service.findOne({_id: req.params.id}, function(err, service) {
        if(err) return next(err);
        if(service.status == 'active') {
            Service.update({_id: service._id}, {status: 'inactive' }, {new: true}, 
                function(err, doc) {
                    if(err) return next(err);
                    res.json(doc)
            });
        } else if(service.status == 'inactive') {
            Service.update({_id: service._id}, {status: 'active' }, {new: true}, 
                function(err, doc) {
                    if(err) return next(err);
                    res.json(doc)
            });
        } else {
            res.send('Something went wrong');
        }
    })
}