const authCheck = require('../middleware/auth-check');

const authController = require('../controllers/auth');
const cookieParser = require('cookie-parser');
const CONFIG = require('../config/config');

module.exports = (app) => {

  app.get('/', (req, res) => {
    res.send('API is working!!!');
  });

  app.use('/authorized', authCheck);

  app.get('/authorized', (req, res) => {
    console.log('Accessing authorized page...');
    res.setHeader('Content-Type', 'application/json');
    res.json({ data: 'This is a secret page!' });
  });

  app.post('/signup', authController.signup);
  app.post('/login', authController.login);

  // TESTING
  app.get('/no-auth', (req, res) => {
    console.log('GET /no-auth');
    res.send({ message: 'Hello world!' });
  })
  app.get('/get-cookie', (req, res) => {
    console.log('Getting cookie...');

    const cookieOptions = {
      maxAge: 1000 * 60 * 5,
      httpOnly: true,
      signed: true
    }

    res.cookie('auth', 'thisisacookie:>', cookieOptions)
    res.send('Sent you a cookie!')
  })

  app.get('/check-cookie', (req, res) => {
    console.log('Checking cookie...');

    console.log(req.cookies);

    res.send('hm...');
  })
}