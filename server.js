const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://Project:Project0@ac-tf3gqzx-shard-00-00.soxx9l1.mongodb.net:27017,ac-tf3gqzx-shard-00-01.soxx9l1.mongodb.net:27017,ac-tf3gqzx-shard-00-02.soxx9l1.mongodb.net:27017/?ssl=true&replicaSet=atlas-76q97l-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0
', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => console.log('Connected to MongoDB'));
db.on('error', err => console.error('MongoDB connection error:', err));

// Define schema and model for toggles
const toggleSchema = new mongoose.Schema({
    abhishek: Boolean,
    shasafar: Boolean
});
const Toggle = mongoose.model('Toggle', toggleSchema);

app.use(bodyParser.json());

// Route to save toggles to MongoDB
app.post('/save-toggles', async (req, res) => {
    try {
        const { abhishek, shasafar } = req.body;
        await Toggle.findOneAndUpdate({}, { abhishek, shasafar }, { upsert: true });
        res.json({ success: true, message: 'Toggles saved successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to save toggles', error: error.message });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
