const User = require('../models/users')
const Problem = require('../models/problem')
const mongoose = require("mongoose")
exports.getStats = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
      .select('solvedTotal solvedEasy solvedMedium solvedHard')
      .lean()
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' })
    }

    return res.json({
      success: true,
      stats: {
        total:  user.solvedTotal,
        easy:   user.solvedEasy,
        medium: user.solvedMedium,
        hard:   user.solvedHard
      }
    })
  } catch (err) {
    console.error('getStats error:', err)
    return res
      .status(500)
      .json({ success: false, message: 'Server error' })
  }
}

exports.getHeatmap = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
      .select('activity')
      .lean()
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' })
    }

    return res.json({
      success: true,
      activity: user.activity || {}
    })
  } catch (err) {
    console.error('getHeatmap error:', err)
    return res
      .status(500)
      .json({ success: false, message: 'Server error' })
  }
}

exports.updateSolvedProblem = async (req, res) => {
  try {
    const { problemId } = req.body;
      console.log(problemId);
    if (!problemId || !mongoose.Types.ObjectId.isValid(problemId)) {
      return res.status(400).json({ success: false, message: "Invalid problemId" });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (user.solvedProblems.includes(problemId)) {
      return res.json({ success: true, alreadySolved: true });
    }

    const problem = await Problem.findById(problemId).select("difficulty");
    if (!problem) return res.status(404).json({ success: false, message: "Problem not found" });

    user.solvedProblems.push(problemId);
    user.solvedTotal += 1;

    switch (problem.difficulty) {
      case "Easy":   user.solvedEasy   += 1; break;
      case "Medium": user.solvedMedium += 1; break;
      case "Hard":   user.solvedHard   += 1; break;
    }

    const today = new Date().toISOString().slice(0, 10);   
    const todayCount = user.activity.get(today) || 0;
    user.activity.set(today, todayCount + 1);

    if (user.solvedTotal >= 200)        user.codingTitle = "Grand Master";
    else if (user.solvedTotal >= 120)   user.codingTitle = "Master";
    else if (user.solvedTotal >= 80)    user.codingTitle = "Candidate Master";
    else if (user.solvedTotal >= 50)    user.codingTitle = "Expert";
    else if (user.solvedTotal >= 30)    user.codingTitle = "Specialist";
    else if (user.solvedTotal >= 15)    user.codingTitle = "Pupil";

    await user.save();

    return res.json({ success: true, alreadySolved: false });
  } catch (err) {
    console.error("[updateSolvedProblem]", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
