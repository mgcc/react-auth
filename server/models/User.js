const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const CONFIG = require('../config/config');

const UserSchema = new mongoose.Schema({
  email: { type: String, index: { unique: true } },
  password: String,
  name: String
});

UserSchema.methods.comparePassword = function(password, callback) {
  bcrypt.compare(password, this.password, callback);
}

// pre-save hook
UserSchema.pre('save', function (next) {
  const user = this;

  // do this only for new users, not modified ones
  if (!user.isModified('password')) return next();

  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) { return next(saltError); }

    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) { return next(hashError); }

      user.password = hash;

      return next();
    });
  });
});

module.exports = mongoose.model('User', UserSchema);