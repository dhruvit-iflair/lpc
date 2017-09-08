var eventCtrl = require('../controllers/event-controller');

module.exports = function(app) {
    app.route('/event')
        .post(eventCtrl.create)
        .get(eventCtrl.list);

    app.route('/event/:id')
        .get(eventCtrl.getEventById)
        .put(eventCtrl.update)
        .delete(eventCtrl.delete);

    app.get('/eventStatus/:id', eventCtrl.updateStatus)
}