const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

// connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

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

// Add an item to a shopping list

app.post('/shopping-lists/:id/items', async (req, res) => {
  const { name, quantity } = req.body;
  try {
    const list = await ShoppingList.findById(req.params.id);
    if (!list) return res.status(404).send('Shopping list not found.');
    
    const newItem = { name, quantity, done: false };
    list.items.push(newItem);
    list.updatedAt = Date.now();
    await list.save();
    
    res.status(201).send(newItem);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Update an item in a shopping list by index in the items array

app.put('/shopping-lists/:listId/items/:itemId', async (req, res) => {
  try {
    const list = await ShoppingList.findById(req.params.listId);
    if (!list) return res.status(404).send('Shopping list not found.');

    const item = list.items.id(req.params.itemId);
    if (!item) return res.status(404).send('Item not found.');

    item.name = req.body.name || item.name;
    item.quantity = req.body.quantity || item.quantity;
    item.done = req.body.done !== undefined ? req.body.done : item.done;
    item.updatedAt = Date.now();

    await list.save();
    res.send(item);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Delete an item from a shopping list by index in the items array

app.delete('/shopping-lists/:listId/items/:itemId', async (req, res) => {
  try {
    const list = await ShoppingList.findById(req.params.listId);
    if (!list) {
      return res.status(404).send('Shopping list not found.');
    }

    list.items.pull({ _id: req.params.itemId });

    await list.save();

    res.send({ message: 'Item deleted successfully.' });
  } catch (err) {
    res.status(400).send(err.message);
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
