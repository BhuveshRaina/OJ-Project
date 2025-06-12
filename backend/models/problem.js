const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  constraints: String,
  inputFormat: String,
  outputFormat: String
});

const Problem = mongoose.model('Problem', ProblemSchema);
module.exports = Problem;
