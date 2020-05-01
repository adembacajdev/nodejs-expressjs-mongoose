const mongoose = require('mongoose');

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
        type: String, //this should be an array which contains _id of review
        required: true
    },
    category: {
        type: String,//this should be an category id,
        required: true
    },
    images: {
        type: String,//this should be an image
        required: true
    },
    created_by:{ //E.g to link to another schema
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
})

module.exports = mongoose.model('Post', PostModel);