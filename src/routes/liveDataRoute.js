const express = require('express')
const router = express.Router()
const liveDataController = require('../controllers/liveDataController')

router.get('/api/forex/live/source/:source/currency/:currency', liveDataController.getLiveData)

module.exports = router