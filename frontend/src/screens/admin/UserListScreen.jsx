import React from 'react'
import { 
    useGetUsersQuery,
    useDeleteUserMutation,
} from '../../slices/usersApiSlice.js'
import { LinkContainer } from 'react-router-bootstrap';
import {Table,Button} from 'react-bootstrap';
import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import Loader from '../../component/Loader'
import Message from '../../component/Message'
import { toast } from 'react-toastify';

const UserListScreen = () => {
    const {data: users, isLoading, error} = useGetUsersQuery();
    const [deleteUser, { isLoading: loadingDelete }, refetch] = useDeleteUserMutation()

    // Handler
    const deleteHandler = async(userId) => {
        if(window.confirm('Are you sure to delete user this ?')){
            try {
                await deleteUser(userId);
                toast.success('User deleted',{
                    autoClose: 1500,
                });
                refetch()
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
    }

    return (
        <>
            <h1>Users</h1>
            {loadingDelete && <Loader/>}
            {isLoading ? (
                <Loader/>
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user)=>(
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td><a href={`mailto:${user.email}`}>{ user.email }</a></td>
                                <td>
                                    {user.isAdmin ? (
                                        <FaCheck style={{color: 'green'}}/>
                                    ) : (
                                        <FaTimes style={{color:'red'}}/>
                                    )
                                }
                                </td>
                                <td>
                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                        <Button className='btn-sm btn-green' variant='light'>
                                            <FaEdit/>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm mx-1' onClick={ () => deleteHandler(user._id)}>
                                        <FaTrash style={{color : 'white'}}/>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default UserListScreen