const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ReviewSchema = new mongoose.Schema({
    user_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    post_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true
    },
    comment: {
        type: String,
        required: true
    },
    rating: {
      type: mongoose.Schema.Types.Decimal128,
      requires: true
    }
})

ReviewSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Review', ReviewSchema);