const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    f_name: {
        type: String,
        required: [true, 'please enter name']
    },
    l_name: {
        type: String,
        required: [true, 'please enter last name']
    },
    email: {
        type: String,
        required: [true, 'please enter email']
    },
    password: {
        type: String,
        required: [true, 'please enter password']
    },
    dob: {
        type: Date,
        required: [true, 'please enter DOB']
    },
    gender: {
        type: String,
        required: [true, 'please enter gender']
    },
    image: {
        type: String,
        required: false,
        default: null
    },
    about: {
        type: String,
        required: false,
        default: "Hey there, I'm using Whatsapp👋"
    },
    status: {
        type: Array,
        required: false,
        default: [],
    },
    chatTheme: {
        type: String,
        required: false,
        default: 'https://github.com/hsuntariq/TalkTango/blob/main/client/src/assets/background.jpg?raw=true'
    },
    active: {
        type: Boolean,
        default: 0,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema);

