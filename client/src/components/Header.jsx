import React from 'react'

const Header = () => {
    return (
        <>
            <div style={{
                background: '#00A884',
                height: '200px'
            }} className="">
                <div className="d-flex col-lg-8 mx-auto align-items-center gap-2 text-white p-5">
                    <img width={'45px'} src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/WhatsApp_icon.png/479px-WhatsApp_icon.png" alt="" />
                    <h6 className='text-uppercase'>Whatsapp web</h6>
                </div>
            </div>
        </>
    )
}

export default Header