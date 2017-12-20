// require('dotenv').config()
module.exports = {
	port: process.env.PORT,
	db: 'mongodb://localhost/lps',
	secret: process.env.MYSECRET
};