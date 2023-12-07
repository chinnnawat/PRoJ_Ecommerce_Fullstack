import React, { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';

import Rating from '../component/Rating';
import { Col, Row, Image, ListGroup, Card, Container, Button } from 'react-bootstrap';
import axios from 'axios'

const ProductScreen = () => {
    // ใช้ useParams เพื่อดึงค่าพารามิเตอร์จาก URL
    // ดึงค่า 'id' จาก URL ด้วย useParams
    // ถ้า URL เป็น /my-component/value จะได้ผลลัพธ์ ค่าพารามิเตอร์ที่ดึงมา: value
    const { id: productId } = useParams();


    // ค้นหาสินค้าที่มี _id ตรงกับ productId ใน products array
    // ก็คือการ มอบค่าทั้งหมดใน products ให้แก่ product ซึ่งแยกโดยใช้ _id ของสินค้า
    // const product = products.find((p) => p._id === productId)
    

    // กำหนด useState({}) ในที่นี้เป็นการกำหนดค่าเริ่มต้นของ product state ในรูปแบบของอ็อบเจ็กต์ (object) 
    // ที่มีค่าเป็นวัตถุเปล่า (empty object) {}. โดยปกติแล้ว useState จะมีค่าเริ่มต้นเป็น undefined ถ้าไม่ได้ระบุค่าเริ่มต้น.
    const [product, setProduct] = useState({});
    useEffect(() => {
        const fetchProduct = async() => {
            const {data} = await axios.get(`/api/products/${productId}`);
            setProduct(data)
        }
        fetchProduct()
    },[productId])

    return (
        <>
            {/* ใช้คลาสเดียวกัน btn-hover-color ที่นี่ */}
            <Link className='btn btn-green my-3' to='/'>ย้อนกลับ</Link>

            {/* ชื่อสินค้า ราคา จำนวนสินค้า */}
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
    );
}

export default ProductScreen