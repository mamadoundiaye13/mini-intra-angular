module.exports = (app) => {

  const userController = require('../controllers/userController');
  const authadmin = require('../controllers/userController')

  app.post('/register', userController.user_register);
  app.post('/login', userController.user_login);
  app.get('/users', userController.list_all_users);

  app.route('/users/:user_id')
      .get(userController.get_a_user)
      .put(authadmin.loginRequired, userController.update_a_user)
      .delete(authadmin.loginRequired, userController.delete_a_user);
};
