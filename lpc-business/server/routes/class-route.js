var classCtrl = require('../controllers/class-controller');

module.exports = function(app) {
 
    app.route('/class')
        .post(classCtrl.create)
        .get(classCtrl.list)

    // For getting user by role of business
    app.get('/classByUser', classCtrl.getClassByUserId)
    app.get('/getUserClass/:id', classCtrl.getUserClass);

    app.route('/class/:id')
        .get(classCtrl.getClassById)
        .put(classCtrl.update)
        .delete(classCtrl.delete)

    app.get('/classStatus/:id', classCtrl.updateStatus);

    app.get('/classByBusiness/:cbid', classCtrl.getClassByBusinessName);

    app.param('cbid', classCtrl.getClassBusinessId);
}