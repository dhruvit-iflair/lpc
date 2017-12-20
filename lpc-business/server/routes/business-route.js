var mongoose = require('mongoose'),
    Business = mongoose.model('Business'),
    businessCtrl = require('../controllers/business-controller'),
    bcrypt = require('bcrypt-nodejs'),
    multer = require('multer'),
    path = require('path'),
    fs = require('fs'),
    multipart = require('connect-multiparty'),
    app = require('express');

module.exports = function(app) {

    // app.post('/business', upload.single('cover_photo'), businessCtrl.create)
	// app.put('/business/:id', upload.single('cover_photo'), businessCtrl.update) 
        
    app.get('/business', businessCtrl.list);

    app.route('/business/:id')
        .get(businessCtrl.getBusinessById)
        .delete(businessCtrl.delete);

    app.get('/businessStatus/:id', businessCtrl.updateStatus);
}

