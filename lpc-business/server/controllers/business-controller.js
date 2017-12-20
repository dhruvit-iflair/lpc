var mongoose = require('mongoose'),
    Business = mongoose.model('Business'),
    Class = mongoose.model('Class'),
    bcrypt = require('bcrypt-nodejs'),
    fs = require('fs');

exports.create = function(req, res, next) {
    var business = new Business(req.body);
    Business.findOne({email: req.body.email}, function(err, doc) {
        if(err) return next(err);
        if(!doc) {
            var imageName = req.file;
            var imagePath = {};
            imagePath['cover_photo'] = imageName;
            if(req.file) {
                business.cover_photo = req.file.filename;
            }

            business.save(function(err, doc) {
                if(err) return next(err);
                res.json(business);
            })
        } else {
            res.send('Email already exists')
        }
    })
}

// exports.findByEmail = function(req, res, next) {
//     var b = new User();
//     User.findOne({email: req.body.email}, function(err, doc) {
//         if(err) return next(err);
//         if(doc) {
//             res.send('Email already exists')
//         }
//         else {
//             res.send('Email is OK')
//         }
//     })
// }

exports.update = function(req, res, next) {
    console.log('Hello')
    var business = new Business(req.body);
    var imageName = req.file;
    var imagePath = {};
    imagePath['cover_photo'] = imageName;

    if(business.password) {
        req.body.password = bcrypt.hashSync(business.password, bcrypt.genSaltSync(8), null);
    }
    business.password = business.generateHash(business.password);

    const doc = {
        password: business.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        street_address: req.body.street_address,
        zip: req.body.zip,
        contact: req.body.contact,
        city: req.body.city,
        state: req.body.state,
        email: req.body.email,
        business_description: req.body.business_description,
        special_events: req.body.special_events,
        services_offered: req.body.services_offered,
        cover_photo: req.file.filename,
    }

    Business.findByIdAndUpdate({_id: req.params.id}, doc, {new: true},
        function(err, docs) {
            if(err) return next(err);
            res.json(docs);
        })
}

exports.list = function(req, res) {
    Business.find({}, function(err, business) {
        if(err) return next(err)
        res.json(business)
    })
}

exports.getBusinessById = function(req, res, next) {
	//var business = new Business(req.body);
	Business.findOne({_id: req.params.id}, function(err, business) {
		if(err) return next(err);
		res.json(business);
	})
}

exports.delete = function(req, res, next) {
    Business.findById({_id: req.params.id}, function(err, docs) {
        Business.remove({_id: docs._id}, function(err) {
            if(err) return next(err);
            // or fs.unlink
            fs.unlinkSync('./public/upload/' + docs.cover_photo)
        })
    })
    .then(function() {
        Class.findOne({_businessId: req.params.id})
            .remove(function(err) {
                res.send('Sucessfully deleted')
            })
    })
}

exports.updateStatus = function(req, res) {
    Business.findOne({_id: req.params.id}, function(err, business) {
        if(err) return next(err);
        if(business.status == 'active') {
            Business.update({_id: business._id}, {status: 'inactive' }, {new: true}, 
                function(err, doc) {
                    if(err) return next(err);
                    res.json(doc)
            });
        } else if(business.status == 'inactive') {
            Business.update({_id: business._id}, {status: 'active' }, {new: true}, 
                function(err, doc) {
                    if(err) return next(err);
                    res.json(doc)
            });
        } else {
            res.send('Something went wrong');
        }
    })
}

exports.findByEmail = function(req, res, next) {
    var b = new Business();
    Business.findOne({email: req.body.email}, function(err, doc) {
        if(err) return next(err);
        if(doc) {
            res.send('Email already exists')
        }
        else {
            res.send('Email is OK')
        }
    })
}
