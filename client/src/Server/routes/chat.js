const express = require('express')
const router = express.Router()

const { createChat, userChat, findChat } = require('../controllers/chat')

router.post('/', createChat)
router.get('/:userId', userChat)
router.get('/find/:firstId/:secondId', findChat)

module.exports = router