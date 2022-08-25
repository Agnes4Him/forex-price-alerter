const express = require('express')
const router = express.Router()
const sendEmailController = require('../controllers/sendEmailController')

router.get('/api/price/send', sendEmailController.sendEmail)

module.exports = router