import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useProfileMutation} from '../slices/usersApiSlice.js'
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import Loader from '../component/Loader.jsx';
import { toast } from 'react-toastify';
import { setCredentials } from '../slices/authSlice.js';
import { useGetMyOrdersQuery } from '../slices/orderApiSlice.js';
// icons
import { FaTimes } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap'

const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('')

    const { userInfo } = useSelector((state) => state.auth);

    // func from backend
    let [updateProfile, {isLoading: loadingUpdateProfile}] = useProfileMutation();
    let { data: orders, isLoading, error } = useGetMyOrdersQuery();


    const dispatch = useDispatch();

    // useEffect นี้ถูกทำงานทุกครั้งที่ userInfo เปลี่ยนแปลง (เป็น dependency ใน dependency array []).
    // ในฟังก์ชัน useEffect, มีการตรวจสอบว่า userInfo มีค่าหรือไม่ (if(userInfo)).
    // ถ้า userInfo มีค่า, ก็จะมีการเรียก setName(userInfo.name) และ setEmail(userInfo.email)
    useEffect(() => {
        if(userInfo){
            setName(userInfo.name)
            setEmail(userInfo.email)
        }
    },[userInfo, userInfo.name, userInfo.email])


    const submitHandler = async(e) => {
        e.preventDefault();
        if (password !== confirmpassword){
            toast.error('รหัสผ่านไม่ตรงกัน')
        }
        else{
            try {
                const res = await updateProfile({
                    _id: userInfo._id,
                    name,
                    email,
                    password,
                }).unwrap();
                dispatch(setCredentials({...res}));
                toast.success('อัพเดทข้อมูลสำเร็จ')
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    }

    return (
        <Row>
            <Col md={3}>
                <Form onSubmit={submitHandler}>
                    {/* Name */}
                    <Form.Group controlId='name' className='my-2'>
                        <Form.Label>ชื่อ</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='กรุณาพิมชื่อของคุณ'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    {/* Email */}
                    <Form.Group controlId='email' className='my-2'>
                        <Form.Label>อีเมล์</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='กรุณาพิมอีเมล์ของคุณ'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    {/* Password */}
                    <Form.Group controlId='password' className='my-2'>
                        <Form.Label>รหัสผ่าน</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='รหัสผ่านของคุณ'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    {/* ConfirmPassword */}
                    <Form.Group controlId='password' className='my-2'>
                        <Form.Label>ยืนยันรหัสผ่าน</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='ยืนยันรหัสผ่านของคุณ'
                            value={confirmpassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Button type='submit' className='btnt-green my-2' style={{width: '100%'}}>
                        Update
                    </Button>
                    {loadingUpdateProfile && <Loader/>}
                </Form>
            </Col>
            <Col md={9}>
                <h3>สินค้าของฉัน</h3>
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERY</th>
                            <th>STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                    {orders && orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>

                            {/* substring = เป็นวันที่ในรูปแบบ "YYYY-MM-DD". */}
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>{order.totalPrice} บาท</td>
                            <td>
                                {order.isPaid ? (
                                    order.paidAt.substring(0, 10)
                                ) : (
                                    <FaTimes style={{color: 'red'}}/>
                                )}
                            </td>
                            <td>
                                {order.isDelivered ? (
                                    order.deliveredAt.substring(0,10)
                                ) : (
                                    <FaTimes style={{color:'red'}}/>
                                )}
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
            </Col>
        </Row>
    )
}

export default ProfileScreen