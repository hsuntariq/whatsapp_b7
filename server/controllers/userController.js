const AsyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const registerUser = AsyncHandler(async (req, res) => {
    // get the data from the frontend
    const { f_name, l_name, email, password, dob, gender } = req.body;
    // check if user adds all the fields
    if (!f_name || !l_name || !email || !password || !dob || !gender) {
        res.status(400);
        throw new Error('Please enter all the fields')
    }

    // check if user is alreadt present

    const isUserPresent = await User.find({ email })
    // if user is present, throw an error
    if (isUserPresent) {
        res.status(400);
        throw new Error('User already exists')
    } else {
        const createdUser = await User.create({
            f_name, l_name, email, password, dob, gender
        })

        res.send(createdUser)
    }






})

module.exports = {
    registerUser
}