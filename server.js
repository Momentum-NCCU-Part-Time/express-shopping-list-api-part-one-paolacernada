const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config();

// connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const app = express();
const PORT = process.env.PORT || 3000;

const ShoppingList = require('./models/ShoppingList');

// Create a new shopping list
app.post('/shopping-lists', async (req, res) => {
  try {
    const newShoppingList = new ShoppingList({ name: req.body.name });
    const savedList = await newShoppingList.save();
    res.status(201).send(savedList);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Get all shopping lists
app.get('/shopping-lists', async (req, res) => {
  try {
    const lists = await ShoppingList.find();
    res.send(lists);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get a single shopping list by ID
app.get('/shopping-lists/:id', async (req, res) => {
  try {
    const list = await ShoppingList.findById(req.params.id);
    if (!list) return res.status(404).send('Shopping list not found.');
    res.send(list);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update a shopping list by ID
app.put('/shopping-lists/:id', async (req, res) => {
  try {
    const list = await ShoppingList.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      updatedAt: Date.now(),
    }, { new: true });

    if (!list) return res.status(404).send('Shopping list not found.');
    res.send(list);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Delete a shopping list by ID
app.delete('/shopping-lists/:id', async (req, res) => {
  try {
    const list = await ShoppingList.findByIdAndDelete(req.params.id);
    if (!list) return res.status(404).send('Shopping list not found.');
    res.send(list);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
