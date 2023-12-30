import { apiSlice } from './apiSlice.js';
import { ORDERS_URL } from '../constance.js';

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
    }),


});

export const { 
    useCreateOrderMutation,

} = orderApiSlice