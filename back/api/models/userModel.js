const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {Schema} = mongoose;

//email validateur
var validateEmail = function(email){
  var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email)
};

let userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validateEmail,"veuillez saisir un valable email"],
    match : [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "veuillez saisir un valable email"]
  },
  role: {
    type: String,
    required: true,

  },
  hash_password: {
    type: String,
    required: true
  },
  created_at : {
    type: Date,
    default: Date.now
  },
});

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.hash_password);
};

module.exports = mongoose.model('User', userSchema);
