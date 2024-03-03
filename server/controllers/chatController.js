
const AsyncHandler = require('express-async-handler');
const Chats = require('../models/chatModel');
const { v4: uuidv4 } = require('uuid')
const addChat = AsyncHandler(async (req, res) => {

    // get the sender id and receiver id
    const { sender_id, receiver_id } = req.body;
    // cherck if chat already exists
    const findChat = await Chats.findOne({
        users: { $all: [sender_id, receiver_id] }
    });

    if (findChat) {
        res.send(findChat)
    } else {
        const newChat = await Chats.create({
            users: [sender_id, receiver_id], chats: []
        })
        res.send(newChat)
    }

})



const addMessage = AsyncHandler(async (req, res) => {
    // get the data from the frontend
    const { sender_id, receiver_id, message } = req.body;
    // get/find the users chat
    const findChat = await Chats.findOne({
        users: { $all: [sender_id, receiver_id] }
    });
    try {
        // save the message in the database
        findChat.chats.push({
            message, id: uuidv4(), time: Date.now(), sender_id, receiver_id
        })
        await findChat.save();
        res.send(findChat)
    } catch (error) {
        throw new Error(error)
    }


})



module.exports = {
    addChat,
    addMessage
}