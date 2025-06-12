const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  problemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
  language: { type: String, required: true },
  submitted_code: { type: String, required: true },
  verdict: { type: String, default: 'pending' }, 
  testCaseVerdicts: [
    {
      testCaseId: { type: mongoose.Schema.Types.ObjectId, ref: 'TestCase' },
      verdict: String
    }
  ]
}, { timestamps: true });

const Submission = mongoose.model('Submission', SubmissionSchema);
module.exports = Submission;
