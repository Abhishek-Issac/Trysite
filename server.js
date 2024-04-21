const express = require('express');
const mongoose = require('mongoose');
const Toggle = require('./toggle'); // Assuming toggle model is defined in a separate file
const path = require('path');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://Project:Project0@cluster0.soxx9l1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Define mongoose schema and model if needed

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve dark.html
app.get('/dark', (req, res) => {
  res.sendFile(path.join(__dirname, 'dark.html'));
});

// Handle POST request to save toggle state
app.post('/toggle', async (req, res) => {
  const { name, state } = req.body;
  try {
    const toggle = await Toggle.findOneAndUpdate({ name }, { state }, { upsert: true });
    res.status(200).json(toggle);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Handle GET request to retrieve toggle state
app.get('/toggle/:name', async (req, res) => {
  const { name } = req.params;
  try {
    const toggle = await Toggle.findOne({ name });
    res.status(200).json(toggle);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
