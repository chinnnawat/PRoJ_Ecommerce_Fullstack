import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'
import Message from '../component/Message'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../slices/cartSlice'

const CartScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state)=>state.cart);
    const { cartItems } = cart;

    const addToCartHandler = async (product, qty) => {
        dispatch(addToCart({...product, qty}))
    }

    return (
        <Row>
            <Col md={8}>
                <h1 style={{marginBottom: '20px'}}>Shopping</h1>
                {cartItems.length === 0 ? (
                    <Message>
                        Your Cart is empty <Link to='/'>Go Back</Link>
                    </Message>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map((item) => (
                            <ListGroup.Item key={item._id}>
                                <Row>
                                    {/* Image */}
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                    </Col>
                                    {/* Product Name */}
                                    <Col md={3}>
                                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                                    </Col>
                                    {/* Price */}
                                    <Col md={2}>
                                        {item.price} บาท
                                    </Col>
                                    {/* QTY */}
                                    <Col md={2}>
                                        <Form.Control
                                            as = 'select'
                                            value = {item.qty}
                                            onChange = {(e) => addToCartHandler(item, Number(e.target.value))}
                                            >
                                                {[...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={x+1} value={x+1}>
                                                        {x+1}
                                                    </option>
                                                ))}
                                        </Form.Control>
                                    </Col>
                                    {/* Trash */}
                                    <Col md={2}>
                                        <Button type='button' variant='light'>
                                            <FaTrash/>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={3}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>
                                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                            </h2>
                            {cartItems.reduce((acc, item) => acc + (item.qty * item.price), 0).toFixed(2)}
                        </ListGroup.Item>
                    </ListGroup>
                    <ListGroup.Item>
                        <Button type='button' className='btn-block' disabled={cartItems.length === 0}>
                            Process To Checkout
                        </Button>
                    </ListGroup.Item>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen