const mongoose = require('mongoose');


// build the schema
const chatSchema = mongoose.Schema({
    users: {
        type: Array,
        default: []
    },
    chats: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Chats', chatSchema);