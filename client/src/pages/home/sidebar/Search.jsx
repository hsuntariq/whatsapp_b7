import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { IoArrowBack } from "react-icons/io5";
import './sidebar.css'
const Search = ({ search, setSearch, darkMode }) => {
    const [active, setActive] = useState(false);
    return (
        <>
            <form>
                <div className="d-flex align-items-center px-3 border rounded-1 my-2 mx-auto" style={{ width: '95%' }}>
                    {active ? (
                        <IoArrowBack size={20} />
                    ) : (
                        <CiSearch size={20} />
                    )}
                    <input value={search} onChange={(e) => setSearch(e.target.value)} style={{
                        color: `${darkMode ? 'white' : 'black'}`,
                    }} onBlur={() => setActive(false)} onFocus={() => setActive(true)} type="text" placeholder='Search or start a new chat' className="form-control border-0 bg-transparent" />
                </div>
            </form>
        </>
    )
}

export default Search