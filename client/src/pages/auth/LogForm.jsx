import { Button, Col, Row } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import RegForm from './RegForm'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, reset } from '../../features/authentication/authSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const LogForm = () => {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // get the state values

    const { user, isLoading, isSuccess, isError, message } = useSelector(state => state.auth);


    // check if error change 
    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        else if (isSuccess) {
            navigate('/home')
        }

        dispatch(reset())
    }, [isError, message])


    const [formFields, setFormFields] = useState({
        email: '', password: ''
    });
    // destructure
    const { email, password } = formFields;

    // handle the change

    const handleChange = (e) => {
        setFormFields((prevValue) => ({
            ...prevValue,
            [e.target.name]: e.target.value
        }))
    }


    const handleLogin = () => {
        const values = {
            email, password
        }

        dispatch(loginUser(values))

    }


    return (
        <>
            {show && <RegForm setShow={setShow} />}
            <div style={{
                marginTop: '-3rem'
            }} className="col-lg-8 p-5 mx-auto bg-white shadow-lg">
                <div className="card p-2 mx-auto w-75 mx-auto">
                    <div className="d-flex align-items-center gap-4">
                        <div className="d-flex align-items-center">
                            <img width={'100px'} src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/WhatsApp_icon.png/479px-WhatsApp_icon.png" alt="" />
                            <div className="content">
                                <p>Lorem ipsum dolor sit amet consectetur.</p>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur!</p>
                            </div>
                        </div>
                        <Button className='align-self-center'>Get App</Button>
                    </div>
                </div>
                <Row className='my-4 align-items-center'>
                    <Col lg={8}>
                        <h1 className="display-6">
                            Use Whatsapp on your computer
                        </h1>
                        <ol className='d-flex flex-column gap-4 fs-5'>
                            <li>Open Whatsapp on your computer</li>
                            <li>tap <b>Menu</b> on Android, or <b>Settings</b> on iPhone</li>
                            <li>tap <b>linked devices</b> and then  <b>link a device</b> </li>
                            <li>tap <b>linked devices</b> and then  <b>link a device</b> </li>
                        </ol>
                    </Col>
                    <Col lg={4}>
                        <form>
                            <label htmlFor="">Username</label>
                            <input name='email' value={email} onChange={handleChange} className='form-control' type="text" placeholder='Enter your registed email' />
                            <label htmlFor="">Password</label>
                            <input name='password' value={password} onChange={handleChange} className='form-control' type="password" placeholder='Enter your password' />
                            <Button onClick={handleLogin} style={{
                                background: '#00A884'
                            }} className='w-100 my-2 border-0 fw-bold'>
                                Login
                            </Button>
                        </form>
                        <p style={{
                            color: '#00A884'
                        }}>
                            New to the App? <b style={{ cursor: 'pointer' }} onClick={() => setShow(true)}>Register Now</b>
                        </p>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default LogForm