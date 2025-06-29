const Problem = require('../models/problem')

exports.getProblemStats = async (req, res) => {
  try {
    const total = await Problem.countDocuments()
    const easy   = await Problem.countDocuments({ difficulty: 'Easy' })
    const medium = await Problem.countDocuments({ difficulty: 'Medium' })
    const hard   = await Problem.countDocuments({ difficulty: 'Hard' })

    return res.json({
      success: true,
      stats: { total, easy, medium, hard }
    })
  } catch (err) {
    console.error('getProblemStats error:', err)
    return res
      .status(500)
      .json({ success: false, message: 'Server error' })
  }
}


