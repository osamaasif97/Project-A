const express = require('express')
const router = express.Router()

const { addMessage, getMessage } = require('../controllers/message')

router.post('/', addMessage)
router.get('/:chatId', getMessage)

module.exports = router