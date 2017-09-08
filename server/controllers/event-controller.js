var mongoose = require('mongoose'),
    Event = mongoose.model('Event');

exports.create = function(req, res, next) {
    var event = new Event(req.body);
    event.save(function(err, event) {
        if(err) return next(err);
        res.json(event);
    })
}   

exports.list = function(req, res, next) {
    Event.find({}, function(err, events) {
        if(err) return next(err);
        res.json(events)
    })
}

exports.getEventById = function(req, res, next) {
    Event.findOne({_id: req.params.id}, function(err, event) {
        if(err) return next(err);
        res.json(event);
    })
}

exports.update = function(req, res, next) {
    Event.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true},
        function(err, doc) {
            if(err) return next(err);
            res.json(doc)
    })
}

exports.delete = function(req, res, next) {
    Event.remove({_id: req.params.id}, function(err) {
        if(err) return next(err);
        res.send('Successfully deleted')
    })
}

exports.updateStatus = function(req, res) {
    Event.findOne({_id: req.params.id}, function(err, event) {
        if(err) return next(err);
        if(event.status == 'active') {
            Event.update({_id: event._id}, {status: 'inactive' }, {new: true}, 
                function(err, doc) {
                    if(err) return next(err);
                    res.json(doc)
        });
        } else if(event.status == 'inactive') {
            Event.update({_id: event._id}, {status: 'active' }, {new: true}, 
                function(err, doc) {
                    if(err) return next(err);
                    res.json(doc)
            });
        } else {
            res.send('Something went wrong');
        }
    })
}