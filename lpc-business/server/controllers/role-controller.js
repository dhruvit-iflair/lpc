var mongoose = require('mongoose'),
    Role = mongoose.model('Role');

exports.create = function(req, res, next) {
    var role = new Role(req.body);

    role.save(function(err, role) {
        if(err) return next(err);
        res.json(role)
    })
}

exports.getRole = function(req, res, next) {
    Role.find({}, function(err, roles) {
        if(err) return next();
        res.json(roles)
    })
}

exports.getRoleById = function(req, res, next) {
    Role.findById({_id: req. params.id}, function(err, role) {
        if(err) return next(err);
        res.json(role)
    })
}