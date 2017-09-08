var customerCtrl = require('../controllers/customer-controller');

module.exports = function(app) {
    app.route('/customer')
        .post(customerCtrl.create)
        .get(customerCtrl.list);

    app.route('/customer/:id')
        .get(customerCtrl.getCustomerById)
        .delete(customerCtrl.delete)
        .put(customerCtrl.update);

    app.get('/customerStatus/:id', customerCtrl.updateStatus);
}