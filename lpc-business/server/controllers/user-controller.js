var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    bcrypt = require('bcrypt-nodejs');
    
exports.create = function(req, res, next) {
    var user = new User(req.body);
    User.findOne({email: req.body.email}, function(err, doc) {
        if(err) return next(err);
        if(!doc) {
            var imageName = req.file;
            var imagePath = {};
            imagePath['cover_photo'] = imageName;
            if(req.file) {
                user.cover_photo = req.file.filename;
            }
            user.save(function(err, doc) {
                if(err) return next(err);
                res.json(user);
            })
        } else {
            res.send('Email already exists');
        }
    })
}

exports.get = function(req, res, next) {
    User.find()
        .populate('role_id')
        .exec( function(err, users) {
            if(err) return next(err);
            res.json(users)
    })
}

exports.findByEmail = function(req, res, next) {
    var b = new User();
    User.findOne({email: req.body.email}, function(err, doc) {
        if(err) return next(err);
        if(doc) {
            res.send('Email already exists')
        }
        else {
            res.send('Email is OK')
        }
    })
}

exports.getUserById = function(req, res, next) {
    User.findById({_id: req.params.id})
        .populate('role_id')
        .exec(    
            function(err, user) {
                if(err) return next(err);
            res.json(user)
        })
}

exports.update = function(req, res, next) {
    var user = new User(req.body);
    var imageName = req.file;
    var imagePath = {};
    imagePath['cover_photo'] = imageName;

    if(user.password) {
        req.body.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8), null);
    }
    user.password = user.generateHash(user.password);
    const doc = {
        password: user.password,
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
        //cover_photo: req.file.filename
    }

    if(req.file) {
        //delete doc['cover_photo']
        doc['cover_photo'] = req.file.filename
    }

    User.findByIdAndUpdate({_id: req.params.id}, doc, {new: true},
        function(err, user) {
            if(err) { return next(err); }
            else {
                var token = user.generateJwt();
                res.json({
                    token: token
                })
            }
            //res.json(user)
    })
}

exports.delete = function(req, res) {
    User.findById({_id: req.params.id}, function(err, doc) {
        if(err) return next(err)
        User.remove({_id: doc._id}, function(err) {
            if(err) return next(err);
            fs.unlink('./public/upload/' + doc.cover_photo);
            res.send('Successfully deleted')
        })
    })
}

exports.updateStatus = function(req, res) {
    User.findOne({_id: req.params.id}, function(err, user) {
        if(err) return next(err);
        if(user.status == 'active') {
            User.update({_id: user._id}, {status: 'inactive' }, {new: true}, 
                function(err, doc) {
                    if(err) return next(err);
                    res.json(doc)
            });
        } else if(user.status == 'inactive') {
            User.update({_id: user._id}, {status: 'active' }, {new: true}, 
                function(err, doc) {
                    if(err) return next(err);
                    res.json(doc)
            });
        } else {
            res.send('Something went wrong');
        }
    })
}

exports.login = function(req, res) {
    User.findOne({email: req.body.email}, function(err, user) {
        if(err) return next(err);
        if(user) {
            if(!user.email) {
                return res.status(401).json({message: "No user found"})
            } 
            else if(user.email) {
            if(!user.validPassword(req.body.password)) {
                    return res.status(401).json({message: "Invalid password"})
                } 
                else {
                    var token = user.generateJwt();
                    res.json({
                        token: token
                    })
                }
            }
        } else {
            return res.status(401).json({message: "Invalid credentials"})
        }
    })
}

exports.getUserForCustomer = function(req, res, next) {
    User.findOne({firstname: req.params.firstname},
        function(err, user) {
            if(err) return next(err);
            res.json(user)
        })
}
