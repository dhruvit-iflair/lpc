// var port = 7575;

module.exports = {
	port: process.env.PORT,
	db: 'mongodb://localhost/lps',
	// secret: 'iambaziambaziambaz'
	secret: process.env.MYSECRET
};