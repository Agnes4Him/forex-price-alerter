const express = require('express')
const router = express.Router()
const chartController = require('../controllers/chartController')

router.get('/api/forex/prices/base/:base/quote/:quote', chartController.getPrices)

module.exports = router