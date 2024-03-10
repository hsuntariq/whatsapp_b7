import React from 'react'
import { IoMdClose } from "react-icons/io";
import { IoIosSend } from "react-icons/io";
import { CircleLoader } from 'react-spinners';

const ImagePanel = ({ imagePreview, setImagePreview, handleImageClick, imageLoading }) => {
    return (
        <>
            <div style={{
                height: '100vh',
                width: '100%',
                transform: `translateY(${imagePreview ? '-100%' : '100%'})`,
                transition: 'all 0.3s'
            }} className="bg-dark position-absolute">
                <div className="close text-end me-5">
                    <IoMdClose cursor="pointer" onClick={() => setImagePreview(null)} size={40} color='white' />
                </div>
                <div className="w-75 mx-auto">
                    <img width={'100%'} src={imagePreview} alt="" />
                    <div className="d-flex px-4 border bg-white my-4 align-items-center rounded-pill">

                        <input type="text" placeholder='Say something...' className='form-control border-0 bg-transparent' />
                        {imageLoading ? (
                            <CircleLoader size={30} />
                        ) : (<IoIosSend onClick={handleImageClick} size={30} />)}

                    </div>
                </div>
            </div>
        </>
    )
}

export default ImagePanel