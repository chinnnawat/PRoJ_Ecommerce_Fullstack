import React from 'react'
import { Card } from 'react-bootstrap'


const ProductCard = ({product}) => {
    return (
        <Card className='my-3 p-3 rounded'>
            {/* Image */}
            <a href={`/product/${product._id}`}>
                <Card.Img src={product.image} variant='top'/>
            </a>

            {/* Name */}
            <Card.Body>
                <a href={`/product/${product._id}`}className='text-decoration-none text-muted'>
                    <Card.Title as='div'>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </a>
                <Card.Text as='h5'>
                    {product.price} บาท
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default ProductCard