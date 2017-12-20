var kidCtrl = require('../controllers/kid-controller');

module.exports = function(app) {
    
    app.route('/kid')
        .post(kidCtrl.create)
        .get(kidCtrl.list)
    
    app.route('/kid/:id')
        .delete(kidCtrl.delete)
        .put(kidCtrl.update)
        .get(kidCtrl.getKidById)

    app.get('/getKidByUser/:id', kidCtrl.getKidByUser)
}