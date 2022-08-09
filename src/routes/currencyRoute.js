const express = require('express')
const router = express.Router()
const currencyController = require('../controllers/currencyController')

router.get('/api/forex/currency', currencyController.getCurrency)

module.exports = router