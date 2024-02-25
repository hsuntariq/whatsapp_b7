import React from 'react'
import bg from '../../assets/image/bg.jpg'
const Welcome = () => {
    return (
        <>
            <div className="w-100" style={{
                height: '100vh',
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center'
            }}>

            </div>
        </>
    )
}

export default Welcome