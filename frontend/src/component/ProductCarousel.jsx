import React from 'react'
import {Link} from 'react-router-dom'
import { useGetTopProductQuery } from '../slices/productApiSlices.js'
import Loader from './Loader'
import Message from './Message'
import { Carousel, Image } from 'react-bootstrap'

const ProductCarousel = () => {
    const { data: products, isLoading, error } = useGetTopProductQuery();
    console.log(products);

    return isLoading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <Carousel pause='hover' className='class-Carousel mb-4'>
            {products.map(product => (
                <Carousel.Item key={product._id}>
                    <Link to={`/products/${product._id}`}>
                        <div className='carousel-image-container'>
                            <Image
                                src={product.image}
                                alt={product.name}
                                fluid
                                className='carousel-image'
                            />
                        </div>
                        <Carousel.Caption className='carousel-caption my-2'>
                            <h2>
                                {product.name} ({product.price}บาท)
                            </h2>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default ProductCarousel;
