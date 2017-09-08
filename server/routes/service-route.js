var serviceCtrl = require('../controllers/service-controller');

module.exports = function(app) {
    app.route('/service')
        .post(serviceCtrl.create)
        .get(serviceCtrl.list);

    app.route('/service/:id')
        .get(serviceCtrl.getServiceById)
        .put(serviceCtrl.update)
        .delete(serviceCtrl.delete);

    app.get('/serviceStatus/:id', serviceCtrl.updateStatus)
}