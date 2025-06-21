const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const  handleProblemUpload  = require('../controllers/addProblem');
const authMiddleware = require('../middleware/authMiddleware');
router.post(
  '/upload-problem',
  authMiddleware,
  upload.fields([
    { name: 'problem', maxCount: 1 },
    { name: 'structure', maxCount: 1 },
    { name: 'testcases', maxCount: 1 }
  ]),
  handleProblemUpload
);

module.exports = router;
