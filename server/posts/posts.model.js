const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const PostModel = new mongoose.Schema({
    title: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false,
    },
    colors: {
        type: [String],
        required: false
    },
    size: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        required: false
    },
    reviews: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Review",
        required: false
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: false
    },
    images: {
        type: [String],
        required: false
    },
    phone_number: {
        type: Number,
        required: false
    },
    type: {
        type: Number,
        required: true,
        maxlength: 1,
        minlength: 1
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false
    },
    is_active: {
        type: Boolean,
        required: false,
        default: false
    }
})

PostModel.plugin(mongoosePaginate);

module.exports = mongoose.model('Post', PostModel);