const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const PORT = 3001;

// MongoDB connection
const mongoURL = process.env.MONGO_URL || 'mongodb://mongodb:27017';
const client = new MongoClient(mongoURL);
const dbName = process.env.MONGO_DB_NAME || 'resumeDB';

// Connect to MongoDB
client.connect()
  .then(async () => {
    console.log('Resume API: Connected to MongoDB!');

    const db = client.db(dbName);
    const count = await db.collection('resume').countDocuments();

    if (count === 0) {
      console.log('Resume API: Database empty, data should be seeded via seedData.js');
    } else {
      console.log(`Resume API: Found ${count} resume document(s) in database`);
    }
  })
  .catch(err => {
    console.error('Resume API: MongoDB connection error:', err);
  });

// Middleware to parse JSON
app.use(express.json());

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'resume-api' });
});

// Resume endpoint (no /api prefix - that's handled by gateway)
app.get('/resume', async (_req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection('resume');
    const resumeData = await collection.findOne({});

    if (!resumeData) {
      return res.status(404).json({ error: 'Resume data not found' });
    }

    res.json(resumeData);
  } catch (error) {
    console.error('Resume API: Error fetching resume:', error);
    res.status(500).json({ error: 'Failed to fetch resume data' });
  }
});

app.listen(PORT, () => {
  console.log(`Resume API running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  - GET /health');
  console.log('  - GET /resume');
});