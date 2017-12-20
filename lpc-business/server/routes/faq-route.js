var faqCtrl = require('../controllers/faq-controller');

module.exports = function(app) {
 
    app.route('/faq')
        .post(faqCtrl.create)
        .get(faqCtrl.list)

    app.route('/faq/:id')
        .get(faqCtrl.getfaqById)
        .put(faqCtrl.update)
        .delete(faqCtrl.delete)

    app.put('/faqStatus/:id', faqCtrl.updateStatus)
}