import React, { useRef, useState } from 'react'
import SidebarHeader from './SidebarHeader'
import Search from './Search'
import UserData from './UserData'
import UpdateInfo from './UpdateInfo'

const Sidebar = ({ darkMode, setDarkMode }) => {
    const [search, setSearch] = useState('')
    const showSidebar = useRef()
    const [show, setShow] = useState(false);
    return (
        <>
            <div className="w-100 border-end position-relative " style={{
                height: '100vh',
                backgroundColor: `${darkMode ? '#121C24' : '#EEEEEE'}`,
                color: `${darkMode ? 'white' : 'black'}`,
            }}>
                <UpdateInfo setShow={setShow} show={show} showSidebar={showSidebar} />
                <SidebarHeader setShow={setShow} darkMode={darkMode} setDarkMode={setDarkMode} />
                <Search darkMode={darkMode} setDarkMode={setDarkMode} search={search} setSearch={setSearch} />
                <UserData darkMode={darkMode} setDarkMode={setDarkMode} search={search} />
            </div>
        </>
    )
}

export default Sidebar