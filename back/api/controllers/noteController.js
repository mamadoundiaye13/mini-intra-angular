const mongoose = require('mongoose');
const noteModel = require('../models/noteModel');
const Note = mongoose.model("Note");

exports.get_all_notes = (req, res) => {
  Note.find({post_id: req.params.post_id}, (error, posts) => {
    if(error){
      res.status(500);
      console.log(error);
      res.json({message: "Erreur serveur."});
    }
    else {
      res.status(200);
      res.json(posts);
    }
  })
};

exports.create_a_note = (req, res) => {
  let new_note = new Note(req.body);

  new_note.save((error, post) => {
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

exports.get_a_note = (req, res) => {
  Note.findById(req.params.note_id, (error, note) => {
    if(error){
      res.status(500);
      console.log(error);
      res.json({message: "Erreur serveur."});
    }
    else {
      res.status(200);
      res.json(note);
    }
  })
};

exports.update_a_note = (req, res) => {
  Note.findOneAndUpdate({_id: req.params.note_id}, req.body, {new: true}, (error, note) => {
    if(error){
      res.status(500);
      console.log(error);
      res.json({message: "Erreur serveur."});
    }
    else {
      res.status(200);
      res.json(note);
    }
  })
};

exports.delete_a_note = (req, res) => {
  Note.remove({_id: req.params.note_id}, (error) => {
    if(error){
      res.status(500);
      console.log(error);
      res.json({message: "Erreur serveur."});
    }
    else {
      res.status(200);
      res.json({message: "Note supprimée"});
    }
  })
};
