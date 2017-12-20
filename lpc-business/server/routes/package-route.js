var packageCtrl =  require('../controllers/package-controller');

module.exports = function(app) {
    app.route('/package')
        .post(packageCtrl.create)
        .get(packageCtrl.list)

    app.get('/getUserPackage/:id', packageCtrl.getUserPackage);

    app.route('/package/:id')
        .put(packageCtrl.update)
        .get(packageCtrl.getPackageById)
        .delete(packageCtrl.delete)

    app.get('/packageStatus/:id', packageCtrl.updateStatus)
}