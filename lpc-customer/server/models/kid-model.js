var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    aes = require('aes-js')

var kidSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    birthdate: { type: Date, required: true},
    restriction:  { type: String, required: true },
    _customerId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    }
})

module.exports = mongoose.model('Kid', kidSchema)