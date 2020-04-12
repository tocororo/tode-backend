const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El campo nombre es requerido']
    
  },
  email: {
    type: String,
    required: [true, 'El campo email es requerido'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'El campo password es requerido']
  },
  role: {
    type: [String]
  },
  perfilImage:{
    type: String
  }
},
  {
    timestamps: true
  })

const User = mongoose.model('user', userSchema);
module.exports = User;
