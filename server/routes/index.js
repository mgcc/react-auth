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
  // app.post('/logout', authController.logout);

  // TESTING
  app.get('/no-auth', (req, res) => {
    console.log('GET /no-auth');
    res.send({ message: 'Hello world!' });
  })


  app.get('/get-cookie', (req, res) => {
    const cookieOptions = {
      maxAge: 1000 * 60 * 5,
      httpOnly: true,
      signed: true
    }

    res.cookie('signedCookie', 'thisisacookie:>', cookieOptions)
    res.send('Sent you a cookie!')
  })

  app.get('/check-cookie', (req, res) => {
    console.log('Checking cookie...');
    console.log(req.cookies);
    console.log(req.signedCookies);

    res.send('hm...');
  })

  app.get('/cookies', (req, res) => {
    const cookie = req.cookies.authCookie;
    console.log('List of Cookies: ');
    console.log(cookie);

    if (cookie === undefined) {
      res.cookie('authCookie', 'I Love Cheesecake <3');
    }
    else {
      console.log('Cookies exists: ' + cookie);
    }

    res.send(`The cookie ${cookie ? 'exists' : 'doesn\'t exist'}`)
  })
}