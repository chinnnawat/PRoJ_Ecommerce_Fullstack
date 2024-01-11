import React, { useEffect, useState } from 'react'
import {
    useGetUserDetailsQuery,
    useUpdateUserMutation
} from '../../slices/usersApiSlice.js'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import FormContainer from '../../component/FormContainer.jsx'
import Loader from '../../component/Loader.jsx';
import Message from '../../component/Message.jsx';
import { Button, Form } from 'react-bootstrap';

const UserForEditScreen = () => {
    const {id: userId} = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const {
        data: user,
        isLoading,
        refetch,
        error,
    }= useGetUserDetailsQuery(userId);
    const [updateUser,{ isLoading: loadingUpdate }] = useUpdateUserMutation();
    const navigate = useNavigate()

    useEffect(() => {
        if(user){
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    },[user]);

    // Handler
    // เมื่อผู้ใช้กดปุ่ม Submit ในฟอร์ม, submitHandler จะถูกเรียก.
    // submitHandler จะเรียกใช้ updateUser ซึ่งเป็นฟังก์ชันที่สร้างจาก useUpdateUserMutation.
    // updateUser จะส่ง request ไปยัง API server โดยใช้ await updateUser({ userId, name, email, isAdmin }).
    // เมื่อ request สำเร็จ, toast.success จะแสดงข้อความบอกว่าการอัปเดตผู้ใช้เสร็จสมบูรณ์.
    // refetch จะดึงข้อมูลผู้ใช้ใหม่จาก API server.
    // navigate จะนำทางผู้ใช้ไปยังหน้า /admin/userlist เพื่อดูรายการผู้ใช้ทั้งหมด.
    const submitHandler = async(e) => {
        e.preventDefault();
        try {
            await updateUser({ userId,name,email,isAdmin })
            toast.success('User Updated Successfully', {
                autoClose: 1000,
            })
            refetch()
            navigate('/admin/userlist')
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }

    return (
        <>
            <Link className='btn btn-green my-3' to='/admin/userlist'>ย้อนกลับ</Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader/>}
                {isLoading ? <Loader/>: error ? <Message variant='danger'>{error.message}</Message> : (
                    <Form onSubmit={submitHandler}>
                        
                        {/* User Name */}
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder={name}
                                onChange={(e)=>setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        {/*  email */}
                        <Form.Group controlId='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        {/* isAdmin */}
                        <Form.Group controlId='isAdmin' className='my-2'>
                            <Form.Check
                                type='checkbox'
                                label='Is Admin'
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.value)}
                            ></Form.Check>
                        </Form.Group>

                        {/* btn */}
                        <Button type='submit' className='btn btn-green my-2' variant='light'>
                            Update
                        </Button>
                    </Form>
                )}
                
            </FormContainer>
        </>
    )
}

export default UserForEditScreen