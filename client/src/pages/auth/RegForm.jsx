import { Button } from 'react-bootstrap'
import React from 'react'

const RegForm = () => {
    return (
        <>
            <div className="col-lg-8 p-5 mx-auto bg-white shadow-lg">
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
            </div>
        </>
    )
}

export default RegForm