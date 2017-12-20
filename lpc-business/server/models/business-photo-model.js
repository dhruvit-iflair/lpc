var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    User = mongoose.model('User')

var businessPhotoSchema = new Schema({
    photos: [{type: String, required: true, unique: true}],
    _businessId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('BusinessPhoto', businessPhotoSchema);