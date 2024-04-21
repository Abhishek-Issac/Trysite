const express = require('express');
const mongoose = require('mongoose');
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
  // Handle toggle state if needed
});

// Handle GET request to retrieve toggle state
app.get('/toggle/:name', async (req, res) => {
  // Handle toggle state if needed
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
