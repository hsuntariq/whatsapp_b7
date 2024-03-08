import React, { useEffect, useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import { BsEmojiGrin } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addChatMessage } from '../../../features/chats/chatSlice';
import { ClockLoader } from 'react-spinners';


const MessageFooter = ({ sendMessage, setMessage, message }) => {
    const [active, setActive] = useState(false)

    const { chatLoading, chatSuccess, chatError } = useSelector(state => state.chat)

    // get the user from the state/redux
    const { user } = useSelector(state => state.auth)
    // get the id from the url
    const { id } = useParams()

    // get the dispatch to dispatch the functions

    const dispatch = useDispatch()

    useEffect(() => {
        if (message.length > 0) {
            setActive(true)
        } else {
            setActive(false)
        }
    }, [message])


    const handleChange = (e) => {
        setMessage(e.target.value)
    }











    return (
        <>
            <div className="" style={{
                background: '#EEEEEE'
            }}>
                <div className="d-flex pe-3 justify-content-between p-2 align-items-center gap-4">
                    <div className="d-flex gap-2">
                        <FaPlus size={25} />
                        <BsEmojiGrin size={25} />
                    </div>
                    <form className='w-100 d-flex align-items-center'>
                        <input value={message} onChange={handleChange}
                            type="text" placeholder='Type a message...' className="form-control w-100" />

                    </form>
                    <div className="mic">
                        {active ? (
                            <>
                                {chatLoading ? (<ClockLoader size={25} color="gray" />
                                ) : (<IoMdSend onClick={sendMessage} size={25} />)}
                            </>
                        ) : (<FaMicrophone size={25} />)}

                    </div>
                </div>
            </div>
        </>
    )
}

export default MessageFooter