require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
const boilerplateRoutes = require('./routes/boilerplateRoutes');
const cookieParser = require('cookie-parser');

const app = express();


app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true               
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cookieParser());

app.use('/boilerplate', boilerplateRoutes);
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/auth/google', require('./routes/googleRoutes'));
app.use('/api/problems', require('./routes/ProblemRoute.js'));
app.use('/api/submissions', require('./routes/submissionRoutes'));
app.use('/api/users', require('./routes/userRouter'))
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
