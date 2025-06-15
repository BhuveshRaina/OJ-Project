// This file defines the Submission model for a coding platform.
const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  problemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem' }, // optional
  code: { type: String, required: true },
  language: {
    type: String,
    enum: ['cpp', 'java', 'python'],
    required: true
  },
  testCases: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'TestCase', required: true }
  ],
  verdicts: [{
    testCaseId: { type: mongoose.Schema.Types.ObjectId, ref: 'TestCase', required: true },
    actualOutput: { type: String, required: true },
    verdict: {
      type: String,
      enum: ['Pending', 'Accepted', 'Wrong Answer', 'Runtime Error'],
      required: true
    }
  }],
  status: {
    type: String,
    enum: ['Pending', 'Running', 'Completed'],
    default: 'Pending',
    required: true
  },
  startedAt: { type: Date }, 
  endedAt: { type: Date },  
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Submission', SubmissionSchema);
