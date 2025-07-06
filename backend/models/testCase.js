const mongoose = require('mongoose');

const TestCaseSchema = new mongoose.Schema({
  submissionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Submission', required: true },
  input: { type: String, required: true },
  expected_output: { type: String, required: true },
  output: { type: String },
  verdict: { type: String, default: 'pending' }
});

const TestCase = mongoose.model('TestCase', TestCaseSchema);
module.exports = TestCase;