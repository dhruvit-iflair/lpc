var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var addressSchema = new Schema({
    address: { type: String, required: true },
    _businessId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Address', addressSchema)