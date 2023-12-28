import { USERS_URL } from "../constance";
import { apiSlice } from "./apiSlice";

// ใช้เชื่อม backend กับ frontend โดยการส่ง url ออกไป
export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Log In
        // "mutation" ใช้เพื่อทำการเปลี่ยนแปลงข้อมูล, เช่น การเพิ่ม, การอัปเดต, หรือการลบข้อมูล.
        login: builder.mutation({
            query:(data)=>({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data,
            }),
        }),

        // logOut
        logout: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
                body: data,
            })
        })
    })
})


export const { 
    useLoginMutation,
    useLogoutMutation, 
} = userApiSlice 