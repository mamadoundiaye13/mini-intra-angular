const mongoose = require('mongoose');
const sessionModel = require('../models/sessionModel');
const Session = mongoose.model("Session");

exports.list_all_sessions = (req, res) => {
  Session.find({}, (error, posts) => {
    if(error){
      res.status(500);
      console.log(error);
      res.json({message: "Erreur serveur sur les sessions."});
    }
    else {
      res.status(200);
      res.json(posts);
    }
  })
};

exports.create_a_session = (req, res) => {
  req.body.session_id = req.params.session_id;
  let new_session = new Session(req.body);

  new_session.save((error, post) => {
    if(error){
      res.status(500);
      console.log(error);
      res.json({message: "Erreur serveur."});
    }
    else {
      res.status(201);
      res.json(post);
    }
  })
};

exports.get_a_session = (req, res) => {
  Session.findById(req.params.session_id, (error, session) => {
    if(error){
      res.status(500);
      console.log(error);
      res.json({message: "Erreur serveur."});
    }
    else {
      res.status(200);
      res.json(session);
    }
  })
};


exports.update_a_session = (req, res) => {
  Session.findOneAndUpdate({_id: req.params.session_id}, req.body, {new: true}, (error, session) => {
    if(error){
      res.status(500);
      console.log(error);
      res.json({message: "Erreur serveur."});
    }
    else {
      res.status(200);
      res.json(session);
    }
  })
};

exports.delete_a_session = (req, res) => {
  Session.remove({_id: req.params.session_id}, (error) => {
    if(error){
      res.status(500);
      console.log(error);
      res.json({message: "Erreur serveur."});
    }
    else {
      res.status(200);
      res.json({message: "Session supprimée"});
    }
  })
};
