import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { useCreateOrderMutation } from '../slices/orderApiSlice';
import CheckoutSteps from '../component/CheckoutSteps';
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import Message from '../component/Message';
import e from 'express';

const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart)
    const [ceateOrder, {isLoading, error}] = useCreateOrderMutation();

    useEffect(()=>{
        if(!cart.shippingAddress.address){
            navigate('/shipping')
        }
        else if (!cart.paymentMethod){
            navigate('/patment')
        }
    },[cart.paymentMethod, cart.shippingAddress.address, navigate]);

    // Btn
    const placeOrderHandler = (e) => {
        // e.preventDefault();
        console.log("hi")
    }

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4/>
            <Row>
                <Col md={8}>

                    {/* Address */}
                    <ListGroup.Item variant='flush'>
                        <h2>Shipping</h2>
                            <p>
                                {/* cart.shippingAddress.address เอามาจาก redux */}
                                <strong>Address :</strong>{" "}{cart.shippingAddress.address}{" "}{cart.shippingAddress.city}{" "}{cart.shippingAddress.postalCode}{" "}{cart.shippingAddress.country}
                            </p>
                    </ListGroup.Item>

                    {/* Payment */}
                    <ListGroup.Item>
                        <h2>PaymentMethod</h2>
                        <strong>Method :</strong>{" "}{cart.paymentMethod}
                    </ListGroup.Item>

                    {/* Order */}
                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {cart.cartItems.length === 0 ? (
                            <Message>ตะตร้าสินค้าของคุณว่างเปล่า</Message>
                        ) : (
                            <ListGroup variant='flush'>

                                {/* cart.cartItems = item */}
                                {cart.cartItems.map((item,index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            {/* image */}
                                            <Col md={2}>
                                                <Image
                                                alt={item.name}
                                                src={item.image}
                                                fluid
                                                rounded
                                                />
                                            </Col>
                                            
                                            {/* Name */}
                                            <Col>
                                                <Link to={`/products/${item._id}`}>{item.name}</Link>
                                            </Col>

                                            {/* Price */}
                                            <Col md={4}>
                                                {item.qty} x {item.price} = ${item.qty*item.price}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroup.Item>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h4>สรุปยอดคำสั่งซื้อ</h4>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Item : </Col>
                                    <Col>
                                        {cart.itemsPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping : </Col>
                                    <Col>
                                        ${cart.shippingPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax : </Col>
                                    <Col>
                                        ${cart.taxPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total : </Col>
                                    <Col>
                                        ${cart.totalPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>

                            {/* Button */}
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btnt-green'
                                    disabled={cart.cartItems.length === 0}
                                    onClick={placeOrderHandler}
                                    >Place Order</Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen