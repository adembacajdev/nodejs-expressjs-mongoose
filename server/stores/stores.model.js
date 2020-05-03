const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
    storeName: {
        type: String,
        required: true,
        unique : true
    },
    password: {
        type: String,
        minlength:64,
        maxlength: 64,
        required: true
    },
    storeCity: {
        type: String,
        required: true
    },
    storePicture: {
        type: String,
        required: true
    },
    storeDescription: {
      type: String,
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
})

module.exports = mongoose.model('Store', StoreSchema);