var mongoose = require('mongoose'),
    Blog = mongoose.model('Blog'),
    blogCtrl = require('../controllers/blog-controller');
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
    app.post('/blog', upload.any(), function(req, res, next) {
    
    // req.files for upload.any()

    var blog = new Blog(req.body);
    var imageName = req.files[0];
    var imagePath = {}
    imagePath['image'] = imageName;

    if(req.files) {
        blog.image = req.files[0].filename;
    }
    blog.save(function(err, blog) {
        if(err) return next (err);
        res.json(blog);
    })
});

app.get('/blog', blogCtrl.list);

app.route('/blog/:id')
    .get(blogCtrl.getBlogById)
    .delete(blogCtrl.delete)

app.put('/blogStatus/:id', blogCtrl.updateStatus);

app.put('/blog/:id', upload.any(), function(req, res, next) {

    var blog = new Blog(req.body);
    var imageName = req.files[0];
    var imagePath = {};
    imagePath['image'] = imageName;

    const doc = {
        title: req.body.title,
        description: req.body.description,
        image: req.files[0].filename
    }

    Blog.findByIdAndUpdate({_id: req.params.id}, doc, {new: true},
    function(err, docs) {
        if(err) return next(err);
        res.json(docs)
        })
    })
}