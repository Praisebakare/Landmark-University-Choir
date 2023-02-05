const mongoose = require('mongoose')

const announcementSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    announcement: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
}, {
    collection: 'announcement'
})

const announcement = mongoose.model('announcementSchema', announcementSchema)

module.exports = announcement