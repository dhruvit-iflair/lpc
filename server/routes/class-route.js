var classCtrl = require('../controllers/class-controller');

module.exports = function(app) {
 
    app.route('/class')
        .post(classCtrl.create)
        .get(classCtrl.list)

    app.route('/class/:id')
        .get(classCtrl.getClassById)
        .put(classCtrl.update)
        .delete(classCtrl.delete)

    app.get('/classStatus/:id', classCtrl.updateStatus)
}