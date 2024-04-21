const express = require('express');
const mongoose = require('mongoose');
const Toggle = require('./models/toggle');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://Project:Project0@cluster0.soxx9l1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Mongoose schema
const toggleSchema = new mongoose.Schema({
    name: String,
    state: Boolean
});

const Toggle = mongoose.model('Toggle', toggleSchema);

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
const PORT = process.env.PORT || 3000; // Use the environment variable PORT if available, otherwise default to port 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
