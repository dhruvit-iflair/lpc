var kidCtrl = require('../controllers/kid-controller');

module.exports = function(app) {
    
    app.route('/lpc/kid')
        .post(kidCtrl.create)
        .get(kidCtrl.list)
    
    app.route('/lpc/kid/:id')
        .delete(kidCtrl.delete)
        .put(kidCtrl.update)
        .get(kidCtrl.getKidById)

    app.get('/lpc/getKidByUser/:id', kidCtrl.getKidByUser)
}