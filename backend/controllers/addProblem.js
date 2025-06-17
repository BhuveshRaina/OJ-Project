const uploadToS3 = require('../utils/UploadToS3');
const Problem = require('../models/problem');
const slugify = require('slugify');

const addProblem = async (req, res) => {
  try {
    const files = req.files;

    if (!files.problem || !files.structure || !files.testcases) {
      return res.status(400).json({ error: 'Missing required files: problem.json, structure.json, or testcases.json' });
    }

    const problemJSON = JSON.parse(files.problem[0].buffer.toString('utf-8'));
    const {
      title,
      description,
      inputDescription,
      outputDescription,
      sampleTestCases,
      difficulty,
      timeLimit = 1,
      memoryLimit = 256,
      tags = []
    } = problemJSON;

    if (!title || !description || !inputDescription || !outputDescription || !sampleTestCases || !difficulty) {
      return res.status(400).json({ error: 'Invalid problem.json format. Required fields missing.' });
    }

    const structure = JSON.parse(files.structure[0].buffer.toString('utf-8'));
    const { inputSchema, outputSchema, constraints } = structure;

    if (!inputSchema || !outputSchema || !constraints) {
      return res.status(400).json({ error: 'Invalid structure.json format. Required fields missing.' });
    }

    const testcasesFile = files.testcases[0];
    const slug = slugify(title, { lower: true });
    
    await uploadToS3(testcasesFile.buffer,slug,'testcases.json',testcasesFile.mimetype);      
    const newProblem = new Problem({
      title,
      description,
      inputDescription,
      outputDescription,
      sampleTestCases,
      inputSchema,
      outputSchema,
      constraints,
      timeLimit,
      memoryLimit,
      difficulty,
      tags
    });

    await newProblem.save();

    res.status(201).json({ message: 'Problem successfully added!' });
  } catch (error) {
    console.error('Error adding problem:', error);
    res.status(500).json({ error: 'Server error while adding problem. Please try again.' });
  }
};

module.exports = addProblem;
