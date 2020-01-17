module.exports = (app) => {
    const noteController = require('../controllers/noteController');
    const jwtMiddleware = require('../middleware/jwtMiddleware');
    const authadmin = require('../controllers/userController');

  
    app.route('/modules/module_id') // req.params.post_id
    .get(noteController.get_all_notes)
    .post(noteController.create_a_note);
  
    app.route('/notes/:note_id')
    //.all(jwtMiddleware.verify_token)
    .get(authadmin.loginRequired,noteController.get_a_note)
    .put(authadmin.loginRequired,noteController.update_a_note)
    .delete(authadmin.loginRequired,noteController.delete_a_note);
  };
