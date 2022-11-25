const express = require('express')
const router = express.Router()

const { register, login, logout, deleteUser, changePassword, getUser } = require('../controllers/user')

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.delete('/delete-user', deleteUser)
router.patch('/change-password', changePassword)
router.get('/info/:userId', getUser)

module.exports = router