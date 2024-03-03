import React, { useReducer } from 'react'
import { FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { addChatData } from '../../../features/chats/chatSlice';

const SingleUser = ({ _id, f_name, l_name, image, darkMode }) => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth);
    const handleAddChat = () => {
        const userData = {
            receiver_id: _id, sender_id: user?._id
        }
        dispatch(addChatData(userData))
    }
    return (
        <>
            <Link onClick={handleAddChat} to={`/home/message-panel/${_id}`} style={{
                backgroundColor: `${darkMode ? '#121C24' : '#EEEEEE'}`,
                color: `${darkMode ? 'white' : 'black'}`,
            }} className="d-flex text-dark text-decoration-none gap-3 px-4 py-1">
                <div className="image">
                    <div className="image p-2 rounded-circle bg-secondary ">
                        {image ? (
                            <img width={'100%'} src={image} alt="" />
                        ) : (
                            <FaUser className='fs-2 text-white ' />
                        )}
                    </div>
                </div>
                <div className="d-flex justify-content-between w-100" style={{
                    backgroundColor: `${darkMode ? '#121C24' : '#EEEEEE'}`,
                    color: `${darkMode ? 'white' : 'black'}`,
                }}>
                    <div className="user-info" >
                        <h5>{`${f_name} ${l_name}`}</h5>
                        <p>This is a message</p>
                    </div>
                    <div className="time">
                        <p>02:10</p>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default SingleUser