import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// import products from '../products'
import ProductCard from '../component/ProductCard'

// import axios from 'axios'
// ใช้ {useGetProductsQuery} แทน axios
import {useGetProductsQuery} from '../slices/productApiSlices.js'

import Loader from '../component/Loader.jsx'
import Message from '../component/Message.jsx'

const HomeScreen = () => {
    const {data: products, isLoading, error} = useGetProductsQuery()
    return (
        <>
            {isLoading ? (
                <Loader/>
            ): error ? (
                <Message variant='danger'>
                    {error?.data?.message || error.error}
                </Message>
            ) : (
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
                </>)}
        </>
    )
}

export default HomeScreen