const express = require('express');
const path = require('path');
const app = express();
const { MongoClient } = require('mongodb');
const PORT = 3000;

// MongoDB connection
const mongoURL = 'mongodb://localhost:27017';
const client = new MongoClient(mongoURL);
const dbName = 'resumeDB';

// Connect to MongoDB
client.connect()
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the frontend folder
app.use(express.static(path.join(__dirname, '../frontend')));

// API endpoint to get resume data
app.get('/api/resume', async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection('resume');
    const resumeData = await collection.findOne({});
    res.json(resumeData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch resume data' });
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});