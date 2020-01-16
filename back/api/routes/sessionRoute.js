module.exports = (app) => {
    const sessionController = require('../controllers/sessionController');
    const jwtMiddleware = require('../middleware/jwtMiddleware');
  
    app.route('/sessions') // req.params.post_id
    .get(sessionController.list_all_sessions)
    .post(sessionController.create_a_session);
  
    app.route('/sessions/:session_id')
    .get(sessionController.get_a_session)
    .put(sessionController.update_a_session)
    .delete(sessionController.delete_a_session);
};
