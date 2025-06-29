const User = require('../models/users')

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
