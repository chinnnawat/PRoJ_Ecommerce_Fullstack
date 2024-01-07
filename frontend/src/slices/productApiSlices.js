// ****** ใช้ Redux Toolkit Query เพื่อสร้าง endpoints *********
// ****** ใช้วิธีนี้แทนการ fetch แบบ axios  **************

import {PRODUCTS_URL} from '../../src/constance.js'
import {apiSlice} from '../slices/apiSlice.js'

// 1. Endpoint คือ URL ที่สำหรับการเรียกใช้บริการ
// เช่น, หากคุณมีเว็บ API สำหรับการจัดการข้อมูลผู้ใช้, Endpoint อาจมีลักษณะดังนี้:
// GET /api/users: เพื่อดึงข้อมูลผู้ใช้ทั้งหมด
// GET /api/users/{id}: เพื่อดึงข้อมูลผู้ใช้จาก ID ที่กำหนด
// POST /api/users: เพื่อสร้างผู้ใช้ใหม่
// PUT /api/users/{id}: เพื่ออัปเดตข้อมูลผู้ใช้ที่กำหนด
// DELETE /api/users/{id}: เพื่อลบผู้ใช้ที่กำหนด
// ในทุก Endpoint, คำข้างต้นคือ URI (Uniform Resourc

// 2. เป็น method ที่ให้โปรแกรมสร้าง endpoints ใน Redux Toolkit Query.
export const productsApiSlice = apiSlice.injectEndpoints({

    // Function endpoint มี builder เป็น parameter
    endpoints:(builder)=>({

        // getProducts: เป็นชื่อของ endpoint ที่กำหนดขึ้นมา
        // 1. ใช้ในหน้า HomeScreen
        getProducts: builder.query({
            // query = การระบุพารามิเตอร์เพื่อส่งข้อมูลไปยัง server
            query:() => ({
                url: PRODUCTS_URL,
            }),
            providesTags: ['Product'],
            keepUnusedDataFor:5 //min
        }),
        
        // page productScreen
        getProductDetails: builder.query({
            // productId คือ request ที่รับจาก front end
            query:(productId) => ({
                url: `${PRODUCTS_URL}/${productId}`
            }),
            keepUnusedDataFor:5 //min
        }),

        // Create New Product
        createProduct: builder.mutation({
            query: () => ({
                url: PRODUCTS_URL,
                method: 'POST'
            }),
            invalidatesTags: ['Product'],
        }),

        // Update New Product
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Product'],
        })
    })
});

export const {
    useGetProductsQuery,
    useGetProductDetailsQuery,
    useCreateProductMutation,
    useUpdateProductMutation
} = productsApiSlice