const mongoose = require('mongoose')

const attSchema = new mongoose.Schema({
    data: {
        type: String,
        required: true,
        unique: true
    },
    matricno: {
        type: String,
        required: true
    },
    clocked: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    week: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    }
}, {
    collection: 'att'
})

const att = mongoose.model('attSchema', attSchema)

module.exports = att