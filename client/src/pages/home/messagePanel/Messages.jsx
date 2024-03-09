import React from 'react'
import { useSelector } from 'react-redux'

const Messages = ({ allMessages }) => {
    const { chats } = useSelector(state => state.chat);
    const { user } = useSelector(state => state.auth);

    return (
        <>
            <div style={{
                height: "80%",
                top: '10%',
                overflowY: 'scroll'
            }} className="position-absolute w-100 px-2">

                {/* {chats?.chats?.map((chat, index) => {
                    return (
                        <>
                            <p key={index} style={{ width: 'max-content' }} className={`${chat?.sender_id === user?._id ? 'bg-success ms-auto' : 'bg-secondary me-auto'} text-white px-3 py-1 rounded-pill `}>
                                {chat.message}
                            </p>
                        </>
                    )
                })} */}
                {allMessages.map((msg, index) => {
                    return (
                        <>
                            <p key={index} style={{ width: 'max-content' }} className={`${msg.sent ? 'bg-success ms-auto' : 'bg-secondary me-auto'} text-white px-3 py-1 rounded-pill `}>
                                {msg.message}
                            </p>
                        </>
                    )
                })}


            </div>

        </>
    )
}

export default Messages