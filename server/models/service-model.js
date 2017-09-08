var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ServiceSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    status: {type: String, required: true, default: 'inactive'}
});

module.exports = mongoose.model('Service', ServiceSchema);