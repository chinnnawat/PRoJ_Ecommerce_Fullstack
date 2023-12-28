import React, { useEffect, useState } from 'react'
import FormContainer from '../component/FormContainer';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from'../slices/authSlice';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../component/Loader'

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();


    // โดยทั่วไป, useLoginMutation() นั้นจะ return array ที่มีสอง elements คือ:
    // Element แรกเป็น function ที่ใช้สำหรับเรียก mutation (ในที่นี้คือ login).
    // Element ที่สองเป็น object ที่มี property ต่าง ๆ
    const [register, {isLoading}] = useRegisterMutation();

    // useSelector จาก Redux Toolkit เพื่อดึงค่า state จาก Redux store มาใช้
    // รับ state ทั้งหมดของ Redux store เข้ามาแล้ว return ค่าที่ต้องการในกรณีนี้คือ state.auth
    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);

    // ดึงค่าของพารามิเตอร์ที่ชื่อ 'redirect' จาก URLSearchParams. 
    // หากไม่มีค่า 'redirect' จะให้ค่าเริ่มต้นเป็น '/' (root path).
    // จากตัวอย่าง http://example.com/some/path?redirect=/dashboard
    // sp.get('redirect') จะคืนค่า '/dashboard' เพราะมีการส่งค่า 'redirect' 
    // มากำกับ URLSearchParams. ถ้าไม่มีค่า 'redirect' จะให้ค่าเริ่มต้นคือ '/' 
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if(userInfo){
            navigate(redirect);
        }
    },[userInfo, redirect, navigate])

    const submitHandler = async(e) => {
        // ป้องกันการโหลดหน้าใหม่หลังจากฟอร์มถูกส่ง
        e.preventDefault()
        if(password !== confirmPassword){
            toast.error('Password Not Match');
            return;
        }else{
            try {
                // ส่งข้อมูล email และ password ไปยัง endpoint /auth ด้วย HTTP POST request. 
                // .unwrap() ถูกใช้เพื่อดึงข้อมูลที่ได้จาก response ของ mutation ซึ่งในกรณีนี้คือข้อมูลผู้ใช้ที่เข้าสู่ระบบเรียบร้อย.
                const res = await register({name, email, password}).unwrap();
    
                // หลังจากที่ได้ข้อมูลผู้ใช้จากการเข้าสู่ระบบเรียบร้อยแล้ว ใช้ dispatch 
                // เพื่อส่ง action setCredentials ไปยัง Redux store เพื่อทำการอัปเดตข้อมูลผู้ใช้ในสถานะ.
                // {...res} มีได้แก่ properties เช่น _id, name, email, isAdmin
                dispatch(setCredentials({...res,}))
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }

        
    }

    return (
        <FormContainer>
            <h1>Register</h1>
            <Form onSubmit={submitHandler}>
                {/* Name */}
                <Form.Group controlId='name' className='my-3'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                {/* Email */}
                <Form.Group controlId='email' className='my-3' >
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                
                {/* Password */}
                <Form.Group controlId='password' className='my-3' >
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                
                {/* Confirm Password */}
                <Form.Group controlId='confirmPassword' className='my-3' >
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm password'
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                {/* Button */}
                <Button type='submit' variant='primary' className='btnt-green mt-4' style={{width:'100%'}}  disabled={isLoading}>
                    SignUp
                </Button>
            </Form>
            {isLoading && <Loader/>}

            {/* New Customer */}
            <Row className='py-3'>
                <Col>
                    Already an Account ? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                    LogIn</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen