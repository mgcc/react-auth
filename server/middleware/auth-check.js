const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const CONFIG = require('../config/config');

module.exports = (req, res, next) => {
  console.log('AUTH MIDDLEWARE')

  if (!req.headers.authorization) {
    console.log('No authorization header');
    console.log(req.headers);
    return res.status(401).end();
  }

  // get last part of authorization header string
  const token = req.headers.authorization.split(' ')[1];
  console.log(`Token: ${token}`);

  // decode the string using secret phrase
  return jwt.verify(token, CONFIG.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log('Generic error');1
      console.log(err);
      return res.status(401).end();
    }

    const userId = decoded.sub;

    // check if user exists
    return User.findById(userId, (userErr, user) => {
      if (userErr || !user) {
        console.log('Can\'t find user?!');
        return res.status(401).end();
      }

      return next();
    });
  });
}