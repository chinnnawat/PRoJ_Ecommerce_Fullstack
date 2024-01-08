import React, { useEffect, useState } from 'react'
import { 
    useGetProductDetailsQuery,
    useUpdateProductMutation,
    useUploadProductImageMutation
} from '../../slices/productApiSlices.js';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import FormContainer from '../../component/FormContainer.jsx'
import Loader from '../../component/Loader.jsx';
import Message from '../../component/Message.jsx';
import { Button, Form, FormLabel } from 'react-bootstrap';

const ProductEditScreen = () => {
    const {id: productId} = useParams();

    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [countInStock, setCountInStock] = useState('');

    const {
        data: product,
        isLoading,
        error,
        refetch
    } = useGetProductDetailsQuery(productId);

    const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();
    const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

    const navigate = useNavigate();

    useEffect(()=>{
        if(product){
            setName(product.name);
            setImage(product.image);
            setCategory(product.category);
            setDescription(product.description);
            setPrice(product.price);
            setCountInStock(product.countInStock);
        }
    },[product]);

    // Handler
    const submitHandler =async(e) => {
        e.preventDefault();

        const updatedProduct = {
            productId,
            name, 
            image, 
            category, 
            description, 
            price, 
            countInStock
        }

        const result = await updateProduct(updatedProduct);
        if (result.error){
            toast.error(result.error)
        }
        else{
            toast.success('Product Updated')
            navigate('/admin/productlist')
        }
    }

    const uploadfileHandler =async(e) => {
        e.preventDefault();

        //  สร้างอ็อบเจ็กต์ FormData ซึ่งเป็นวิธีที่ดีที่สุดในการสร้างแบบฟอร์มเพื่อใช้ในการอัปโหลดไฟล์ผ่าน AJAX
        const formData = new FormData();

        // การเลือก e.target.files[0] หมายถึงการเลือกไฟล์แรกในคอลเล็กชันนั้น ๆ (index 0)
        formData.append("image", e.target.files[0]);

        try {
            // unwrap() เป็น redux-toolkit ใช้จัดการ error ใน trycatch ได้ง่ายขึ้น
            const res = await uploadProductImage(formData).unwrap();
            toast.success('upload image success')
            setImage(res.image)
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }


    return (
        <>
            <Link to='/admin/productlist' className='btn btn-green my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>

                {isLoading ? <Loader/> : error ? <Message>{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                        {/* Product Name */}
                        <Form.Group controlId='name'className='my-2'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder={name}
                                // value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        {/* Image Input PlaceHolder */}
                        <Form.Group controlId='image'className='my-2'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Image url'
                                // value={image}
                                onChange={(e) => setImage(e.target.value)}
                            ></Form.Control>
                            <Form.Control
                                type='file'
                                placeholder='choose your image file'
                                onChange={uploadfileHandler}
                            ></Form.Control>
                        </Form.Group>
                        
                        {/* category */}
                        <Form.Group controlId='category'className='my-2'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder={category}
                                // value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        {/* Description */}
                        <Form.Group controlId='description'className='my-2'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder={description}
                                // value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        {/* price */}
                        <Form.Group controlId='price'className='my-2'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder={price}
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        {/* countInStock */}
                        <Form.Group controlId='countInStock'className='my-2'>
                            <Form.Label>CountInStock</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder={countInStock}
                                // value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        
                        <Button type='submit' variant='light' className='btn btn-green my-4' style={{width: '100%'}}>
                            Update
                        </Button>
                    </Form>
                )}
                
            </FormContainer>
        </>
    )
}

export default ProductEditScreen