const mongoose = require('mongoose')

const applicantSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    middlename: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    regno: {
        type: String,
        required: true,
        unique: true
    },
    matricno: {
        type: String,
        required: true,
        unique: true
    },
    college: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    instagramID: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phonenumber: {
        type: String,
        required: true,
        unique: true
    },
    roomno: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    subunit: {
        type: String,
        required: true
    },
    part: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    }
}, {
    collection: 'applicant'
})

const applicant = mongoose.model('applicantSchema', applicantSchema)

module.exports = applicant