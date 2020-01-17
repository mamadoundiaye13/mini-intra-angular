const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const userModel = require('../models/userModel');
const User = mongoose.model('User');
const config = require('../../config/secrets');
const bcrypt = require('bcrypt');

exports.user_register = (req, res) => {
  let {body} = req;
  let new_user = new User(body);

  new_user.hash_password = bcrypt.hashSync(req.body.password, 10);
  new_user.save((error, user) => {
   if(error){
      res.status(500);
      console.log(error);
      res.json({message: "Erreur lors de la création de l'utilisateur"});
    }
    else {
      user.hash_password = undefined;
      res.status(201);
      return res.json(user);
    }
  })
};

exports.user_login = (req, res) => {
  var {body} = req;
  User.findOne({email: body.email}, (error, user) =>{
    if(error){
      res.status(500);
      console.log(error);
      res.json({message: "Erreur serveur lors de la connexion"});
    }
    if (!user) {
      res.status(401).json({ message: 'Aucun utilisateur trouvé avec cette adresse mail' });
    } 
    else if (user){
      if (!user.comparePassword(req.body.password)){
        res.status(401).json({ message: 'Auth failed' });
      }
      else{
            let userinfo = {
              firstname : user.firstname,
              lastname: user.lastname,
              email: user.email
            }
              let token = jwt.sign({userinfo}, config.secrets.jwt_key, {expiresIn: '30 days'})
              res.json(token);
              }
       }
  
  })
  };

exports.loginRequired = (req, res, next) => {
  if (req.user) {
      next();
    } else {
      return res.status(401).json({ message: 'Utilisateur non autorisé' });
    }
}
 
exports.list_all_users = (req, res) => {
  User.find({}, (error, users) => {
    if(error){
      res.status(500);
      console.log(error);
      res.json({message: "Erreur serveur."});
    }
    else {
      res.status(200);
      res.json(users);
    }
  })
};

exports.create_a_user = (req, res) => {
  req.body.user_id = req.params.user_id;
  let new_user = new user(req.body);

  new_user.save((error, user) => {
    if(error){
      res.status(500);
      console.log(error);
      res.json({message: "Erreur serveur."});
    }
    else {
      res.status(201);
      res.json(user);
    }
  })
};

exports.get_a_user = (req, res) => {
  User.findById(req.params.user_id, (error, user) => {
    if(error){
      res.status(500);
      console.log(error);
      res.json({message: "Erreur serveur."});
    }
    else {
      res.status(200);
      res.json(user);
    }
  })
};

exports.update_a_user = (req, res) => {
  User.findOneAndUpdate({_id: req.params.user_id}, req.body, {new: true}, (error, user) => {
    if(error){
      res.status(500);
      console.log(error);
      res.json({message: "Erreur serveur sur l'édition de l'utilisateur."});
    }
    else {
      res.status(200);
      res.json(user);
    }
  })
};

exports.delete_a_user = (req, res) => {
  User.remove({_id: req.params.user_id}, (error) => {
    if(error){
      res.status(500);
      console.log(error);
      res.json({message: "Erreur serveur."});
    }
    else {
      res.status(200);
      res.json({message: "user supprimé"});
    }
  })
};
