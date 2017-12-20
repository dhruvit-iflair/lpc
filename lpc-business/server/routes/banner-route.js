var mongoose = require('mongoose'),
    Banner = mongoose.model('Banner'),
    bannerCtrl = require('../controllers/banner-controller');
    multer = require('multer'),
    path = require('path'),
    fs = require('fs'),
    multipart = require('connect-multiparty'),
    app = require('express');

var imageFilter = function(req, file, cb) {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif|bmp|PNG)$/)) {
        return cb(new Error('Only images are allowed!'), false)
    }
    cb(null, true);
}

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./public/upload")
    }, filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({storage: storage, fileFilter: imageFilter});

module.exports = function(app) {
    app.post('/banner', upload.any(), function(req, res, next) {
        
        // req.files for upload.any()

        var banner = new Banner(req.body);
        var imageName = req.files[0];
        var imagePath = {}
        imagePath['image'] = imageName;

        if(req.files) {
            banner.image = req.files[0].filename;
        }
        banner.save(function(err, banner) {
            if(err) return next (err);
            res.json(banner);
        })
    });

    app.get('/banner', bannerCtrl.list);

    app.route('/banner/:id')
        .get(bannerCtrl.getBannerById)
        .delete(bannerCtrl.delete)

    app.put('/bannerStatus/:id', bannerCtrl.updateStatus);

    app.put('/banner/:id', upload.any(), function(req, res, next) {

        var banner = new Banner(req.body);
        var imageName = req.files[0];
        var imagePath = {};
        imagePath['image'] = imageName;

        const doc = {
            title: req.body.title,
            description: req.body.description,
            image: req.files[0].filename
        }

        Banner.findByIdAndUpdate({_id: req.params.id}, doc, {new: true},
        function(err, docs) {
            if(err) return next(err);
            res.json(docs)
        })

    })
}