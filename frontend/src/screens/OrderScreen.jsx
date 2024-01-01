import React, { useEffect } from 'react';
import Message from '../component/Message.jsx';
import Loader from '../component/Loader.jsx';
import { 
    useGetOrderDetailsQuery,
    useGetPayPalClientIdQuery,
    usePayOrderMutation,
} from '../slices/orderApiSlice.js'
import { Link, useParams } from 'react-router-dom';
import { Col, ListGroup, Row, Image, Card } from 'react-bootstrap';
import { toast } from 'react-toastify'
// Paypal
import {PayPalButtons, usePayPalScriptReducer} from '@paypal/react-paypal-js'
import { useSelector } from 'react-redux';

const OrderScreen = () => {
    // ใช้ Hook useParams จาก React Router เพื่อดึงค่า parameter ชื่อ id จาก URL.
    // การดึงค่านี้จะนำไปใช้เป็น orderId ในการดึงข้อมูลการสั่งซื้อ
    const { id: orderId } = useParams();

    // ใช้ useGetOrderDetailsQuery จาก RTK Query เพื่อดึงข้อมูลการสั่งซื้อ (order) โดยใช้ orderId ที่ได้จาก URL
    const {
        data: order,
        refetch,
        isLoading,
        error
    } = useGetOrderDetailsQuery(orderId)

    // สร้าง mutation เพื่อทำการชำระเงินสำหรับการสั่งซื้อ.
    const [payOrder, {isLoading: loadingPay}] = usePayOrderMutation();
    const [{isPending}, paypalDispatch] = usePayPalScriptReducer();
    const {userInfo} = useSelector((state) => state.auth);
    const {data:paypal, isLoading: loadingPayPal, error:errorPayPal} = useGetPayPalClientIdQuery();

    // เป็น Effect ที่ทำงานเมื่อค่า order, paypal, paypalDispatch, loadingPayPal, หรือ errorPayPal เปลี่ยนแปลง.
    useEffect(() => {
        if(!errorPayPal && !loadingPayPal && paypal.clientId) {
            const loadingPayPalScript = async() => {
                paypalDispatch({
                    type: 'resetOptions',
                    value: {
                        'client-id' : paypal.clientId,
                        currency: 'USD'
                    }
                });
                paypalDispatch({type: 'setLoadingStatus', value:'pending'});
            }
            if (order && !order.isPaid){
                if(!window.paypal){
                    loadingPayPalScript()
                }
            }
        }
    },[order, paypal,paypalDispatch,loadingPayPal,errorPayPal])


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
                            {/* Delivery Status */}
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

                        {/* PayMent Status */}
                        {/* data from mongo orderModel.js */}
                        <ListGroup.Item>
                            <h2>สถานะการชำระสินค้า</h2>
                            <p>วิธีการชำระสินค้า : {order.paymentMethod}</p>
                            { order.isPaid ? (
                                <Message variant='success'>
                                    ชำระสินค้าแล้ว
                                </Message>
                            ) : (
                                <Message variant='danger'>
                                    ยังไม่ได้ชำระสินค้า
                                </Message>
                            ) }
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>รายการสินค้า</h2>
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

                {/* Conclusion */}
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

                            {/* Data paid or not from mongoDB (orderModel.js) */}
                            {/* Pay Order PlaceOrder */}
                            {/* {!order.isPaid && (
                                <ListGroup.Item>

                                </ListGroup.Item>
                            )} */}
                            {/* Mark As Delivered PlaceOrder */}

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default OrderScreen