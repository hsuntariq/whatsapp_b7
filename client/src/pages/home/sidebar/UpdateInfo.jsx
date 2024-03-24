import React, { useEffect, useState } from 'react'
import { FaPlus, FaSalesforce, FaUser } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { CircleLoader } from 'react-spinners'
import { useDispatch, useSelector } from 'react-redux'
import { reset, updateUserData } from '../../../features/authentication/authSlice'
import { toast } from 'react-toastify'
const UpdateInfo = ({ showSidebar, show, setShow }) => {

    const { user, isLoading, isSuccess, isError, message } = useSelector(state => state.auth)

    const dispatch = useDispatch()

    const [name, setName] = useState(user?.f_name)
    const [about, setAbout] = useState(user?.about)


    const [imagePreview, setImagePreview] = useState(null)
    const [image, setImage] = useState(null)
    const [imageLoading, setImageLoading] = useState(false)


    const handleChange = (e) => {
        const file = e.target.files[0];
        const imageURL = URL.createObjectURL(file);
        setImagePreview(imageURL)
        setImage(file)
    }


    const uploadImage = async () => {
        const data = new FormData();
        data.append('file', image)
        data.append('upload_preset', 'xola95pc');
        try {
            setImageLoading(true)
            const res = await fetch('https://api.cloudinary.com/v1_1/dyxoufsb0/image/upload', {
                method: 'POST',
                body: data
            })

            const imageURl = await res.json();
            setImageLoading(false)
            return imageURl.url

        } catch (error) {
            console.log(error)
        }
    }


    const handleUpdateInfo = async () => {
        const data = await uploadImage(image)
        const userData = {
            id: user?._id,
            image: data,
            about,
            name
        }

        dispatch(updateUserData(userData))

    }

    useEffect(() => {
        if (isError) {
            toast(message)
        }
        if (isSuccess) {
            toast.success('Data updated successfully')
        }

        dispatch(reset())
    }, [isSuccess, isError, message, dispatch])


    return (
        <>
            <div ref={showSidebar} style={{ height: '100%', transform: `${show ? 'translateX(0%)' : 'translateX(-100%)'}`, zIndex: '222', transition: 'all 0.5s', backgroundColor: '#EEEEEE' }} className="w-100  position-absolute">
                <div className="cross text-end">
                    <IoClose onClick={() => setShow(false)} size={40} cursor="pointer" />
                </div>

                {imagePreview ? (
                    <>

                        <div className="p-3 w-75 mx-auto" style={{ clipPath: 'circle()' }}>
                            <img width="100%" className='rounded-circle' src={imagePreview} alt="" />
                        </div>
                        <div className="choose position-relative">
                            <input type='file' onChange={handleChange} className='position-absolute' style={{ left: '40%', opacity: '0' }} />
                            <FaPlus cursor="pointer" size={40} className='d-block bg-dark text-white rounded-circle p-2 mx-auto' />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="p-3 w-75 mx-auto" style={{ clipPath: 'circle()' }}>
                            <img style={{ objectFit: 'cover' }} width="100%" className='d-block mx-auto' src="https://cdn-icons-png.flaticon.com/512/17/17004.png" alt="" />
                        </div>
                        <div className="choose position-relative">
                            <input type='file' onChange={handleChange} className='position-absolute' style={{ left: '40%', opacity: '0' }} />
                            <FaPlus cursor="pointer" size={40} className='d-block bg-dark text-white rounded-circle p-2 mx-auto' />
                        </div>
                    </>
                )}
                <div className="px-5">

                    <h4>Name</h4>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='form-control' />
                    <h4>About</h4>
                    <input type="text" value={about} onChange={(e) => setAbout(e.target.value)} className='form-control' />
                    <button onClick={handleUpdateInfo} className='btn w-100 my-2 btn-success'>
                        {imageLoading && isLoading ? <CircleLoader size={20} /> : 'Update Info'}
                    </button>
                </div>

            </div>
        </>
    )
}

export default UpdateInfo