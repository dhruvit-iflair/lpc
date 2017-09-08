var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    Schema = mongoose.Schema;

var BusinessSchema = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    contact: {type: Number, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    street_address: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    zip: {type: Number, required: true},
    status: {type: String, required: true, default: 'inactive'},
    services_offered: [{type: String, required: true}],
    special_events: [{type: String, required: true}],
    business_description: {type: String, required: true},
    cover_photo: {type: String, required: true}
});

BusinessSchema.pre('save', function(next) {
    if(this.password) {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8), null);
    }
    next()
})

BusinessSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

BusinessSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('Business', BusinessSchema);