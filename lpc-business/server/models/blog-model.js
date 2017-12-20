var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var blogSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true},
    status: {type: String, required: true, default: 'active'},
    updated_at: { type: Date, default: Date.now()}
})

module.exports = mongoose.model('Blog', blogSchema)