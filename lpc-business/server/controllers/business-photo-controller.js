mongoose = require('mongoose');
BusinessPhoto = mongoose.model('BusinessPhoto');

exports.create = function(req, res, next) {
    var photo = new BusinessPhoto(req.body);
    BusinessPhoto.findOne({_businessId: req.body._businessId}, function(err, business) {
        if(err) return next(err);
        if(!business) {
            var imageName = req.files;
            var imagePath = {};
            imagePath['photos'] = imageName;
        
            if(req.files) {
                for(var i= 0; i< req.files.length; i++) {
                    photo.photos.push(req.files[i].filename)
                }
            }
            photo.save(function(err, docs) {
                if(err) return next(err);
                res.send('Photos saved successfully')
            })
        } else {
            var imageName = req.files;
            if(req.files) {
                for(var i= 0; i< req.files.length; i++) {
                    business.photos.push(req.files[i].filename);
                }
            }
            //res.json(business)
            BusinessPhoto.findByIdAndUpdate({_id: business._id}, business, {new: true}, 
                function(err, all) {
                    if(err) return next(err);
                    res.json(all)
            })
        }
    })
}

exports.list = function(req, res, next) {
    BusinessPhoto.find({}, function(err, photos) {
        if(err) return next(err);
        res.json(photos)
    })
}

exports.getPhotoByBusiness = function(req, res, next) {
    BusinessPhoto.findOne({_businessId: req.params.id}, function(err, docs) {
        if(err) return next(err);
        res.json(docs)
    })
}

exports.getPhotoById = function(req, res, next) {
    BusinessPhoto.findOne({_id: req.params.id}, function(err, docs) {
        if(err) return next(err);
        res.json(docs)
    })
}

exports.delete = function(req, res, next) {
    BusinessPhoto.findById({_id: req.params.id}, function(err, doc) {
        if(err) return next(err);
        if(doc) {
            BusinessPhoto.remove({_id: doc._id}, function(err) {
                if(err) return next(err);
                for(var i= 0; i< doc.photos.length; i++) {
                    fs.unlink('./public/upload/' + doc.photos[i])    
                }
                res.send('Successfully deleted')
            })
        } else {
            res.send('Data does not exists')
        }
        
    })   
}

exports.update = function(req, res, next) {
    var photo = new BusinessPhoto(req.body);
    var imageName = req.files;
    var imagePath = {};
    imagePath['photos'] = imageName

    const data = {
        photos: []
    }
    if(req.files) {
        for(var i= 0; i< req.files.length; i++) {
            data['photos'].push(req.files[i].filename)
        }
    }

    BusinessPhoto.findById({_id: req.params.id}, function(err, docs) {
        if(err) return next(err)
        BusinessPhoto.findByIdAndUpdate({_id: docs._id}, data, {new: true}, 
            function(err, doc) {
                if(err) return next(err);
                if(docs.photos.length != 0) {
                    for(var i= 0; i< docs.photos.length; i++) {
                        fs.unlink('./public/upload/' + docs.photos[i])    
                    }
                }
                res.json(doc)
            })
    })
}

exports.deletePhoto = function(req, res, next) {
    BusinessPhoto.findOne({_id: req.params.id}, function(err, doc) {
        if(err) return next(err);
        if(doc) {
            var idx = doc.photos.indexOf(req.params.image);
            if(doc.photos.indexOf(req.params.image) != -1) {
                doc.photos.splice(idx, 1);
                BusinessPhoto.findByIdAndUpdate({_id: doc._id}, doc, {new: true}, function(err, all) {
                    if(err) return next(err);
                    res.json(all)
                })
            } else {
                res.send('Not found')
            }
        }
    })
}
