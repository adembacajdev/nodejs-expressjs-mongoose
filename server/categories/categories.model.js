const mongoose = require('mongoose');

const CategoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    created_at: {
      type: Date,
      default: Date.now
    }
})

module.exports = mongoose.model('Category', CategoriesSchema);