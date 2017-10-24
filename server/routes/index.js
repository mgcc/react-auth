const authCheck = require('../middleware/auth-check');

const authController = require('../controllers/auth');

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
}