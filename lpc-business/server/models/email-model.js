var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var emailSchema = new Schema({
    title: {type: String, required: true},
    subject: {type: String, required: true},
    content: {type: String, required: true},
    admin_content: {type: String, required: true},
    status: {type: String, default: 'active'},
    updated_at: { type: Date, default: Date.now()}
});

module.exports = mongoose.model('Email', emailSchema);