var mongoose = require('mongoose'),
    Package = mongoose.model('Package');

exports.create = function(req, res) {
    var package = new Package(req.body);
    package.save(function(err, result) {
        if(err) res.send(err);
        res.json(result);
    })
}

exports.list = function(req, res, next) {
    Package.find({}, function(err, packages) {
        if(err) return next(err);
        res.json(packages);
    })
}

exports.getPackageById = function(req, res, next) {
    Package.findOne({_id: req.params.id})
        .populate('_classId')
        .exec(function(err, package) {
            if(err) return next(err);
            res.json(package);
        })
}

exports.update = function(req, res, next) {
    var package = new Package();
    //const all;
    if(!req.body._classId) {
        // package._classId = []
        const all = {
            package_name: req.body.package_name,
            discount: req.body.discount,
            _classId : []
        }

        Package.findByIdAndUpdate({_id: req.params.id}, all, {new: true},
            function(err, doc) {
                if(err) return next(err);
                res.json(doc)
        })
    } else {
        Package.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true},
            function(err, doc) {
                if(err) return next(err);
                res.json(doc)
        })
    }
    
}

exports.delete = function(req, res, next) {
    Package.remove({_id: req.params.id}, function(err) {
        if(err) return next(err);
        res.send('Successfully deleted')
    })
}

exports.updateStatus = function(req, res) {
    Package.findOne({_id: req.params.id}, function(err, package) {
        if(err) return next(err);
        if(package.status == 'active') {
            Package.update({_id: package._id}, {status: 'inactive' }, {new: true}, 
                function(err, doc) {
                    if(err) return next(err);
                    res.json(doc)
        });
        } else if(package.status == 'inactive') {
            Package.update({_id: package._id}, {status: 'active' }, {new: true}, 
                function(err, doc) {
                    if(err) return next(err);
                    res.json(doc)
            });
        } else {
            res.send('Something went wrong');
        }
    })
}