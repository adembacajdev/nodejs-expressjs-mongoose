const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const PostModel = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    colors: {
        type: [String],
        required: true
    },
    size: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    reviews: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    phone_number: {
        type: Number,
        required: true
    },
    created_by:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
})

PostModel.plugin(mongoosePaginate);

module.exports = mongoose.model('Post', PostModel);