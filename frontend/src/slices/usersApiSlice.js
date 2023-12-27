import { PRODUCTS_URL, USERS_URL } from "../constance";
import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Log In
        login: builder.mutation({
            query:(data)=>({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data,
            }),
        }),
    })
})

export const { 
    useLoginMutation, 
} = userApiSlice 