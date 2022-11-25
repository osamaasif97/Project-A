const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    chatId: {
        type: String,
    },
    senderId: {
        type: String
    },
    text: {
        type: String
    }
},
    { timestamps: true },
    { collection: 'Messages' }
)

const model = mongoose.model('MessageSchema', MessageSchema)

module.exports = model