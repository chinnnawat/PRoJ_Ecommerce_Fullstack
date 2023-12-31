import React from 'react';
import Message from '../component/Message.jsx';
import Loader from '../component/Loader.jsx';
import { useGetOrderDetailsQuery } from '../slices/orderApiSlice.js'
import { Link, useParams } from 'react-router-dom';
import { Col, ListGroup, Row, Image, Card } from 'react-bootstrap';

const OrderScreen = () => {
    const { id: orderId } = useParams();
    const {
        data: order,
        refetch,
        isLoading,
        error
    } = useGetOrderDetailsQuery(orderId)

    return isLoading ? <Loader/> : error ? <Message variant='danger'/> : (
        <>
            <h1>{order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>การส่งสินค้า</h2>
                            {/* Name */}
                            <p>
                                {/* data from mongo usermodel.js*/}
                                <strong>ชื่อ : </strong> {order.user.name}
                            </p>

                            {/* Email */}
                            <p>
                                {/* data from mongo usermodel.js */}
                                <strong>Email : </strong> {order.user.email}
                            </p>
                            <p>
                                {/* data from mongo usermodel.js */}
                                <strong>บ้านเลขที่ : </strong> 
                                {order.ShippingAddress.address},{" "}{order.ShippingAddress.city},{" "}{order.ShippingAddress.postalCode},{" "}{order.ShippingAddress.country}
                            </p>

                            {/* data from mongo orderModel.js */}
                            { order.isDelivered ? (
                                <Message variant='success'>
                                    จัดส่งแล้ว
                                </Message>
                            ) : (
                                <Message variant='danger'>
                                    ยังไม่ได้จัดส่ง
                                </Message>
                            ) }
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {/* orderItems from mongoDB by(orderModel.js) */}
                            {order.orderItems.map((item,index) => (
                                <ListGroup.Item key={index}>
                                    <Row>
                                        {/* Image Product */}
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded/>
                                        </Col>

                                        {/* Name Product */}
                                        <Col>
                                            <Link to={`/products/${item.product}`}>
                                                {item.name}
                                            </Link>
                                        </Col>

                                        {/* Value */}
                                        <Col>
                                            {item.qty} x {item.price} = {item.qty*item.price} บาท
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        {/* data from mongoDB by(orderModel.js) */}
                        <ListGroup variant='flush'>
                            
                            {/* ยอดรวม */}
                            <ListGroup.Item>
                                <h2>ยอดรวม</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>ราคาสินค้า</Col>
                                    <Col>{order.itemsPrice} บาท</Col>
                                </Row>
                                <Row>
                                    <Col>ค่าส่ง</Col>
                                    <Col>{order.shippingPrice} บาท</Col>
                                </Row>
                                <Row>
                                    <Col>ภาษี</Col>
                                    <Col>{order.taxPrice} บาท</Col>
                                </Row>
                                <Row>
                                    <Col>ราคารวม</Col>
                                    <Col>{order.totalPrice} บาท</Col>
                                </Row>
                            </ListGroup.Item>

                            {/* Pay Order PlaceOrder */}
                            
                            {/* Mark As Delivered PlaceOrder */}

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default OrderScreen