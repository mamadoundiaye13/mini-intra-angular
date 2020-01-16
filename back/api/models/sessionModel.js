const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let sessionSchema = new Schema({
    session_id: {
        type: String
    },
    nom: {
        type: String,
        required: "Le nom est requis"
    },
    promo: {
        type: String,
        required: "La promo est requise"
    },
    annee : {
        type: Date,
        require: 'La date est requise',
    },
});

module.exports = mongoose.model('Session', sessionSchema);
