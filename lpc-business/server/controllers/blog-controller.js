var mongoose = require('mongoose'),
    Blog = mongoose.model('Blog'),
    fs = require('fs');

exports.list = function(req, res, next) {
    Blog.find({}, function(err, blogs) {
        if(err) return next(err);
        res.json(blogs)
    })
}

exports.getBlogById = function(req, res, next) {
    Blog.findOne({_id: req.params.id}, function(err, blog) {
        if(err) return next(err);
        res.json(blog)
    })
}

exports.delete = function(req, res, next) {
    Blog.findById({_id: req.params.id}, function(err, docs) {
        Blog.remove({_id: docs.id}, function(err) {
            if(err) return next(err);
            fs.unlinkSync('./public/upload/' + docs.image)
            res.send('blog successfully deleted')
        })
    })
    
}

exports.updateStatus = function(req, res, next) {
    Blog.findOne({_id: req.params.id}, function(err, blog) {
        if(err) return next(err);
        if(blog.status == 'active') {
            Blog.update({_id: blog._id}, {status: 'inactive'}, {new: true}, 
            function(err, docs) {
                if(err) return next(err);
                res.json(docs)
            })
        } else if(blog.status == 'inactive') {
            Blog.update({_id: blog._id}, {status: 'active'}, {new: true},
            function(err, docs) {
                if(err) return next(err);
                res.json(docs)
            })
        } else {
            res.send('Something went wrong')
        }
    })
}