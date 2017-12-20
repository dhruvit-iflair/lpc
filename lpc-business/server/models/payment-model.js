var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    aes = require('aes-js');    

var paymentSchema = new Schema({
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
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    application_id: { type: String, required: true},
    application_fee_id: { type: String, required: true },
    brand: { type: String },
    card_id: { type: String, required: true },
    charge_id: { type: String, required: true },
    country: { type: String },
    created_at: { type: Number, required: true},
    currency: { type: String, required: true },
    exp_month: { type: String, required: true },
    exp_year: { type: String, required: true },
    funding: { type: String },
    last4: { type: String, required: true },
    name: { type: String, required: true },
    transaction_id: { type: String, required: true },
    customer_card_id: { type: String },
})

// 'validate' also works well instead of 'save'
// 'save' won't work if, any error; and doesn't shows any either
// paymentSchema.pre('save', function(next) {
            
//     var key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];
//     var iv = [ 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,35, 36 ];
// 	if(this.card_number) {
        
//         var result = aes.utils.utf8.toBytes(this.card_number);
//         var aesCbc = new aes.ModeOfOperation.cbc(key, iv);
        
//         var encryptedBytes = aesCbc.encrypt(result);
//         var encryptedHex = aes.utils.hex.fromBytes(encryptedBytes);

//         this.card_number = encryptedHex;
//         console.log(this.card_number)
//         console.log(encryptedHex)
// 	}
// 	next()
// })

module.exports = mongoose.model('Payment', paymentSchema)
