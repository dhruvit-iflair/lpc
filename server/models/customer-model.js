var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    Schema = mongoose.Schema;

var CustomerSchema = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    contact: {type: Number, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    street_address: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    zip: {type: Number, required: true},
    status: {type: String, required: true, default: 'inactive'}
    //status: {type: Boolean, default: false}
});

CustomerSchema.pre('save', function(next) {
	if(this.password) {
		this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8), null);
	}
	next()
})

CustomerSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

CustomerSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('Customer', CustomerSchema);