import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Sidebar from './sidebar/Sidebar'
import Welcome from './Welcome'
const Home = () => {
    const [darkMode, setDarkMode] = useState(false)
    return (
        <>
            <Row>
                <Col className='p-0' xl={3} lg={4} md={5}>
                    <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
                </Col>
                <Col className='p-0' xl={9} lg={8} md={7}>
                    <Welcome />
                </Col>
            </Row>
        </>
    )
}

export default Home