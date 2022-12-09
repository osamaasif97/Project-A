const User = require('../model/user')
const Contacts = require('../model/contactBook')
const jwt = require('jsonwebtoken')


const contactList = async (req, res) => {
    const token = req.headers['x-access-token']
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const email = decoded.email
        const user = await User.findOne({ email: email })
        const contacts = await Contacts.find({ createdBy: user._id })
        await User.findByIdAndUpdate(user._id, {
            contactCount: contacts.length
        })
        res.json({ status: 'ok', data: contacts })

    } catch (error) {
        console.log('/ contact list error', error)
        res.json({ status: error, error: 'invalid token' })
    }
}

const createContact = async (req, res) => {
    const token = req.headers['x-access-token']
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)

        req.body.createdBy = user.id
        const { name, number } = req.body
        if (!name || !number) {
            if (!name && !number) {
                return res.json({ status: 'error', error: `Please enter Name & Number ` })
            } else if (!name) {
                return res.json({ status: 'error', error: `Please enter Name ` })
            } else {
                return res.json({ status: 'error', error: `Please enter Number ` })
            }
        }
        // if (typeof number !== Number) {
        //     return res.json({ status: 'error', error: `Please enter valid Number` })
        // }
        const contact = await Contacts.create(req.body)
        res.json({ status: 'ok', message: 'Contact ' })

    } catch (error) {
        if (error.code === 11000) {
            res.json({ status: 'error', error: `This ${Object.keys(error.keyValue)} is already taken` })
        }
    }
}

const deleteContact = async (req, res) => {
    const token = req.headers['x-access-token']
    const id = req.headers['id']
    try {
        // console.log(id)
        const contacts = await Contacts.findByIdAndRemove(id)
        if (contacts === null) {
            res.json({ status: 'ok', message: 'Contact deleted!!' })
        }
    } catch (error) {
        console.log('/ delete error')
        res.json({ status: error, error: 'invalid token' })
    }
}

const bulkDelete = async (req, res) => {
    const token = req.headers['x-access-token']
    const id = req.headers['id']
    const array = id.split(",")
    let contacts
    try {
        for (let i = 0; i < array.length; i++) {
            try {
                contacts = await Contacts.findByIdAndRemove(array[i])
            } catch (error) {
                console.log('/ delete error')
                res.json({ status: error, error: 'ERROR' })
            }
        }
        res.json({ status: 'ok', message: 'Contact deleted!!' })
    } catch (error) {
        res.json({ status: error, error: 'invalid token' })
    }
}

const updateContact = async (req, res) => {
    const token = req.headers['x-access-token']
    const id = req.headers['id']
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const email = decoded.email
        const user = await User.findOne({ email: email })
        req.body.createdBy = user.id
        const { name, number } = req.body
        // console.log(id)

        if (name !== '' && number !== '') {
            const contact = await Contacts.findByIdAndUpdate({
                _id: id,
                createdBy: user.id
            },
                {
                    name: name,
                    number: number
                }
            )
            res.json({ status: 'ok', message: 'Name & Number Updated' })
        }
        if (name !== '') {
            const contact = await Contacts.findByIdAndUpdate({
                _id: id,
                createdBy: user.id
            },
                { name: name }
            )
            res.json({ status: 'ok', message: 'Name updated' })
        }
        if (number !== '') {
            const contact = await Contacts.findByIdAndUpdate({
                _id: id,
                createdBy: user.id
            },
                {
                    //  name: user.name, 
                    number: number
                }
            )
            res.json({ status: 'ok', message: 'Number updated' })
        }



        // if(!name){
        //     await Contacts.findOneAndUpdate()
        // }
        // const contact = await Contacts.create(req.body)
        // res.json({ status: 'ok', message: 'Contact ' })

    } catch (error) {
        if (error.code === 11000) {
            res.json({ status: 'error', error: `This ${Object.keys(error.keyValue)} is already taken` })
        }
    }
}

const allContacts = async (req, res) => {
    const { id } = req.query
    try {
        const contacts = await Contacts.find({ createdBy: id })
        result = await User.findByIdAndUpdate(id, {
            contactCount: contacts.length
        })
        res.status(200).json({ message: 'ok' })
    } catch (error) {
        res.status(400).json({ error: error })
    }

    // try {
    //     const result = await Contacts.find({ createdBy: id })
    //     res.status(200).json({ message: 'ok', count: result.length, id: id })
    // } catch (error) {
    //     console.log(error);
    //     res.status(400).json({ error: error })
    // }
}

module.exports = {
    contactList,
    createContact,
    deleteContact,
    updateContact,
    bulkDelete,
    allContacts
}