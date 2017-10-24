// Node Modules
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();

// Config
const CONFIG = require('./config/config');

app.use(cookieParser(CONFIG.SECRET));

// Models
require('./models/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

// Strategies
const localSignupStrategy = require('./config/passport/local-signup');
const localLoginStrategy = require('./config/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// Initialize mongoose
mongoose.Promise = global.Promise;
mongoose.connect(CONFIG.DB_URL, (err) => {
  if (err) { console.log('Error connecting to MongoDB'); }
  else { console.log('Connected to MongoDB'); }
});

// CORS
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Authorization, Access-Control-Request-Method, Access-Control-Request-Headers');

  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// Routes
require('./routes/index')(app);

app.listen(CONFIG.PORT, (err) => {
  if (!err) console.log(`API running on http://localhost:${CONFIG.PORT}`);
})