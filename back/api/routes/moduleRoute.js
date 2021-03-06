module.exports = (app) => {
    const moduleController = require('../controllers/moduleController');
    const authadmin = require('../middleware/jwtMiddleware');
  
    app.route('/modules') //lier le module à un intervenant 
    .get(moduleController.list_all_modules)
    .post(moduleController.create_a_module); // demander à l'amin de s'identifier avant de créer un module
  
    app.route('/modules/:module_id')
    .get(moduleController.get_a_module)
    .put(authadmin.verify_token, moduleController.update_a_module) // demander à l'amin de s'identifier avant de modifier un module
    .delete(authadmin.verify_token, moduleController.delete_a_module); // demander à l'amin de s'identifier avant de supprimer un module
  };

