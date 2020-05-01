const mongoose = require('mongoose');

const FavouriteSchema = new mongoose.Schema({
    user_id:{ //E.g to link to another schema
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    post_id:{ //E.g to link to another schema
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true
    },
})

module.exports = mongoose.model('Favourite', BagSchema);