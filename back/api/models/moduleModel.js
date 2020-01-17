const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let moduleSchema = new Schema({
  nom: {
    type: String,
    require: "nom est requis",
    unique: true,
  },
  intervenant_id: {
    type: String,
    unique: true,
    require: "l'id intervenant est requis"
  },
  session_id : {
    type : String, 
    require: "l'Id session est requis"
  },
  created_at : {
    type: Date,
    default: Date.now
  }, 
  
  date_debut : {
      type : String,
      require: "date debut du module est requise"
  },
  date_fin : {
    type : String,
    require: "date fin du module est requise"
}
});

module.exports = mongoose.model('Module', moduleSchema);
