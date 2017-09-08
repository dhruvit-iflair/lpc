var mongoose = require('mongoose'),
	bcrypt = require('bcrypt-nodejs'),
	Schema = mongoose.Schema,
	jwt = require('jsonwebtoken');

var UserSchema = new Schema({
	email: {type: String, required: true, unique: true},
	password: String
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
	expiry.setDate(expiry.getDate() + 7);

	return jwt.sign({
		_id: this._id,
		email: this.email,
		exp: parseInt(expiry.getTime() / 1000)
	}, 'iambaziambaziambaz')
}

module.exports = mongoose.model('User', UserSchema);

