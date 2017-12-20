var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    status: {type: String, required: true, default: 'active'}
});

module.exports = mongoose.model('Event', EventSchema);