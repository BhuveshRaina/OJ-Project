const express     = require('express')
const router      = express.Router()
const userCtrl    = require("../controllers/userController")

router.get('/:id/stats',   userCtrl.getStats)
router.get('/:id/heatmap', userCtrl.getHeatmap)

module.exports = router
