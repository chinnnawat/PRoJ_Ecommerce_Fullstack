import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { Col, Form, Button } from 'react-bootstrap'
import FormContainer from '../component/FormContainer';
import CheckoutSteps from '../component/CheckoutSteps';
import { savePaymentMethod } from '../slices/cartSlice';

const PaymentScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const cart = useSelector((state) => state.cart)
    const {shippingAddress } = cart;

    useEffect(()=>{
        if(!shippingAddress){
            navigate('/shipping')
        }
    },[shippingAddress , navigate])

    // Handler
    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 step4 />
            <h1>Payment Methods</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                        // กำหนดให้ Form.Check เป็น radio button.
                        type='radio'
                        className='my-2'
                        label='Paypal or Credit Card'
                        id='PayPal'
                        name='paymentMethod'
                        value='Paypal'
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}>
                        </Form.Check>
                    </Col>
                </Form.Group>

                {/* Button */}
                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen