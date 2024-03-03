import React, { useEffect } from 'react'
import MessageHeader from './MessageHeader'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import MessageFooter from './MessageFooter'
import Messages from './Messages'

const MessageScreen = () => {
    const { id } = useParams()
    const { allUsers } = useSelector(state => state.auth);

    const displayUserInfo = () => {
        const foundUser = allUsers?.find((myUser) => {
            return myUser?._id === id
        })

        return foundUser;
    }

    useEffect(() => {
        displayUserInfo();
    }, [id])

    return (
        <>
            <div className="w-100 position-relative d-flex flex-column justify-content-between" style={{
                backgroundImage: `url(${displayUserInfo()?.chatTheme})`,
                height: '100vh',
                backgroundSize: 'contain',
                backgroundPosition: 'center center'
            }}>
                <MessageHeader displayUserInfo={displayUserInfo} />
                <Messages />
                <MessageFooter />
            </div>
        </>
    )
}

export default MessageScreen