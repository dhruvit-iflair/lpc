var mongoose = require('mongoose'),
    Business = mongoose.model('Business'),
    businessCtrl = require('../controllers/business-controller'),
    bcrypt = require('bcrypt-nodejs'),
    multer = require('multer'),
    path = require('path'),
    fs = require('fs'),
    multipart = require('connect-multiparty'),
    app = require('express');

var imageFilter = function(res, file, cb) {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif|bmp)$/)) {
        return cb(new Error('Only images are allowed!'), false);
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
    app.post('/business', upload.single('cover_photo'), function(req, res, next) {

        var business = new Business(req.body);
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
    }); 
    
    app.put('/business/:id', upload.single('cover_photo'), 
    function(req, res, next) {

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
});

    app.get('/business', businessCtrl.list);

    app.route('/business/:id')
        .get(businessCtrl.getBusinessById)
        .delete(businessCtrl.delete);

    app.get('/businessStatus/:id', businessCtrl.updateStatus);
}

