var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Class = mongoose.model('Class');

var PackageSchema = new Schema({
    package_name: {type: String, required: true},
    discount: {type: String, required: true},
    _businessId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    _classId: [{
        type: Schema.Types.ObjectId,
        ref: 'Class'
    }],
    status: {type: String, required: true, default: 'active'},
    start_date: {type: Date, required: true},
    created_date: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('Package', PackageSchema);