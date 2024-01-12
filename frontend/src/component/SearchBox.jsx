import React, { useState } from 'react'
import { Form, Button }  from 'react-bootstrap';
import {useParams, useNavigate} from 'react-router-dom'

const SearchBox = () => {
    const navigate = useNavigate();
    const {keyword: urlKeyword} = useParams();
    const [keyword, setKeyword] = useState(urlKeyword || '');

    // Handler
    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            setKeyword('')
            navigate(`/search/${keyword}`);
        }
        else {
            navigate('/');
        }
    }

    return (
        <Form className='d-flex' onSubmit={submitHandler}>
            <Form.Control
                type='text'
                value={keyword}
                placeholder='ค้นหาสินค้าที่คุณต้องการ'
                onChange={(e) => setKeyword(e.target.value)}
                className='mr-sm-2 ml-sm-5'
                name='q'
            ></Form.Control>
            <Button type='submit' variant='light' className='btn-block p-2 mx-2'>
                Search
            </Button>
        </Form>
    )
}

export default SearchBox