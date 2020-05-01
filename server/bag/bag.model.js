const mongoose = require('mongoose');

const BagSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Bag', BagSchema);