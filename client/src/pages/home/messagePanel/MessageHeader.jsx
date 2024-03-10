import React, { useEffect } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import { MdDarkMode } from 'react-icons/md'
import { TbBrandStorytel } from 'react-icons/tb'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const MessageHeader = ({ displayUserInfo, typing }) => {

    // destructure
    // const { f_name, l_name } = displayUserInfo()

    return (
        <>
            <div style={{
                background: '#EEEEEE'
            }} className="d-flex p-2 ps-4  align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-3">

                    <div className="image rounded-circle bg-secondary  p-2 ">
                        <FaUser className='fs-2 text-white ' />
                    </div>
                    <div className="flex flex-column">
                        <h5 className='text-capitalize'>{`${displayUserInfo()?.f_name} ${displayUserInfo()?.l_name}`}</h5>
                        {typing && 'Typing...'}
                    </div>
                </div>

                <div className="d-flex gap-4 fs-4">
                    <TbBrandStorytel />
                    <MdDarkMode />
                    <BsThreeDotsVertical />
                </div>
            </div>
        </>
    )
}

export default MessageHeader