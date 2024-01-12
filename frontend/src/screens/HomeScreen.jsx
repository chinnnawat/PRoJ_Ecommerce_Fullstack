import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'

// import products from '../products'
import ProductCard from '../component/ProductCard'

// import axios from 'axios'
// ใช้ {useGetProductsQuery} แทน axios
import {useGetProductsQuery} from '../slices/productApiSlices.js'

import Loader from '../component/Loader.jsx'
import Message from '../component/Message.jsx'
import Paginate from '../component/Paginate.jsx'
import ProductCarousel from '../component/ProductCarousel.jsx'

const HomeScreen = () => {
    const {pageNumber, keyword} = useParams()
    const {data, isLoading, error} = useGetProductsQuery({pageNumber, keyword})
    return (
        <>
            {!keyword ? (
                <ProductCarousel/>
                // <h1>Hello</h1>
            ) : (
                <Link to='/' className='btn btn-green my-3'>ย้อนกลับ</Link>
            )}
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
                        {data.products.map((product) => (
                            <Col key={product._id} sm={3} md={6} lg={4} xl={3}>
                                <ProductCard product={product}/>
                            </Col>
                        ))}
                    </Row>

                    {/* Paginate */}
                    <Paginate
                        pages={data.pages}
                        page={data.page}
                        keyword={keyword ? keyword: ''}
                    />
                </>)}
        </>
    )
}

export default HomeScreen