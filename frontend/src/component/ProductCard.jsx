import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const ProductCard = ({product}) => {
    return (
        <Card className='my-3 p-3 rounded'>
            {/* Image */}
            <Link to ={`/products/${product._id}`}>
                <Card.Img src={product.image} variant='top' style={{height: '268px'}}/>
            </Link>

            <Card.Body>
                {/* Name */}
                <Link to={`/products/${product._id}`}className='text-decoration-none text-muted'>
                    <Card.Title as='div'>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>

                {/* Price */}
                <Card.Text as='h5'>
                    {product.price} บาท
                </Card.Text>

                {/* Rating Star */}
                <Card.Text as='div'>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default ProductCard