import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import FormContainer from '../component/FormContainer';
import { Form, Button } from 'react-bootstrap';
import { saveShippingAddress } from '../slices/cartSlice';
import CheckoutSteps from '../component/CheckoutSteps';

const ShippingScreen = () => {
    // redux
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress?.address || '');
    const [city, setCity] = useState(shippingAddress?.address || '');
    const [postalCode, setPostalCode] = useState(shippingAddress?.address || '');
    const [country, setCountry] = useState(shippingAddress?.address || '');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Handler
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({address,city,postalCode,country}));
        navigate('/payment');
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 step4/>
            <h1>ShippingCart</h1>
            <Form onSubmit={submitHandler}>
                {/* Address */}
                <Form.Group controlId='address' className='my-2'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                    type='text'
                    placeholder='Enter Address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                {/* City */}
                <Form.Group controlId='city' className='my-2'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                    type='text'
                    placeholder='Enter City'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                {/* PostalCode */}
                <Form.Group controlId='postalcode' className='my-2'>
                    <Form.Label>PostalCode</Form.Label>
                    <Form.Control
                    type='text'
                    placeholder='Enter PostalCode'
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                {/* Country */}
                <Form.Group controlId='country' className='my-2'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                    type='text'
                    placeholder='Enter Country'
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                {/* Button */}
                <Button type='submit' variant='primary' className='btnt-green mt-4' style={{width:'100%'}}>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen