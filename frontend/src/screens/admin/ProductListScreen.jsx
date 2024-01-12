import React from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import {  FaEdit, FaTrash } from 'react-icons/fa';
import Loader from '../../component/Loader';
import Message from '../../component/Message';
import { LinkContainer } from 'react-router-bootstrap';
import { toast } from 'react-toastify'

// Slice
import { 
    useGetProductsQuery, 
    useCreateProductMutation,
    useDeleteProductMutation,
} from '../../slices/productApiSlices'
import { useParams } from 'react-router-dom';
import Paginate from '../../component/Paginate';


const ProductListScreen = () => {
    const {pageNumber} = useParams()

    const {data, isLoading, error, refetch} = useGetProductsQuery({pageNumber})
    const [createProduct, {isLoading: loadingCreate}] = useCreateProductMutation();
    const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();
    

// Handler
const deleteHandler =async(id) => {
    if(window.confirm("Are you sure ?")){
        try {
            await deleteProduct(id);
            toast.success('Product Deleted', {
                autoClose: 1000,
            })
            refetch();
        } catch (err) {
            toast.error( err?.data?.message || err.error );
        }
    }
}

const createProductHandler =async() => {
    if(window.confirm('เพิ่มสินค้าใหม่ใช่หรือไม่ ? ')){
        try {
            await createProduct();
            refetch();
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }
}

    return( 
    <>
        <Row className='align-items-center'>
            <Col>
                <h1>Products</h1>
            </Col>
            <Col className='text-end'>
                <Button className='btn btn-green' variant='light' onClick={createProductHandler}>
                    <FaEdit/>Create Product
                </Button>
            </Col>
        </Row>

        {loadingCreate && <Loader/>}
        {loadingDelete && <Loader/>}
        {isLoading ? <Loader/> : error ? <Message>{error}</Message> :(
            <>
                <Table striped hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>รายการสินค้า</th>
                            <th>ราคา(บาท)</th>
                            <th>ประเภท</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.products.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>
                                    {/* ใช้ LinkContainer ล้อมรอบช่องที่คุณต้องการทำให้เป็นลิ้งค์ */}
                                    <LinkContainer to={`/products/${product._id}`}>
                                        <span className="text-decoration-none">{product.name}</span>
                                    </LinkContainer>
                                </td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                            <Button variant='light' className='btn-sm btn-green' oncli>
                                                <FaEdit/>
                                            </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm' onClick={ () => deleteHandler(product._id)}>
                                        <FaTrash style={{color : 'white'}}/>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    
                    {/* Paginator */}
                    <Paginate pages={data.pages} page={data.page} isAdmin={true}/>

                </Table>
            </>
        )}
    </>
    )
}

export default ProductListScreen