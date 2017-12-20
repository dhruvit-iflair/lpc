var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var signedSchema = new Schema({
    _customerId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },
    _classId: [{
        classes: {
            type: Schema.Types.ObjectId,
            ref: 'Class'
        },
        kids: [{type: String, required: true}]
    }]
})

module.exports = mongoose.model('CustomerSignedClasses', signedSchema)