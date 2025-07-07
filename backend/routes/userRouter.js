const express     = require('express')
const router      = express.Router()
const userCtrl    = require("../controllers/userController")
const { updateSolvedProblem } = require("../controllers/userController");
const auth = require('../middleware/authMiddleware')

router.get('/:id/stats',   userCtrl.getStats)
router.get('/:id/heatmap', userCtrl.getHeatmap)
router.post("/solved",auth,updateSolvedProblem);

module.exports = router
