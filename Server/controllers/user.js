const User = require('../model/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const Contacts = require('../model/contactBook')

const register = async (req, res) => {
    const { email, name, password: plainTextPassword } = req.body

    //errors
    if (!name || typeof name !== 'string') {
        return res.json({ status: 'error', error: 'Invalid Name' })
    }

    const password = await bcrypt.hash(plainTextPassword, 10)
    try {
        const response = await User.create({
            email,
            name,
            password
        })
        res.status(201).json({
            status: 'ok',
            message: "User created successfully",
            user: response
        })

    } catch (error) {
        console.log(error)
        if (error.code === 11000) {
            res.json({ status: 'error', error: `${Object.keys(error.keyValue)} already taken` })
        }
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email }).lean()

    if (!user) {
        return res.json({ status: 'error', error: 'Invalid email or Password' })
    }

    if (user) {
        bcrypt.compare(password, user.password, async function (err, isMatch) {
            if (!isMatch) {
                return res.json({ status: 'error' })
            }

            if (isMatch) {
                const token = jwt.sign({
                    id: user._id,
                    name: user.name,
                    email: user.email
                }, process.env.JWT_SECRET, { expiresIn: '2h' })
                return res.json({ status: 'ok', token: token, user: user.name })
            }
        })
    } else {
        res.json({ status: 'error', user: false })
    }
}

const logout = async (req, res) => {
    try {
        res.json({ status: 'ok' })
    } catch (error) {
        console.log('/ logout error')
        res.json({ status: error, error: 'invalid token' })
    }
}

const deleteUser = async (req, res) => {
    const { password } = req.body
    const token = req.headers['x-access-token']
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const email = decoded.email
        const user = await User.findOne({ email: email })
        //     res.json({ status: 'ok' })
        bcrypt.compare(password, user.password, async function (err, isMatch) {
            if (!isMatch) {
                return res.json({ status: 'error', error: 'Password does not match' })
            }

            if (isMatch) {
                await User.findOneAndDelete({ email })
                console.log('User Deleted from data base')
                res.json({ status: 'ok', message: 'User Deleted Successfully' })
            }
        })

    } catch (error) {
        console.log('/ contact list error', error)
        res.json({ status: error, error: 'invalid token' })
    }
}

const changePassword = async (req, res) => {
    const { password, newPassword, confirmNewPassword } = req.body
    const token = req.headers['x-access-token']

    if (newPassword !== confirmNewPassword) {
        return res.json({ status: 'error', error: 'Password doesnt Match' })
    }

    if (!newPassword || !password || typeof newPassword !== 'string' || typeof password !== 'string') {
        return res.json({ status: 'error', error: 'Invalid password' })
    }

    if (newPassword.length < 4) {
        return res.json({
            status: 'error',
            error: 'Password too small. Should be atleast 5 characters'
        })
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)

        const _id = user.id
        user1 = await User.findById({ _id })

        bcrypt.compare(password, user1.password, async function (err, isMatch) {
            if (!isMatch) {
                return res.json({ status: 'error', error: 'Password does not match' })
            }

            if (password === newPassword) {
                return res.json({ status: 'error', error: 'New Password Should not be same as old password ' })
            }

            if (isMatch) {
                const password = await bcrypt.hash(newPassword, 10)
                await User.updateOne({ _id },
                    {
                        $set: { password }
                    })
                res.json({ status: 'ok', message: 'Password Changed Successfully' })
            }
        })

    } catch (error) {
        return res.status(404).json({ status: 'error', error: ':))))' })
        //     if (token === 'null') {
        //         res.status(404).json({ message: 'Authorization failed, Invalid token' })
        //     }
        //     else { return res.status(404).json({ status: 'error', error: ':))))' }) }
    }
}

const getUser = async (req, res) => {
    const id = req.params.userId
    try {
        const user = await User.findById(id)
        if (user) user.password = null
        res.status(200).json({ message: 'ok', data: user })
    } catch (err) {
        res.status(500).json({ error: err, message: 'error' })
    }

}

const changeName = async (req, res) => {
    const { name, id } = req.body
    const token = req.headers['x-access-token']

    try {
        user = await User.findByIdAndUpdate(id, {
            name: name
        })

        res.status(200).json({ status: 'ok', data: user })

    } catch (error) {
        console.log('here');
        if (token === 'null') {
            res.status(404).json({ message: 'Authorization failed, Invalid token' })
        }
        //     else { return res.status(404).json({ status: 'error', error: ':))))' }) }
        return res.status(404).json({ status: 'error', error: error })
    }
}

const adminPanel = async (req, res) => {
    const token = req.headers['x-access-token']

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        const data = await User.findById(user.id)
        if (data.power === 1 || data.power === 2) {
            const masterData = await User.find()
            // masterData.map(a => {
            //     console.log(a.name);
            // })
            res.status(200).json({ message: 'ok', data: masterData, user: user })
        } else {
            res.status(500).json({ message: 'not ok' })
        }
    } catch (error) {
        res.status(500).json({ error: error, message: 'ERROR' })
    }
}

const adminPower = async (req, res) => {
    const { checkID } = req.body
    const { ID, checked } = checkID
    const token = req.headers['x-access-token']
    let user
    try {
        if (ID !== undefined) {
            if (checked === true) {
                user = await User.findByIdAndUpdate(ID, {
                    power: 1
                })
            } else if (checked === false) {
                user = await User.findByIdAndUpdate(ID, {
                    power: 0
                })
            }
            res.status(200).json({ status: 'ok', data: user })
        }
    } catch (error) {
        res.status(500).json({ error: error, message: 'ERROR' })
    }
}

const MasterProfileDelete = async (req, res) => {
    const token = req.headers['x-access-token']
    const { profileID } = req.body
    try {
        user = jwt.verify(token, process.env.JWT_SECRET)
        const { id } = user
        const data = await User.findById(id)
        if (data.power >= 1) {
            const contact = await Contacts.find({ createdBy: profileID })
            for (let i = 0; i < contact.length; i++) {
                await Contacts.findOneAndDelete({ createdBy: profileID })
            }
            const result = await User.findByIdAndDelete(profileID)
            if (result) {
                res.status(200).json({ status: 'ok', message: 'User Deleted!' })
            }
        }
    } catch (error) {

        console.log('ERRor', error);
    }
}

module.exports = {
    register,
    login,
    logout,
    changePassword,
    deleteUser,
    getUser,
    changeName,
    adminPanel,
    adminPower,
    MasterProfileDelete
}