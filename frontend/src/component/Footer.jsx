import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Footer = () => {

    const currentYear = new Date().getFullYear()

    return (
        <footer>
            <Container>
                <Row>
                    <Col className='text-start py-3'>
                        <p>{currentYear} Phaithong IceCream</p>
                    </Col>
                    <Col className='text-center py-3'>
                        <p>chinnawat.wongket@gmail.com</p>
                    </Col>
                    <Col className='text-end py-3'>
                        <p>payment</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer