const mongoose = require('mongoose')

const suggestionSchema = new mongoose.Schema(
    { 
        name: {type: String, required: true},
        regno: {type: String, required: true},
        suggestion: {type: String, required: true}
    },
    {collection: 'suggestion'}
)

const suggestion = mongoose.model('suggestionSchema', suggestionSchema)

module.exports = suggestion