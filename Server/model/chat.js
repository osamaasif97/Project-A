const mongoose = require('mongoose')

const ChatSchema = new mongoose.Schema({
    members: {
        type: Array,
    }
},
    { timestamps: true }
)

const model = mongoose.model('ChatSchema', ChatSchema)

module.exports = model