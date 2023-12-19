import React from 'react';
import {Link, useParams} from 'react-router-dom';

import Rating from '../component/Rating';
import { Col, Row, Image, ListGroup, Card, Container, Button } from 'react-bootstrap';

// import axios from 'axios'
import {useGetProductDetailsQuery} from '../slices/productApiSlices.js'

import Loader from '../component/Loader.jsx';
import Message from '../component/Message.jsx';

const ProductScreen = () => {
    // ใช้ useParams เพื่อดึงค่าพารามิเตอร์จาก URL
    // ดึงค่า 'id' จาก URL ด้วย useParams
    // ถ้า URL เป็น /my-component/value จะได้ผลลัพธ์ ค่าพารามิเตอร์ที่ดึงมา: value
    const { id: productId } = useParams();
    const {data: product, isLoading, error} = useGetProductDetailsQuery(productId)

    return (
        <>
            {/* ใช้คลาสเดียวกัน btn-hover-color ที่นี่ */}
            <Link className='btn btn-green my-3' to='/'>ย้อนกลับ</Link>
            
            {isLoading ? (
                <Loader/>
            ): error ? (
                <Message variant='danger'>
                    {error?.data?.message || error.error}
                </Message>
            ): (
                <>
                
                <Container className="rounded">
                    <Row className='justify-content-center'>

                        {/* Image */}
                        <Col md={4}>
                            <Image src={product.image} alt={product.name} fluid style={{ height: '100%', objectFit: 'cover' }}/>
                        </Col>

                        <Col md={4}>
                            <ListGroup variant='flush'>
                                {/* Product Name */}
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>

                                {/* Rating */}
                                <ListGroup.Item>
                                    <Rating value={product.rating} text={`${product.numReviews} รีวิว`}/>
                                </ListGroup.Item>

                                {/* Price */}
                                <ListGroup.Item>
                                    ราคา : {product.price} บาท
                                </ListGroup.Item>
                            </ListGroup>
                            <Card>
                                <ListGroup variant='flush'>
                                    {/* PRICE PRODUCT CARD */}
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                <strong>
                                                    ราคา : {product.price}
                                                </strong>
                                            </Col>
                                            <Col>
                                                
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {/* STATUS */}
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                สถานะ
                                            </Col>
                                            <Col>
                                                <strong>
                                                    {product.countInStock > 0 ?
                                                    'ยังมีอยู่ ': 'หมดแล้ว'}
                                                </strong>
                                            </Col>
                                            <Col>
                                                
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {/* btn Confirm Buy */}
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                <Button className='btn-block' type='botton' disabled={product.countInStock === 0}>เพิ่มไปยังตะกร้า</Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    
                </Container>
                {/* รายละเอียดสินค้า */}
                    <Container>
                        <Col>
                            <Row >รายละเอียดสินค้า : </Row>
                            <Row style={{ color: '#B1B1B1' }}> {product.description}</Row>
                        </Col>
                    </Container>
                </>
            ) }
        </>
    );
}

export default ProductScreen