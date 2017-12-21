var customerCtrl = require('../controllers/customer-controller'),
    Customer = require('mongoose').model('Customer');

module.exports = function(app) {
    app.route('/lpc/customer')
        .post(customerCtrl.create)
        .get(customerCtrl.list);

    app.route('/lpc/customer/:id')
        .get(customerCtrl.getCustomerById)
        .delete(customerCtrl.delete)
        .put(customerCtrl.update);

    app.get('/lpc/customerStatus/:id', customerCtrl.updateStatus);

    app.post('/lpc/login', function(req, res, next) {
		Customer.findOne({email: req.body.email}, function(err, user) {
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
	});

}