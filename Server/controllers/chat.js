const User = require('../model/user')
const Chat = require('../model/chat')
const jwt = require('jsonwebtoken')


const createChat = async (req, res) => {
    const { token } = req.body
    const user = jwt.verify(token, process.env.JWT_SECRET)
    // const user = await User.findOne({ token }).lean()
    const newChat = new Chat({
        members: [req.body.senderId, req.body.receiverId]
    })

    try {
        const result = await newChat.save()
        res.status(200).json({ result: result, user: user })
    } catch (error) {
        res.status(500).json(error)
    }
}
const userChat = async (req, res) => {
    try {
        const chat = await Chat.find({
            members: { $in: [req.params.userId] }
        })
        res.status(200).json(chat)
    } catch (error) {
        res.status(500).json(error)
    }
}
const findChat = async (req, res) => {
    try {
        const chat = await Chat.findOne({
            members: { $all: [req.params.firstId, req.params.secondId] }
        })
        res.status(200).json(chat)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    createChat,
    userChat,
    findChat
}