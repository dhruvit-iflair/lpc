var photoCtrl = require('../controllers/business-photo-controller');
    multer = require('multer');
    path = require('path'),
    fs = require('fs'),
    multipart = require('connect-multiparty'),
    app = require('express');

var imageFilter = function(res, file, cb) {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif|bmp|PNG|JPG|JPEG|BMP|GIF)$/)) {
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

var upload = multer({storage: storage, fileFilter: imageFilter})

module.exports = function(app) {
    app.route('/bussphoto')
        .post(upload.any(), photoCtrl.create)
        .get(photoCtrl.list)
    
    app.route('/bussphoto/:id')
        .get(photoCtrl.getPhotoByBusiness)
        
    app.route('/bussphotobyid/:id')
        .get(photoCtrl.getPhotoById)
        .delete(photoCtrl.delete)
        .put(upload. any(), photoCtrl.update)

    app.get('/deletephoto/:id/:image', photoCtrl.deletePhoto);
}