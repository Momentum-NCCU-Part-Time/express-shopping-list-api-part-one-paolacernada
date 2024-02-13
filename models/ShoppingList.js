const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true },
  quantity: { 
    type: Number, 
    required: true, 
    min: 1 },
  done: { 
    type: Boolean, 
    default: false },
  createdAt: { 
    type: Date, 
    default: Date.now },
  updatedAt: { 
    type: Date, 
    default: Date.now }
});

const ShoppingListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  items: [ItemSchema],
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
