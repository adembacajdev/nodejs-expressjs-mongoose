const mongoose = require('mongoose');

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  profile_picture: {
    type: String,
    default: null
  },
  description: {
    type: String,
    requird: true
  },
  number: {
    type: Number,
    required: true
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
  type: {
    type: Number,
    maxlength: 1,
    minlength: 1,
    required: true,
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
