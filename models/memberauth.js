const mongoose = require('mongoose')

const authSchema = new mongoose.Schema(
    { 
        username: {type: String, required: true, unique: true},
        matricno: {type: String, required: true, unique: true},
        password: {type: String, required: true},
    },
    {collection: 'auth'}
)

const auth = mongoose.model('authSchema', authSchema)

module.exports = auth