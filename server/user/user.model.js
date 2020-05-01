const mongoose = require('mongoose');

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  birthdate:{
    type: Date,
    default: null
  },
  profile_picture: {
    type: String,
    default: null
  },
  gender:{
    type: String,
    default: null
  },
  email: {
    type: String,
    required: true,
    unique : true
  },
  password:{
    type: String,
    minlength:64,
    maxlength: 64,
    required: true
  },
  reset_token:{
    type: String,
    default: null
  },
  reset_token_expiration:{
    type: Date,
    default: null
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('User', UserSchema);
