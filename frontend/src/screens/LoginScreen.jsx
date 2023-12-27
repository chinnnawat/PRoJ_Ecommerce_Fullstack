import React, { useState } from 'react'
import FormContainer from '../component/FormContainer';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = (e) => {
        e.preventDefault()
        console.log("Submit")
    }

    return (
        <FormContainer>
            <h1>SignIn</h1>
            <Form onSubmit={submitHandler}>
                {/* Email */}
                <Form.Group controlId='email' className='my-3'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                {/* Password */}
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                {/* Button */}
                <Button type='submit' variant='primary' className='mt-2'>
                    SignIn
                </Button>
            </Form>

            {/* New Customer */}
            <Row>
                <Col>
                    New Customer ? <Link to='/register'>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen