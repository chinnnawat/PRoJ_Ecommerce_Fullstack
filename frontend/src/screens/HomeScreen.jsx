import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
// import products from '../products'
import ProductCard from '../component/ProductCard'
import axios from 'axios'


const HomeScreen = () => {

    // ทำการ fetch data (products) ใน url http://localhost:5000/api/products มาใช้งาน แทนการ mock data จากไฟล์ server.js ที่อยู่ใน frontend
    // ใช้ axios ในการ fetch ข้อมูล
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async() => {
            const {data} = await axios.get('/api/products');
            setProducts(data)
        }
        fetchProducts()
},[])


    return (
        <>
            <Row>
                <Col >
                    <h2>สินค้ายอดนิยม</h2>
                </Col>
                <Col className='text-end'>
                    <Link to='/all' className='btn' style={{ backgroundColor: '#008556', color: '#fff', borderRadius : '20px' }}>
                        <h5>ทั้งหมด</h5>
                    </Link>
                </Col>
            </Row>
            <Row>
                {products.map((product) => (
                    <Col key={product._id} sm={3} md={6} lg={4} xl={3}>
                        <ProductCard product={product}/>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default HomeScreen