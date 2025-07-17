const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    isAvailable: { type: Boolean, default: true }
});

module.exports = mongoose.model('MenuItem', itemSchema);
