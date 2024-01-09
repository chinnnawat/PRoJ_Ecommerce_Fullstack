import { USERS_URL } from "../constance";
import { apiSlice } from "./apiSlice";

// PUT, POST, DELETE = .mutation
// GET = .query

// ใช้เชื่อม backend กับ frontend โดยการส่ง url ออกไป
export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Log In
        // "mutation" ใช้เพื่อทำการเปลี่ยนแปลงข้อมูล, เช่น การเพิ่ม, การอัปเดต, หรือการลบข้อมูล.
        // การใส่ body เป็น data ใน request ของ login และ register 
        // นั้นเป็นการระบุว่าข้อมูลที่ต้องการส่งไปยัง server จะถูกส่งแบบ JSON และถูกเก็บใน property ชื่อ data.
        login: builder.mutation({
            query:(data)=>({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data,
            }),
        }),

        // logOut
        // สำหรับการ logout, ไม่จำเป็นต้องส่งข้อมูลเพิ่มเติม (ไม่ต้องใส่ body) 
        // เนื่องจากการ logout บ่งบอกถึงการสิ้นสุด session หรือ authentication 
        // ทำให้ server ไม่จำเป็นต้องรับข้อมูลที่เป็นประจำเพื่อดำเนินการ logout.
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            }),
        }),

        // register
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data
            }),
        }),

        // Profile
        profile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data
            })
        }),

        // Get All Users
        getUsers: builder.query({
            query: () => ({
                url: USERS_URL,
                method: 'GET'
            }),
            providesTags : ['Users'],
            keepUnusedDataFor: 5,
        }),

        // Delete User
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
                method: 'DELETE'
            })
        }),

        // User Detail
        getUserDetails: builder.query({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
            }),
            keepUnusedDataFor: 5,
        }),

        // Update Info User
        updateUser: builder.mutation({
            query: ({data}) => ({
                url: `${USERS_URL}/${data.userId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['User']
        })

    })
})


export const { 
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useProfileMutation,
    useGetUsersQuery,
    useDeleteUserMutation,
    useGetUserDetailsQuery,
    useUpdateUserMutation
} = userApiSlice 