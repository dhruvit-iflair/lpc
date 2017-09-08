var passport = require('passport'),
    mongoose = require('mongoose');

module.exports = function() {
    var User = mongoose.model('User');

    passport.serializeUser(function(user, done) {
        done(null, user.email);
    })

    passport.deserializeUser(function(email, done) {
        User.findOne(
            {email: email},
            '-password',
            function(err, user) {
                done(err, user)
            }
        );
    });

    require('./strategies/local.js')();
}


