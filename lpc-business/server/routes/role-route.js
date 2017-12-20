var roleCtrl = require('../controllers/role-controller');

module.exports = function(app) {
    app.post('/role', roleCtrl.create);
    app.get('/role', roleCtrl.getRole);
    app.get('/role/:id', roleCtrl.getRoleById)
}