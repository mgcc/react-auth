const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const CONFIG = require('../config');

module.exports = new PassportLocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
  },
  (req, email, password, done) => {

    console.log('Local login strat')
    console.log(`email: ${email}`);
    console.log(`password: ${password}`);

    const userData = {
      email: email.trim(),
      password: password.trim()
    }

    // find a user by email address
    return User.findOne(
      { email: userData.email },
      (err, user) => {
        if (err) { return done(err); }

        // No user found
        if (!user) {
          console.log('No user with that email found');
          return done(null, false, { message: "Invalid Credentials"} );
        }

        // Password is wrong
        return user.comparePassword(userData.password, (passwordErr, isMatch) => {
          if (passwordErr) {
            console.log('Error comparing password');
            return done(err);
          }

          if (!isMatch) {
            console.log("Wrong password");
            // return done(null, false, { message: "Invalid Credentials"} );
            return done(err);
          }

          const payload = {
            sub: user._id
          };

          // create a token string
          const token = jwt.sign(payload, CONFIG.JWT_SECRET);
          const data = {
            name: user.name
          };

          return done(null, token, data);

        })
      }
    )
  }
)