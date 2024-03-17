import React from 'react'
import { FaUser } from 'react-icons/fa'
import { TbBrandStorytel } from "react-icons/tb";
import { MdDarkMode } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSunnyOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';

const SidebarHeader = ({ darkMode, setDarkMode, setShow }) => {
    const { user } = useSelector(state => state.auth)
    const showSidebar = () => {
        setShow(true)
    }
    return (
        <>
            <div style={{
                backgroundColor: `${darkMode ? '#121C24' : '#EEEEEE'}`,
                color: `${darkMode ? 'white' : 'black'}`,
            }} className="d-flex p-2 ps-4  align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-3">

                    <div onClick={showSidebar} className="image p-2 rounded-circle bg-secondary ">
                        <FaUser className='fs-2 text-white ' />
                    </div>
                    <h5>{user?.f_name}</h5>
                </div>
                <div className="d-flex gap-4 fs-4 align-items-center">
                    <TbBrandStorytel />
                    <div className="modes position-relative">

                        {darkMode ? (
                            <IoSunnyOutline className='mode' onClick={() => setDarkMode(false)} />
                        ) : (

                            <MdDarkMode className='mode' onClick={() => setDarkMode(true)} />
                        )}
                        <div className="text bg-secondary text-white fs-6 p-1 position-absolute" style={{
                            width: 'max-content'
                        }}>
                            {darkMode ? 'Light Mode' : 'Dark Mode'}
                        </div>
                    </div>
                    <BsThreeDotsVertical />
                </div>
            </div>
        </>
    )
}

export default SidebarHeader