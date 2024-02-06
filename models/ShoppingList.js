const mongoose = require('mongoose');

const ShoppingListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updatedAt: {
    type: Date,
  },
});

const ShoppingList = mongoose.model('ShoppingList', ShoppingListSchema);

module.exports = ShoppingList;
