var cmsCtrl = require('../controllers/cms-controller');

module.exports = function(app) {
 
    app.route('/cms')
        .post(cmsCtrl.create)
        .get(cmsCtrl.list)

    app.route('/cms/:id')
        .get(cmsCtrl.getCMSById)
        .put(cmsCtrl.update)
        .delete(cmsCtrl.delete);

    app.get('/cmsT/:title', cmsCtrl.getCMSByTitle);

    app.put('/cmsStatus/:id', cmsCtrl.updateStatus)
}