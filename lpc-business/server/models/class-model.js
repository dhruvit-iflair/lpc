var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ClassSchema = new Schema({
    _businessId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {type: Date, required: true},
    time_from: {type: String, required: true},
    time_to: {type: String, required: true},
    class_name: {type: String, required: true},
    instruction: {type: String, required: true},
    location: {
        type: Schema.Types.ObjectId, 
        ref: 'Address'
    },
    duplicate: {type: String, required: true},
    copies: {type: String, required: true},
    price: {type: String, required: true},
    week: {
        type: String,
        required: function() {
            return this.duplicate === 'Weekly' ? true: false
        }
    },
    day: {
        type: Array,
        required: function() {
            return this.duplicate === 'Weekly' ? true: false
        }
    },
    status: {type: String, required: true, default: 'active'}
});

ClassSchema.pre('save', function(next) {
    if(this.duplicate != 'Weekly') {
        this.day = [];
        this.week = undefined;
    }
    next();
})

module.exports = mongoose.model('Class', ClassSchema);