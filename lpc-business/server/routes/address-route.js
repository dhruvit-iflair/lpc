var addressCtrl = require('../controllers/address-controller');

module.exports = function(app) {
    app.route('/address')
        .post(addressCtrl.create)
        .get(addressCtrl.list)
    
    app.get('/getAddressByUser/:id', addressCtrl.getAddressByUser)
        
    app.route('/address/:id')
        .delete(addressCtrl.delete)
        .put(addressCtrl.update)
        .get(addressCtrl.getAddressById)
}