var mongoose = require('mongoose'),
    Customer = mongoose.model('Customer'),
    bcrypt = require('bcrypt-nodejs');

exports.create = function(req, res, next) {
    var customer = new Customer(req.body);

    Customer.findOne({email: req.body.email}, function(err, doc) {
        if(err) return next(err);
        if(!doc) {
            customer.save(function(err, customer) {
                if(err) return next(err);
                res.json(customer)
            })
        } else {
            res.send('Email already exists');
        }
    })
}

exports.list = function(req, res, next) {
    Customer.find({}, function(err, customers) {
        if(err) return next(err);
        res.json(customers)
    })
}

exports.getCustomerById = function(req, res, next) {
    Customer.findOne({_id: req.params.id}, function(err, customer) {
        if(err) return next(err);
        res.json(customer);
    })
}

exports.delete = function(req, res, next) {
    Customer.remove({_id: req.params.id}, function(err) {
        if(err) return next(err);
        res.send('Successfully deleted')
    })
}

exports.update = function(req, res, next) {
    var customer = new Customer(req.body);
    if(customer.password) {
        req.body.password = bcrypt.hashSync(customer.password, bcrypt.genSaltSync(8), null);
    }
    customer.password = customer.generateHash(customer.password);
    Customer.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}, 
        function(err, customer) {
            if(err) return next(err);
            res.json(customer);
        })
}

exports.updateStatus = function(req, res) {
    Customer.findOne({_id: req.params.id}, function(err, customer) {
        if(err) return next(err);
        if(customer.status == 'active') {
            Customer.update({_id: customer._id}, {status: 'inactive' }, {new: true}, 
                function(err, doc) {
                    if(err) return next(err);
                    res.json(doc)
            });
        } else if(customer.status == 'inactive') {
            Customer.update({_id: customer._id}, {status: 'active' }, {new: true}, 
                function(err, doc) {
                    if(err) return next(err);
                    res.json(doc)
            });
        } else {
            res.send('Something went wrong');
        }
    })
}