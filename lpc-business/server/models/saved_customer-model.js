var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var savedCustomerSchema = new Schema({
    _customerId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    email: { type: String, required: true },
    brand: { type: String },
    card_id: { type: String, required: true },
    customer_card_id: { type: String, required: true },
    country: { type: String },
    created_at: { type: Number, required: true},
    object: { type: String },
    exp_month: { type: String, required: true },
    exp_year: { type: String, required: true },
    funding: { type: String },
    last4: { type: String, required: true },
    name: { type: String, required: true }
})

module.exports = mongoose.model('Saved_customer', savedCustomerSchema)