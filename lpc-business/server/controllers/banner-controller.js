var mongoose = require('mongoose'),
    Banner = mongoose.model('Banner'),
    fs = require('fs');

exports.list = function(req, res, next) {
    Banner.find({}, function(err, banners) {
        if(err) return next(err);
        res.json(banners)
    })
}

exports.getBannerById = function(req, res, next) {
    Banner.findOne({_id: req.params.id}, function(err, banner) {
        if(err) return next(err);
        res.json(banner)
    })
}

exports.delete = function(req, res, next) {
    Banner.findById({_id:  req.params.id}, function(err, docs) {
        Banner.remove({_id: docs.id}, function(err) {
            if(err) return next(err);
            fs.unlinkSync('./public/upload/' + docs.image)
            res.send('Banner successfully deleted')
        })
    })
    
}

exports.updateStatus = function(req, res, next) {
    Banner.findOne({_id: req.params.id}, function(err, banner) {
        if(err) return next(err);
        if(banner.status == 'active') {
            Banner.update({_id: banner._id}, {status: 'inactive'}, {new: true}, 
            function(err, docs) {
                if(err) return next(err);
                res.json(docs)
            })
        } else if(banner.status == 'inactive') {
            Banner.update({_id: banner._id}, {status: 'active'}, {new: true},
            function(err, docs) {
                if(err) return next(err);
                res.json(docs)
            })
        } else {
              res.send('Something went wrong')
        }
    })
}