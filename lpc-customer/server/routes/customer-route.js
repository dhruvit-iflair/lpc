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

    app.post('/lpc/login', customerCtrl.login);

}