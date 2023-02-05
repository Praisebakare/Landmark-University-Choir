const mongoose = require('mongoose')

const executiveSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    matricno: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    post: {
        type: String,
        required: true,
        unique: true
    },
    level: {
        type: String,
        required: true
    }
}, {
    collection: 'executive'
})

const executive = mongoose.model('executiveSchema', executiveSchema)

module.exports = executive