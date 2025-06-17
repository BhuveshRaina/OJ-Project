const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const  handleProblemUpload  = require('../controllers/addProblem');

router.post(
  '/upload-problem',
  upload.fields([
    { name: 'problem', maxCount: 1 },
    { name: 'structure', maxCount: 1 },
    { name: 'testcases', maxCount: 1 }
  ]),
  handleProblemUpload
);

module.exports = router;
