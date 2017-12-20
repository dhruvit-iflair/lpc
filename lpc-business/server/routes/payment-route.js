var payCtrl = require('../controllers/payment-controller'),
    aes = require('aes-js');
    
module.exports = function(app) {
    app.route('/getDetails')
        .post(payCtrl.saveUserCard)
        .get(payCtrl.getAllUserDetails)

    app.post('/aes', payCtrl.aes)
    app.post('/charge', payCtrl.charge)
    app.post('/savePayment', payCtrl.savePayment)
    app.post('/chargeSavedCard', payCtrl.chargeSavedCard)

    app.get('/paymentListById/:id', payCtrl.getCustomer)
    app.get('/paymentList', payCtrl.paymentList)

    // Use when only create customer card method
    app.post('/createCardOnly', payCtrl.createCardOnly )

    app.delete('/deleteCard/:id', payCtrl.deleteCard)
}