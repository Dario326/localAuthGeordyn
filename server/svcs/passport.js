var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user.js');

passport.use('local-auth', new LocalStrategy(function(username, password, done) {

  User.findOne({
      username: username
    })
    .exec(function(err, user) {
      if (err) {
        done(err);
      }
      if (user) {
        if (user.validatePassword(password)) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      }
      return done(null, false);
    });
}));


////////// SESSION ////////////
passport.serializeUser(function(user, done) { // user is being taken from line 17 after successful login
  done(null, user._id);
});
passport.deserializeUser(function(_id, done) { // _id is being taken from above
  User.findById(_id, function(err, user) {
    done(err, user);
  });
});

module.exports = passport;
