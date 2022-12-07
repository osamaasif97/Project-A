const express = require('express')
const router = express.Router()

const { register, login, logout,
    deleteUser, changePassword, getUser,
    changeName, adminPanel, adminPower, MasterProfileDelete } = require('../controllers/user')

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.delete('/delete-user', deleteUser)
router.patch('/change-password', changePassword)
router.get('/info/:userId', getUser)
router.post('/change-name', changeName)
router.post('/adminPanel', adminPanel)
router.post('/adminPower', adminPower)
router.delete('/MasterProfileDelete', MasterProfileDelete)

module.exports = router