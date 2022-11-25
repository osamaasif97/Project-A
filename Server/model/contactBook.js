const mongoose = require('mongoose')

const addressBook = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide Name'],
    },
    number: {
        type: String,
        unique: [true, `Number already in use`],
        required: [true, 'Must provide number'],
        maxlength: 11
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide User']
    }
},
    { collection: 'address-book' }, { timestamps: true }
)

const model = mongoose.model('addressBook', addressBook)

module.exports = model