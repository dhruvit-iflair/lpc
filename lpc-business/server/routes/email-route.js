var emailCtrl = require('../controllers/email-controller');

module.exports = function(app) {
 
    app.route('/email')
        .post(emailCtrl.create)
        .get(emailCtrl.list)

    app.route('/email/:id')
        .get(emailCtrl.getEmailById)
        .put(emailCtrl.update)
        .delete(emailCtrl.delete)

    app.put('/emailStatus/:id', emailCtrl.updateStatus)
}