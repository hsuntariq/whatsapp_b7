import React, { useEffect, useState } from 'react'
import MessageHeader from './MessageHeader'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import MessageFooter from './MessageFooter'
import Messages from './Messages'

import io from 'socket.io-client'
import { addChatMessage } from '../../../features/chats/chatSlice'
const socket = io.connect('http://localhost:3001')



const MessageScreen = () => {
    const dispatch = useDispatch()
    const [typing, setTyping] = useState();
    const { id } = useParams()
    const { allUsers, user } = useSelector(state => state.auth);
    const { chats } = useSelector(state => state.chat);
    const [message, setMessage] = useState('')
    const [sentMessages, setSentMessages] = useState([]);
    const [receivedMessages, setReceivedMessages] = useState([])
    const displayUserInfo = () => {
        const foundUser = allUsers?.find((myUser) => {
            return myUser?._id === id
        })

        return foundUser;
    }

    useEffect(() => {
        displayUserInfo();
    }, [id])



    const sendMessage = (e) => {
        e.preventDefault();
        const chatData = {
            sender_id: user?._id, receiver_id: id, message
        }
        // for the backend
        socket.emit('send_message', { message, roomID: chats?._id })
        // for frontend display
        setSentMessages([...sentMessages, { message, sent: true, sortID: Date.now(), roomID: chats?._id }])

        dispatch(addChatMessage(chatData))
        setMessage('')



    }


    const allMessages = [...sentMessages, ...receivedMessages].sort((a, b) => {
        return a.sortID - b.sortID;
    })
    useEffect(() => {
        socket.on('received_message', (data) => {
            setReceivedMessages([...receivedMessages, { message: data.message, sent: false, sortID: Date.now(), roomID: chats?._id, image: data.image }])
        })
        console.log(sentMessages)
    }, [receivedMessages])


    const setRoom = () => {
        socket.emit('join_room', { roomID: chats?._id })
    }


    const handleInput = () => {
        setRoom();
        socket.emit('typing', { typing: true, roomID: chats?._id })
    }

    const handleLeave = () => {
        socket.emit('leave', { typing: false, roomID: chats?._id })
    }

    useEffect(() => {
        socket.on('show_typing', () => {
            setTyping(true)
        })

        socket.on('left', () => {
            setTyping(false)
        })



    }, [socket])




    return (
        <>
            <div className="w-100 position-relative d-flex flex-column justify-content-between" style={{
                backgroundImage: `url(${displayUserInfo()?.chatTheme})`,
                height: '100vh',
                backgroundSize: 'contain',
                backgroundPosition: 'center center'
            }}>
                <MessageHeader typing={typing} displayUserInfo={displayUserInfo} />
                <Messages allMessages={allMessages} />
                <MessageFooter sentMessages={sentMessages} setSentMessages={setSentMessages} handleLeave={handleLeave} handleInput={handleInput} setRoom={setRoom} displayUserInfo={displayUserInfo} sendMessage={sendMessage} message={message} setMessage={setMessage} />
            </div>
        </>
    )
}

export default MessageScreen