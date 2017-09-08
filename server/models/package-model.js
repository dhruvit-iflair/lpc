var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Class = mongoose.model('Class');

var PackageSchema = new Schema({
    package_name: {type: String, required: true},
    discount: {type: String, required: true},
    _classId: [{
        type: Schema.Types.ObjectId,
        ref: 'Class'
    }],
    status: {type: String, required: true, default: 'inactive'},
    date: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('Package', PackageSchema);