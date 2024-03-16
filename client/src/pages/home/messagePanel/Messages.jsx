import React from 'react'
import { useSelector } from 'react-redux'

const Messages = ({ allMessages }) => {
    const { chats } = useSelector(state => state.chat);
    const { user } = useSelector(state => state.auth);

    const filteredMessage = () => {
        const myMessages = allMessages.filter((msgs) => {
            return msgs.roomID === chats?._id
        })

        return myMessages
    }



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
                {filteredMessage()?.map((msg, index) => {
                    return (
                        <>
                            {msg.sent ? (
                                <p className="bg-success p-3 text-white ms-auto rounded-3" style={{ width: 'max-content' }}>
                                    {msg?.image && (
                                        <div className='position-relative'>
                                            <img
                                                width={"200px"}
                                                height={"200px"}
                                                className="aspect-square object-cover"
                                                src={msg.image}
                                            />

                                        </div>


                                    )}
                                    {msg.message}
                                </p>
                            ) : (
                                <p className="bg-secondary p-3 text-white me-auto rounded-3" style={{ width: 'max-content' }}>
                                    {msg.image && <img src={msg.image} height={200} width={200} style={{ objectFit: 'cover' }} />}
                                    {msg.message}
                                </p>
                            )}

                        </>
                    )
                })}


            </div>

        </>
    )
}

export default Messages