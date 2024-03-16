import React, { useEffect, useRef, useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import { BsEmojiGrin } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addChatMessage } from '../../../features/chats/chatSlice';
import { ClockLoader } from 'react-spinners';
import ImagePanel from './ImagePanel';
import io from 'socket.io-client'
const socket = io.connect('http://localhost:3001')

const MessageFooter = ({ sendMessage, setSentMessages, setRoom, sentMessages, setMessage, handleInput, handleLeave, message, displayUserInfo }) => {
    const [show, setShow] = useState(false);
    const [showPanel, setShowPanel] = useState(false)
    const [active, setActive] = useState(false)
    const [imagePreview, setImagePreview] = useState(null);
    const [image, setImage] = useState(null);
    const inp = useRef();
    const { id } = useParams();
    const { chatLoading, chatSuccess, chatError, chats } = useSelector(state => state.chat)
    const [imageLoading, setImageLoading] = useState(false)
    // get the user from the state/redux
    const { user } = useSelector(state => state.auth)
    // get the id from the url

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

    const showMenu = () => {
        setShow(!show)

    }


    const handleImageChange = (e) => {
        const file = e.target.files[0]
        const imageURL = URL.createObjectURL(file);
        setImagePreview(imageURL)
        setImage(file)
    }




    useEffect(() => {
        inp.current.focus();
        setRoom()
    }, [id, displayUserInfo()?.f_name])



    // username = dyxoufsb0
    // upload_preset = xola95pc


    const handleImageUpload = async (e) => {
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'xola95pc');

        try {
            setImageLoading(true)
            const res = await fetch('https://api.cloudinary.com/v1_1/dyxoufsb0/image/upload', {
                method: 'POST',
                body: data
            })

            const imageObject = await res.json();
            setImageLoading(false)
            setImagePreview(null);
            setImage(null)
            return imageObject.url


        } catch (error) {
            console.log(error)
        }


    }

    const handleImageClick = async () => {
        const data = await handleImageUpload(image)
        socket.emit('send_message', { image: data, message })
        setSentMessages([...sentMessages, { image: data, message, sortID: Date.now(), roomID: chats?._id, sent: true }])
    }






    return (
        <>
            <div className="" style={{
                background: '#EEEEEE'
            }}>
                <div className="d-flex pe-3 justify-content-between p-2 align-items-center gap-4">
                    <div className="d-flex gap-2">
                        <div className="menu position-relative">
                            <ul className='position-absolute bg-secondary list-unstyled text-capitalize text-white' style={{
                                top: '-11rem',
                                scale: `${show ? '1' : '0'}`
                            }}>
                                <li className='py-3 px-4 list-menu' style={{ cursor: 'pointer' }}>document</li>
                                <li className='py-3 px-4 list-menu position-relative' style={{ cursor: 'pointer' }}>
                                    Image
                                    <input type="file" onChange={handleImageChange} className='position-absolute' style={{ left: '0', opacity: '0' }} />
                                </li>
                                <li className='py-3 px-4 list-menu' style={{ cursor: 'pointer' }}>audio</li>
                            </ul>
                            <FaPlus style={{
                                transform: `rotate(${show ? '45deg' : '0'})`,
                                transition: 'all 0.4s'
                            }} onClick={showMenu} size={25} />
                        </div>
                        <BsEmojiGrin size={25} />
                    </div>
                    <form className='w-100 d-flex align-items-center'>
                        <input onClick={handleInput} onBlur={handleLeave} ref={inp} value={message} onChange={handleChange}
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
                <ImagePanel imageLoading={imageLoading} handleImageClick={handleImageClick} setImagePreview={setImagePreview} imagePreview={imagePreview} />
            </div>
        </>
    )
}

export default MessageFooter