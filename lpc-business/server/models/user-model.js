var mongoose = require('mongoose'),
	bcrypt = require('bcrypt-nodejs'),
	Schema = mongoose.Schema,
	jwt = require('jsonwebtoken');
	config = require('../../config/config')

var UserSchema = new Schema({
	account_id: {type: String},
    account_refresh_token: {type: String},
	firstname: {type: String, required: true},
	lastname: {type: String, required: true},
    contact: {type: Number, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    street_address: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    zip: {type: Number, required: true},
	status: {type: String, required: true, default: 'active'},
    services_offered: [{type: String}],
    special_events: [{type: String}],
    business_description: {type: String},
    cover_photo: {type: String},
	role_id: {
			type: Schema.Types.ObjectId,
			ref: 'Role',
			required: true
	}
});

UserSchema.pre('save', function(next) {
	if(this.password) {
		this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8), null);
	}
	next()
})

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
}

UserSchema.methods.generateJwt = function() {
	var expiry = new Date();
	expiry.setDate(expiry.getDate() + 1);

	return jwt.sign({
		_id: this._id,
		email: this.email,
		firstname: this.firstname,
		lastname: this.lastname,
		role_id: this.role_id,
		exp: parseInt(expiry.getTime() / 1000)
	}, config.secret)
}

module.exports = mongoose.model('User', UserSchema);

