mongoose = require('mongoose'),
Schema = mongoose.Schema;

refundSchema = new Schema({
    amount: {type: Number, required: true},
    txn_id: {type: String, required: true},
    charge_id: {type: String, required: true},
    created_at: { type: Number, required: true},
    refund_id: {type: String, required: true},
    object: {type: String},
    status: {type: String},
    customer_card_id: {type: String, required: true},
    _customerId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    _classId: {
        type: Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    }, 
    email: {type: String, required: true}, 
    name: {type: String, required: true},
})

module.exports = mongoose.model('Refund', refundSchema)