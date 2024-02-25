import React, { useState } from 'react'
import SidebarHeader from './SidebarHeader'
import Search from './Search'
import UserData from './UserData'

const Sidebar = ({ darkMode, setDarkMode }) => {
    const [search, setSearch] = useState('')
    return (
        <>
            <div className="w-100 border-end " style={{
                height: '100vh',
                backgroundColor: `${darkMode ? '#121C24' : '#EEEEEE'}`,
                color: `${darkMode ? 'white' : 'black'}`,
            }}>
                <SidebarHeader darkMode={darkMode} setDarkMode={setDarkMode} />
                <Search darkMode={darkMode} setDarkMode={setDarkMode} search={search} setSearch={setSearch} />
                <UserData darkMode={darkMode} setDarkMode={setDarkMode} search={search} />
            </div>
        </>
    )
}

export default Sidebar