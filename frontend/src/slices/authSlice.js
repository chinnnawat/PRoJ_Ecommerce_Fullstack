import { createSlice } from '@reduxjs/toolkit';

// initialState คือ state เริ่มต้นของ slice นี้
const initialState = {

    // มี property เดียวคือ userInfo ซึ่งถูกกำหนดโดยการดึงข้อมูลจาก localStorage ถ้ามี, ไม่งั้นก็เป็น null
    userInfo : localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,

    // มี reducers สองฟังก์ชันคือ setCredentials และ logout
    reducers: {
        //  ใช้สำหรับการตั้งค่า state.userInfo เป็นค่าที่ถูกส่งมาใน action.payload และจัดเก็บข้อมูลใน localStorage
        setCredentials: (state,action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo',JSON.stringify(action.payload))
        },

        //  ใช้สำหรับการลบข้อมูลของผู้ใช้ออกจาก state.userInfo และ localStorage
        logout:(state,action)=>{
            state.userInfo = null;
            localStorage.removeItem('userInfo')
        }
    }
})

export const {setCredentials,logout} =authSlice.actions

export default authSlice.reducer