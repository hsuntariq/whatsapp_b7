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

    const { id } = useParams()
    const { allUsers, user } = useSelector(state => state.auth);
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
        socket.emit('send_message', { message })
        // for frontend display
        setSentMessages([...sentMessages, { message, sent: true, sortID: Date.now() }])

        dispatch(addChatMessage(chatData))
        setMessage('')



    }

    useEffect(() => {
        socket.on('received_message', (data) => {
            setReceivedMessages([...receivedMessages, { message: data.message, sent: false, sortID: Date.now() }])
        })
    }, [receivedMessages])

    const allMessages = [...sentMessages, ...receivedMessages].sort((a, b) => {
        return a.sortID - b.sortID;
    })




    return (
        <>
            <div className="w-100 position-relative d-flex flex-column justify-content-between" style={{
                backgroundImage: `url(${displayUserInfo()?.chatTheme})`,
                height: '100vh',
                backgroundSize: 'contain',
                backgroundPosition: 'center center'
            }}>
                <MessageHeader displayUserInfo={displayUserInfo} />
                <Messages allMessages={allMessages} />
                <MessageFooter sendMessage={sendMessage} message={message} setMessage={setMessage} />
            </div>
        </>
    )
}

export default MessageScreen