var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var faqSchema = new Schema({
    type: {type: String, required: true},
    question: {type: String, required: true},
    answer: {type: String, required: true},
    status: {type: String, required: true, default: 'active'},
    updated_at: { type: Date, default: Date.now()}
});

module.exports = mongoose.model('FAQ', faqSchema);