const jwt = require('jsonwebtoken');
const config = require('../../config/secrets');

exports.verify_token = (req, res, next) => {
  let token = req.headers['authorization']; // mon token

  if(typeof token !== 'undefined'){
    jwt.verify(token, config.secrets.jwt_key, (error, authData) => {
      if(error){
        // res.sendStatus(403);
        res.status(403);
        res.json({message: "Accès interdit"});
      }
      else{
        next();
      }
    })
  }
  else{
    res.status(403);
    res.json({message: "Accès interdit"});
  }
}
