const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },

  inputDescription: {
    type: String,
    required: true
  },

  outputDescription: {
    type: String,
    required: true
  },

  sampleTestCases: {
    type: [
      {
        input: { type: mongoose.Schema.Types.Mixed, required: true },
        output: {  type: mongoose.Schema.Types.Mixed, required: true },
      }
    ],
    default: []
  },

  constraints: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },

  inputSchema: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },

  outputSchema: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },

  timeLimit: {
    type: Number,
    default: 1  
  },

  memoryLimit: {
    type: Number,
    default: 256
  },

  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },

  tags: {
    type: [String],
    default: []
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Problem = mongoose.model('Problem', ProblemSchema);
module.exports = Problem;
