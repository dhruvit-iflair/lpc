var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var bannerSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true},
    status: {type: String, required: true, default: 'active'},
    updated_at: { type: Date, default: Date.now()}
})

module.exports = mongoose.model('Banner', bannerSchema)