var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CMSSchema = new Schema({
    title: {type: String, required: true},
    url: {type: String, required: true},
    description: {type: String, required: true},
    meta_title: {type: String, required: true},
    meta_keywords: {type: String, required: true},
    meta_description: {type: String, required: true},
    status: {type: String, required: true, default: 'active'},
    updated_on: {type: Date, default: Date.now()},
});

module.exports = mongoose.model('Cms', CMSSchema);