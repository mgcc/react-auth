const authCheck = require('../middleware/auth-check');

const authController = require('../controllers/auth');

module.exports = (app) => {

  app.get('/', (req, res) => {
    res.send("API is working!!!");
  });

  app.use('/authorized', authCheck);

  app.get('/authorized', (req, res) => {
    console.log('Accessing authorized page...');
    res.send('Authorized people only!');
  });

  app.post('/signup', authController.signup);
  app.post('/login', authController.login);
}