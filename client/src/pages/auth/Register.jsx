import React from 'react'
import Header from '../../components/Header'
import LogForm from './LogForm'
import { useSelector } from 'react-redux'
import { CircleLoader } from 'react-spinners'

const Register = () => {
    const { isLoading } = useSelector(state => state.auth)
    return (
        <>
            <Header />
            {isLoading ? (
                <div className="d-flex justify-content-center align-items-center" style={{
                    height: '60vh',
                    width: '100vw'
                }}>
                    <CircleLoader color='#00A884' />
                </div>
            ) : (<LogForm />)}

        </>
    )
}

export default Register