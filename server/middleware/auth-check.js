const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const CONFIG = require('../config/config');

const Cookies = require('universal-cookie');

module.exports = (req, res, next) => {
  console.log('AUTH MIDDLEWARE')

  // Don't check for authorization in preflight requests
  if (req.method === 'OPTIONS') {
    return next();
  }

  // console.log('Checking headers:');
  // console.log(req.headers);
  // if (!req.headers.authorization) {
  //   return res.status(401).end();
  // }

  // // get last part of authorization header string
  // const token = req.headers.authorization.split(' ')[1];

  // console.log(req.cookies);
  // console.log(req.signedCookies);
  // const authCookie = req.signedCookies.auth;
  // console.log('authCookie: ' + authCookie);

  // console.log('Header cookies: ');
  // console.log(req.headers.cookie);

  const authToken = req.cookies['auth-token'];
  console.log('Auth token: ' + authToken)

  // decode the string using secret phrase
  return jwt.verify(authToken, CONFIG.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).end();
    }

    const userId = decoded.sub;

    // check if user exists
    return User.findById(userId, (userErr, user) => {
      if (userErr || !user) {
        return res.status(401).end();
      }

      return next();
    });
  });
}