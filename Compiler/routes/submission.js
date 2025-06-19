const express = require("express");
const router = express.Router();
const Submission = require("../models/submission");
const runCode = require("../runCode");

router.post("/submit", async (req, res) => {
  const { submissionId, code, language, testcases, limits } = req.body;

  try {
    const verdict = await runCode({ code, language, testcases, limits });

    const update = {
      verdict: verdict.status,
      endedAt: new Date()
    };

    if (verdict.status === "Accepted") {
      update.totalTimeMs = verdict.totalTimeMs;
      update.totalMemoryKb = verdict.totalMemoryKb;
    }

    if (verdict.error) {
      update.errorMessage = verdict.error;
    }

    if (verdict.failedTestcase) {
      const failed = testcases[verdict.failedTestcase - 1];
      update.failedTestCase = {
        input: failed.input,
        expectedOutput: failed.expectedOutput,
        actualOutput: verdict.actualOutput,
        errorType: verdict.status
      };
    }

    await Submission.findByIdAndUpdate(submissionId, update);

    res.json({ status: "ok", verdict: verdict.status });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
});

module.exports = router;
