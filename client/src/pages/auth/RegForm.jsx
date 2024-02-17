import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { IoClose } from "react-icons/io5";
import { toast } from 'react-toastify';

const RegForm = ({ setShow }) => {

    const [formFields, setFormFields] = useState({
        f_name: '', l_name: '', email: '', password: '', confirm_pass: '', date: '', month: '', year: '', gender: ''
    })

    // destructure
    const { f_name, l_name, email, password, confirm_pass, date, month, year, gender } = formFields;




    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',]


    const getYears = () => {
        let years = [];
        const date = new Date();
        let currentYear = date.getFullYear();
        while (currentYear >= 1905) {
            years.push(currentYear);
            currentYear--;
        }

        return years


    }


    // handle the input chage

    const handleChange = (e) => {
        setFormFields((prevValue) => ({
            ...prevValue,
            [e.target.name]: e.target.value
        }))
    }


    const handleRegister = (e) => {
        e.preventDefault()

        if (!f_name || !l_name || !email || !password || !confirm_pass || !date || !month || !year || !gender) {
            toast.error('Please enter all the fields')
        }

        else if (password !== confirm_pass) {
            toast.error('Passwords do not match')
        } else {
            toast.success('Welcome')
        }
    }





    return (
        <>
            <div className="underlay d-flex align-items-center justify-content-center" style={{
                height: '100vh',
                width: '100vw',
                position: 'fixed',
                top: '0',
                background: 'rgba(0,0,0,0.7)',
                zIndex: '444'
            }}>
                <form className='bg-white p-5 shadow-lg position-relative'>
                    <IoClose onClick={() => setShow(false)} cursor="pointer" size={30} className='position-absolute' style={{
                        right: '10px',
                        top: '10px'
                    }} />
                    <h5>Sign Up</h5>
                    <p className="text-secondary">
                        It's quick and easy
                    </p>
                    <hr />
                    <div className="d-flex gap-2">
                        <input name="f_name" onChange={handleChange} value={f_name} type="text" placeholder='First name' className="form-control " />
                        <input name="l_name" onChange={handleChange} value={l_name} type="text" placeholder='Last name' className="form-control " />
                    </div>
                    <input name="email" onChange={handleChange} value={email} type="text" placeholder='Email ' className="form-control my-2" />
                    <input name="password" onChange={handleChange} value={password} type="password" placeholder='password' className="form-control my-2" />
                    <input name="confirm_pass" onChange={handleChange} value={confirm_pass} type="password" placeholder='confirm password' className="form-control my-2" />
                    <label htmlFor="">Date of Birth</label>
                    <div className="d-flex gap-2">
                        <select name="date" onChange={handleChange} value={date} className='form-control my-2' id="">
                            {Array.from({ length: 31 }).map((_, index) => {
                                return <option key={index} value={index + 1}>
                                    {index + 1}
                                </option>
                            })}
                        </select>
                        <select name="month" onChange={handleChange} value={month} className='form-control my-2' id="">
                            {months.map((month, index) => {
                                return <option key={index} value={month}>
                                    {month}
                                </option>
                            })}
                        </select>
                        <select name="year" onChange={handleChange} value={year} className='form-control my-2' id="">
                            {getYears().map((years, index) => {
                                return <option key={index} value={years}>
                                    {years}
                                </option>
                            })}
                        </select>
                    </div>
                    <label htmlFor="">gender</label>
                    <div className="d-flex gap-2">
                        <div className="d-flex w-100 border p-2 justify-content-between rounded-2">
                            <label htmlFor="">Female</label>
                            <input onChange={handleChange} value="female" type="radio" className='form-check' name="gender" id="" />
                        </div>
                        <div className="d-flex w-100 border p-2 justify-content-between rounded-2">
                            <label htmlFor="">Male</label>
                            <input onChange={handleChange} value="male" type="radio" className='form-check' name="gender" id="" />
                        </div>
                    </div>
                    <Button onClick={handleRegister} style={{
                        background: '#00A884'
                    }} className='w-50 d-block mx-auto my-2 border-0 fw-bold'>
                        Sign Up
                    </Button>
                </form>
            </div>
        </>
    )
}

export default RegForm