const AsyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const registerUser = AsyncHandler(async (req, res) => {
    // get the data from the frontend
    const { f_name, l_name, email, password, dob, gender } = req.body;
    // check if user adds all the fields
    if (!f_name || !l_name || !email || !password || !dob || !gender) {
        res.status(400);
        throw new Error('Please enter all the fields')
    }

    // check if user is alreadt present

    const isUserPresent = await User.findOne({ email })
    // if user is present, throw an error
    if (isUserPresent) {
        res.status(400);
        throw new Error('User already exists')
    } else {

        // generate salt/gibberish
        const salt = await bcrypt.genSalt(10);
        // hash the password
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(hashedPassword)

        const createdUser = await User.create({
            f_name, l_name, email, password: hashedPassword, dob, gender
        })

        res.send(createdUser)
    }

})



const loginUser = AsyncHandler(async (req, res) => {
    // get the data from the user
    const { email, password } = req.body;
    // check if user adds the fields
    if (!email || !password) {
        res.status(400)
        throw new Error('Please enter all the fields');
    }

    // check if email/user exists
    const userExists = await User.findOne({ email });
    if (!userExists) {
        res.status(404);
        throw new Error('User not present');
    } else {
        // check if password also matches
        if (await bcrypt.compare(password, userExists.password)) {
            res.send(userExists);
        }
        // check if password is incorrect
        else {
            res.status(401);
            throw new Error('Invalid password')
        }
    }

    // check if user exists

})



// get the users

const getUsers = AsyncHandler(async (req, res) => {
    const users = await User.find();
    res.send(users)
})



const updateInfo = AsyncHandler(async (req, res) => {
    const { id, image, name, about } = req.body

    const findUser = await User.findOne({ _id: id })
    if (!findUser) {
        res.status(404);
        throw new Error('User not found')
    } else {
        findUser.image = image;
        findUser.f_name = name;
        findUser.about = about;
        await findUser.save()
    }

    res.send(findUser)

})



module.exports = {
    registerUser,
    loginUser,
    getUsers,
    updateInfo
}