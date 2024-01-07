import React from 'react'
import { useGetOrdersQuery } from '../../slices/orderApiSlice'
import { LinkContainer } from 'react-router-bootstrap';
import {Table,Button} from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import Loader from '../../component/Loader'
import Message from '../../component/Message'

const OrderListScreen = () => {
    const {data: orders, isLoading, error} = useGetOrdersQuery()

    return (
        <>
            <h1>Orders</h1>
            {isLoading ? (
                <Loader/>
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>PRODUCT</th>
                            <th>USER</th>
                            <th>DATE(MM-DD-YYYY)</th>
                            <th>TOTAL</th>
                            <th>PAID(MM-DD-YYYY)</th>
                            <th>DELIVERED(MM-DD-YYYY)</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order)=>(
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>
                                {order.orderItems.map((orderItem) => (
                                        <tr key={orderItem._id}>
                                            <td>{orderItem.name}</td>
                                        </tr>
                                    ))}
                                </td>
                                <td>{order.user && order.user.name}</td>
                                <td>{new Date(order.createdAt).toLocaleString('en-US', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                    })}</td>
                                <td>{order.totalPrice}</td>
                                <td>
                                    {order.isPaid ? (
                                        new Date(order.paidAt).toLocaleString('en-US', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                        }) //Paid
                                    ) : (
                                        <FaTimes style={{color:'red'}}/>  //Not Paid
                                    )
                                }
                                </td>
                                <td>
                                    {order.isDelivered ? (
                                        order.deliveredAt && new Date(order.deliveredAt).toLocaleString('en-US', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                        }) //Delivered
                                    ) : (
                                        <FaTimes style={{color:'red'}}/>  //Not
                                    )
                                    }
                                </td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button className='btn btn-green' variant='light'>
                                            Details
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default OrderListScreen