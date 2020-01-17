module.exports = (app) => {
    const sessionController = require('../controllers/sessionController');
    const jwtMiddleware = require('../middleware/jwtMiddleware');
    const authadmin = require('../middleware/jwtMiddleware');

    app.route('/sessions') // req.params.post_id
    .get(sessionController.list_all_sessions)
    .post(sessionController.create_a_session);
  
    app.route('/sessions/:session_id')
    .get(sessionController.get_a_session)
    .put(authadmin.verify_token, sessionController.update_a_session)
    .delete(authadmin.verify_token, sessionController.delete_a_session);
};
