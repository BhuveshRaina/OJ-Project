const {ListObjectsV2Command, DeleteObjectsCommand } = require('@aws-sdk/client-s3');
const s3                                    = require('../config/awsConfig');
const uploadToS3                            = require('../utils/uploadToS3');
const { getTestCasesFromS3 }                = require('../utils/S3fetcher');
const Problem                               = require('../models/problem');
const slugify                               = require('slugify');
const deleteS3Folder = require('../utils/deleteS3Folder');

exports.addProblem = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'problemSetter') {
      return res.status(403).json({ error: 'Only problem setters can upload problems.' });
    }

    const { title, statement, constraints, difficulty, tags } = req.body;
    if (!title?.trim() || !statement?.trim() || !constraints?.trim() || !difficulty?.trim() || !tags) {
      return res.status(400).json({ error: 'Missing required text fields.' });
    }

    const sampleFile = req.files.sampleTestCases?.[0];
    const hiddenFile = req.files.hiddenTestCases?.[0];
    if (!sampleFile || !hiddenFile) {
      return res.status(400).json({ error: 'Both sampleTestCases and hiddenTestCases JSON files are required.' });
    }

    try {
      JSON.parse(sampleFile.buffer.toString('utf-8'));
      JSON.parse(hiddenFile.buffer.toString('utf-8'));
    } catch {
      return res.status(400).json({ error: 'Uploaded files must be valid JSON.' });
    }

    const problem = new Problem({
      title:       title.trim(),
      statement:   statement.trim(),
      constraints: constraints.trim(),
      difficulty:  difficulty.trim(),
      tags:        JSON.parse(tags),
      createdBy:   req.user._id,
      slug:        slugify(title, { lower: true, strict: true }),
    });
    await problem.save();

    const id        = problem._id.toString();
    const sampleKey = `${id}/sampleTestCases.json`;
    const hiddenKey = `${id}/hiddenTestCases.json`;

    const [ sampleUrl, hiddenUrl ] = await Promise.all([
      uploadToS3(sampleFile.buffer,  id, 'sampleTestCases.json', sampleFile.mimetype),
      uploadToS3(hiddenFile.buffer, id, 'hiddenTestCases.json', hiddenFile.mimetype),
    ]);

    problem.sampleTestCasesUrl = sampleUrl;
    problem.hiddenTestCasesUrl = hiddenUrl;
    await problem.save();

    res.status(201).json({ message: 'Problem added!', problem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while adding problem.' });
  }
};

exports.updateProblem = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.user || req.user.role !== 'problemSetter') {
      return res.status(403).json({ error: 'Only problem setters can update problems.' });
    }

    const problem = await Problem.findById(id);
    if (!problem) {
      return res.status(404).json({ error: 'Problem not found.' });
    }
    if (problem.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'You do not own this problem.' });
    }

    const { title, statement, constraints, difficulty, tags } = req.body;
    if (title)       problem.title       = title.trim();
    if (statement)   problem.statement   = statement.trim();
    if (constraints) problem.constraints = constraints.trim();
    if (difficulty)  problem.difficulty  = difficulty.trim();
    if (tags)        problem.tags        = JSON.parse(tags);
    problem.slug = slugify(problem.title, { lower: true, strict: true });

    const sampleFile = req.files?.sampleTestCases?.[0];
    const hiddenFile = req.files?.hiddenTestCases?.[0];
    if (sampleFile) {
      await uploadToS3(sampleFile.buffer, id, 'sampleTestCases.json', sampleFile.mimetype);
    }
    if (hiddenFile) {
      await uploadToS3(hiddenFile.buffer, id, 'hiddenTestCases.json', hiddenFile.mimetype);
    }

    await problem.save();
    res.json({ message: 'Problem updated.', problem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error updating problem.' });
  }
};

exports.getProblemMeta = async (req, res) => {
  try {
    const { id } = req.params;

    const problem = await Problem.findById(id).lean();
    if (!problem) {
      return res.status(404).json({ error: "Problem not found." });
    }

    return res.json({ problem });
  } catch (err) {
    console.error("Error fetching problem meta:", err);
    return res
      .status(500)
      .json({ error: "Failed to fetch problem metadata." });
  }
};

exports.deleteProblem = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.user || req.user.role !== 'problemSetter') {
      return res.status(403).json({ error: 'Only problem setters can delete problems.' });
    }

    const problem = await Problem.findById(id);
    if (!problem) {
      return res.status(404).json({ error: 'Problem not found.' });
    }
    if (problem.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'You do not own this problem.' });
    }
    await deleteS3Folder(id);

    await problem.deleteOne();
    res.json({ message: 'Problem and its files deleted.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error deleting problem.' });
  }
};

exports.getMyProblems = async (req, res) => {
  try {
    console.log(req.user)
    if (!req.user || req.user.role !== "problemSetter") {
      return res
        .status(403)
        .json({ error: "Only problem setters can view their problems, heelleeo." });
    }

    const myProblems = await Problem.find({ createdBy: req.user._id })
      .sort({ createdAt: -1 });         

    res.json({ problems: myProblems });
  } catch (err) {
    console.error("Error fetching my problems:", err);
    res.status(500).json({ error: "Failed to fetch your problems." });
  }
};

exports.getProblemTestCases = async (req, res) => {
  try {
    const { id } = req.params;

    const exists = await Problem.exists({ _id: id });
    if (!exists) {
      return res.status(404).json({ error: "Problem not found." });
    }

    const sample = await getTestCasesFromS3(id, "sampleTestCases.json");
    const hidden = await getTestCasesFromS3(id, "hiddenTestCases.json");

    return res.json({
      sampleTestCases: sample,
      hiddenTestCases: hidden,
    });
  } catch (err) {
    console.error("Error fetching test-case files:", err);
    return res
      .status(500)
      .json({ error: "Failed to fetch test-case files." });
  }
};
