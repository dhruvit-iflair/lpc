var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var payoutSchema = new Schema({
    customer_id: { type: String, required: true },
    customer_account_id: { type: String, required: true },
    email: { type: String},
    _businessId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Payout', payoutSchema)