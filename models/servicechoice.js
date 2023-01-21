const mongoose = require('mongoose')

const choiceSchema = new mongoose.Schema(
    { 
        matricno: {type: String, required: true},
        date: {type: String, required: true},
        serviceChoice: {type: String, required: true}
    },
    {collection: 'choice'}
)

const choice = mongoose.model('choiceSchema', choiceSchema)

module.exports = choice