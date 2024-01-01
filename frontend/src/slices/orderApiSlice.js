// เชื่อม backend and frontend

import { apiSlice } from './apiSlice.js';
import { ORDERS_URL, PAYPAL_URL } from '../constance.js';

export const orderApiSlice = apiSlice.injectEndpoints({

    // builder เอามาจาก endpoint apiSlice.js
    // createOrder เอามาจาก orderController.js
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_URL,
                method: 'POST',
                body: {...order},
            }),
        }),

        getOrderDetails: builder.query({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}`,

            }),
            keepUnusedDataFor: 5
        }),

        // PayPal
        // .mutation จะทำการสร้าง mutation object 
        // ที่ใช้ในการ dispatch actions, ทำ network requests และจัดการกับ state ของ Redux
        payOrder: builder.mutation({
            query: ({orderId, details}) => ({
                url: `${ORDERS_URL}/${orderId}/pay`,
                method: 'PUT',
                body:{...details},
            })
        }),

        getPayPalClientId: builder.query({
            query: () => ({
                url: PAYPAL_URL,
            }),
            keepUnusedDataFor: 5,
        })
    }),


});

export const { 
    useCreateOrderMutation,
    useGetOrderDetailsQuery,
    usePayOrderMutation,
    useGetPayPalClientIdQuery

} = orderApiSlice