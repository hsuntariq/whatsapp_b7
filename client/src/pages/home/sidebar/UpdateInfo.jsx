import React, { useState } from 'react'
import { FaPlus, FaUser } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'

const UpdateInfo = ({ showSidebar, show, setShow }) => {

    const [imagePreview, setImagePreview] = useState(null);
    const [image, setImage] = useState(null)
    const [imageLoading, setImageLoading] = useState(false);

    const handleUserImage = (e) => {
        const file = e.target.files[0];
        const fileURL = URL.createObjectURL(file);
        setImagePreview(fileURL)
        setImage(file);
    }

    return (
        <>
            <div ref={showSidebar} style={{ height: '100%', transform: `${show ? 'translateX(0%)' : 'translateX(-100%)'}`, zIndex: '222', transition: 'all 0.5s' }} className="w-100 bg-danger position-absolute">
                <div className="cross text-end">
                    <IoClose onClick={() => setShow(false)} size={40} cursor="pointer" />
                </div>
                <div className="position-relative user-image  bg-secondary text-white p-5 text-center " style={{ width: '50%', margin: 'auto' }}>
                    {imagePreview ? (
                        <img width={100} height={100} src={imagePreview} alt="" />
                    ) : (
                        <FaUser size={100} />

                    )}
                    <div className="add bg-dark p-3 rounded-circle position-absolute" style={{ zIndex: '666' }}>
                        <FaPlus />
                        <input onChange={handleUserImage} type='file' className='position-absolute' style={{ opacity: '0' }} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateInfo