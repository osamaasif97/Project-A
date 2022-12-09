const express = require('express')
const router = express.Router()

const { contactList, createContact, deleteContact,
    updateContact, bulkDelete, allContacts } = require('../controllers/contact')

router.get('/', contactList)
router.post('/allContacts', allContacts)
router.post('/create', createContact)
router.delete('/delete', deleteContact)
router.delete('/bulkDelete', bulkDelete)
router.patch('/update', updateContact)

module.exports = router