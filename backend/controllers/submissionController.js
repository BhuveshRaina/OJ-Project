const Submission = require('../models/submission');
const { getTestCasesFromS3 } = require('../utils/s3Fetcher');

exports.createSubmission = async (req, res) => {
  try {
    const { problemId, code, language, problemName } = req.body;

    if (!problemId || !code || !language || !problemName) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: problemId, code, language, or problemName'
      });
    }
    
    const submission = new Submission({
      userId: req.user.id,
      problemId,
      code,
      language,
      verdict: 'Pending',
      startedAt: new Date()
    });

    await submission.save();

    const testCases = await getTestCasesFromS3(problemName);
    console.log('Test cases fetched:', testCases);

    // sendToDockerForExecution(submission, testCases);

    res.status(201).json({
      message: 'Submission received and sent for execution',
      submissionId: submission._id,
      success: true
    });

  } catch (err) {
    console.error('Error during submission:', err);
    res.status(500).json({
      success: false,
      message: 'Server error during submission. Please try again.'
    });
  }
};
