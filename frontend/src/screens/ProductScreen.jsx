import React from 'react';
import { Link, useParams, useNavigate} from 'react-router-dom';

import Rating from '../component/Rating';
import {Form, Col, Row, Image, ListGroup, Card, Container, Button } from 'react-bootstrap';

// import axios from 'axios'
import {
    useGetProductDetailsQuery,
    useCreateReviewMutation,
} from '../slices/productApiSlices.js'

import Loader from '../component/Loader.jsx';
import Message from '../component/Message.jsx';
import { useState } from 'react';

import {addToCart} from '../slices/cartSlice.js'

import { useDispatch, useSelector } from 'react-redux';
import {toast} from 'react-toastify'

const ProductScreen = () => {
    // ใช้ useParams เพื่อดึงค่าพารามิเตอร์จาก URL
    // ดึงค่า 'id' จาก URL ด้วย useParams
    // ถ้า URL เป็น /my-component/value จะได้ผลลัพธ์ ค่าพารามิเตอร์ที่ดึงมา: value
    const { id: productId } = useParams();
    const {data: product, isLoading, error, refetch} = useGetProductDetailsQuery(productId);

    const[qty,setQty] = useState(1)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Create Review
    const [creatReview, {isLoading: loadingProductReview}] = useCreateReviewMutation();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('')

    const { userInfo } = useSelector((state) => state.auth)

    // Handler
    const addToCartHandler = () =>{
        dispatch(addToCart({ ...product,qty }));
        navigate('/cart');
    };

    const submitHandler = async(e) =>{
        e.preventDefault();
        try {
            await creatReview({
                productId,
                rating,
                comment,
            }).unwrap()
            refetch();
            toast.success('Review created successfully',{
                autoClose: 2000,
            })
            setRating(0);
            setComment('');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
        // console.log(comment)
    }

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

                                    {/* QTY */}
                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>จำนวน</Col>
                                                <Col>
                                                    <Form.Control
                                                        as = 'select'
                                                        value = {qty}
                                                        onChange = {(e) => setQty(Number(e.target.value))}
                                                        >
                                                            {[...Array(product.countInStock).keys()].map((x) => (
                                                                <option key={x+1} value={x+1}>
                                                                    {x+1}
                                                                </option>
                                                            ))}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}

                                    {/* btn Confirm Buy */}
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                <Button className='btn-block' type='button' disabled={product.countInStock === 0}
                                                    onClick={addToCartHandler}>เพิ่มลงตะกร้า
                                                </Button>
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

                    {/* Comment */}
                    <Row className='review'>
                        {product.reviews.length === 0 && <Message>No review</Message>}
                        <ListGroup variant='flush'>
                            {product.reviews.map((review) => (
                                <ListGroup.Item key={review._id}>
                                    <strong>{review.name}</strong>
                                    <Rating value={review.rating}/>
                                    <p>{review.createAt && review.createAt.substring(0, 10)}</p>
                                    <p>{review.comment}</p>
                                </ListGroup.Item>
                            ))}
                                <ListGroup.Item>
                                    <h2>Write a customer</h2>
                                </ListGroup.Item>

                                {loadingProductReview && <Loader/>}
                                
                                {/* use Redux */}
                                {userInfo ? (
                                    <Form onSubmit={submitHandler}>
                                        {/* Rating */}
                                        <Form.Group className='my-2' controlId='rating'>
                                            <Form.Label>Rating</Form.Label>
                                            <Form.Control
                                                as='select' 
                                                required
                                                value={rating}
                                                onChange={(e) => setRating(Number(e.target.value))}
                                            >
                                                <option value=''>Select...</option>
                                                <option value='1'>Poor</option>
                                                <option value='2'>Fair</option>
                                                <option value='3'>Good</option>
                                                <option value='4'>Very Good</option>
                                                <option value='5'>Excellent</option>
                                            </Form.Control>
                                        </Form.Group>

                                        {/* Comment */}
                                        <Form.Group className='my-2' controlId='comment'>
                                            <Form.Label>Comment</Form.Label>
                                            <Form.Control
                                                as='textarea'
                                                required
                                                row='3'
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                            ></Form.Control>
                                        </Form.Group>

                                        {/* btn */}
                                        <Button
                                            disabled={loadingProductReview}
                                            type='submit'
                                            className='btn btn-green my-3'
                                            variant='ligh'
                                        >Submit</Button>
                                    </Form>
                                ) : (
                                    <Message>
                                        Please <Link to='/login'>sign in</Link> to write a review
                                    </Message>
                                )}
                        </ListGroup>
                    </Row>
                </>
            ) }
        </>
    );
}

export default ProductScreen