import React from 'react'
import { Col, Row } from 'react-bootstrap'
import products from '../products'
import ProductCard from '../component/ProductCard'

const HomeScreen = () => {
    return (
        <>
            <h1>สินค้ายอดนิยม</h1>
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