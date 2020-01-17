const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let noteSchema = new Schema({
    etudiant_id: {
        type: String,
        unique: true,
        require: "l'id de l'étudiant est requis",
    },
    note: {
      type: String,
      required: "La note est requise"
    },
    message: {
      type: String,
      required: "Le message est requis"
    },
    module_id: {
        type: String,
        unique: true,
        required: "le module est requis"
    },
    created_note : {
      type: Date,
      default: Date.now
    },
});

module.exports = mongoose.model('Note', noteSchema);
