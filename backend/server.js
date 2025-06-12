require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// const submissionRoutes = require('./routes/submissionRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// app.use('/api/submissions', submissionRoutes);

app.get('/', (req, res) => {
  res.send('Online Judge Backend is running');
});

const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});
