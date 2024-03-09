import React from 'react'

const ImagePanel = ({ imagePreview }) => {
    console.log(imagePreview)
    return (
        <>
            <div style={{
                height: '100vh',
                width: '100%',
                transform: `translateY(${imagePreview ? '-100%' : '100%'})`,
                transition: 'all 0.3s'
            }} className="bg-dark position-absolute">
                <div className="w-75 mx-auto">
                    <img width={'100%'} src={imagePreview} alt="" />
                </div>
            </div>
        </>
    )
}

export default ImagePanel