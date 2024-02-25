import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import MessageScreen from './MessageScreen'
import Sidebar from '../sidebar/Sidebar'

const Main = () => {
    const [darkMode, setDarkMode] = useState(false)
    return (
        <>
            <Row>
                <Col className='p-0' xl={3} lg={4} md={5}>
                    <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
                </Col>
                <Col className='p-0' xl={9} lg={8} md={7}>
                    <MessageScreen />
                </Col>
            </Row>
        </>
    )
}

export default Main