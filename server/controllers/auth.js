const validator = require('validator');
const passport = require('passport');
const CONFIG = require('../config/config');

const validateSignupForm = (payload) => {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = 'Provide a correct email address.';
  }

  if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
    isFormValid = false;
    errors.name = 'Name is required'
  }

  if (!isFormValid) {
    message = 'Check form for errors';
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

const validateLoginForm = (payload) => {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !== 'string' || payload.email.length === 0) {
    isFormValid = false;
    errors.email = 'Email address is required';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Password is required';
  }

  if (!isFormValid) {
    message = 'Check form for errors';
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

exports.signup = (req, res, next) => {
  const validationResult = validateSignupForm(req.body);

  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

  return passport.authenticate('local-signup', (err) => {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        return res.status(409).json({
          success: false,
          message: 'Check the form for errors',
          errors: {
            email: 'This email is already taken'
          }
        })
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Sign up successful!'
    });
  })(req, res, next);
}

exports.login = (req, res, next) => {
  const validationResult = validateLoginForm(req.body);

  if(!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

  return passport.authenticate('local-login', (err, token, userData) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        success: false,
        message: 'Unable to log in'
      });
    }

    const cookieOptions = {
      maxAge: 1000 * 60 * 5,
      httpOnly: true,
      signed: true
    }

    // pass token as cookie
    res.cookie(
      'auth',
      token,
      {
        maxAge: 1000 * 60 * 5, //5mins
        httpOnly: true,
        signed: true
      });

    return res.json({
      success: true,
      message: 'You have successfully logged in!',
      user: userData
    });

  })(req, res, next);
}