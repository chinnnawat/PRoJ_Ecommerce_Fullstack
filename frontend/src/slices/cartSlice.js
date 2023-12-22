// ********Redux Toolkit เพื่อสร้าง slice ของ Redux สำหรับการจัดการ state ของตะกร้า เช่นการเพิ่ม, ลบสินค้า, จัดการการชำระเงินเป็นต้น (cart)********
import { createSlice } from '@reduxjs/toolkit'

import {updateCart} from '../utils/cartUtils.js'

// ถูกกำหนดค่าโดยการตรวจสอบว่ามีข้อมูลเก็บใน localStorage หรือไม่ 
// ถ้ามีจะใช้ข้อมูลนั้นเป็น initialState ถ้าไม่มีจะใช้ {cartItems: []} เป็น initialState แทน
const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {cartItems:[]};

// createSlice ถูกเรียกเพื่อสร้าง Redux slice โดยมีชื่อว่า 'cart'
const cartSlice = createSlice({
    name: 'cart',

    // คือค่าเริ่มต้นของ state ที่ถูกใช้
    initialState,

    // ระบุ reducers ที่สามารถให้ createSlice ทำให้ state ถูกอัปเดตได้ 
    reducers: {
        addToCart: (state, action) => {
            // ดึงข้อมูลสินค้าที่ต้องการเพิ่มเข้าในตะกร้าจาก action.payload
            const item = action.payload;
    
            // ตรวจสอบว่าสินค้าที่ต้องการเพิ่มเข้าในตะกร้ามีอยู่แล้วหรือไม่
            const existItem = state.cartItems.find((x) => x._id === item._id);
    
            // ถ้าสินค้ามีอยู่ในตะกร้าแล้ว
            if (existItem) {
                // ให้ map ผ่านทุก item ใน state.cartItems
                state.cartItems = state.cartItems.map((x) =>
                    // ถ้าเจอ item ที่มี _id ตรงกับ existItem
                    // ให้ใช้ข้อมูลสินค้าใหม่ที่ต้องการเพิ่มแทนที่ item เดิม.
                    x._id === existItem._id ? item : x
                );
            } else {
                // ถ้าสินค้ายังไม่มีในตะกร้า
                // state.cartItems คือ array ปัจจุบันของ cartItems ใน state.
                // ...state.cartItems คือ spread operator ที่นำทุก element ใน state.cartItems มาใส่ใน array ใหม่.
                // item คือ element ที่ต้องการเพิ่มเข้าไปใน array ใหม่.
                // [...state.cartItems, item] คือการนำทุก element ใน state.cartItems และ item มาสร้าง array ใหม่.
                // ดังนั้น, expression นี้จะสร้าง array ใหม่ที่มีข้อมูลเดิมทั้งหมดของ state.cartItems รวมถึง item ที่ต้องการเพิ่มเข้าไปด้วย.
                state.cartItems = [...state.cartItems, item];
            }
            updateCart(state)
            return state;
            
        },

        removeFromCart: (state,action) => {
            // state.cartItems คือ array ของสินค้าในตะกร้าในปัจจุบัน.
            // .filter((x) => x._id !== action.payload): นี้คือการใช้ filter method 
            // ของ JavaScript array เพื่อสร้าง array ใหม่ที่มีเฉพาะสินค้าที่มี _id ไม่เท่ากับ 
            // action.payload (ที่ส่งมาจาก action).
            // ****สร้าง array ใหม่ ที่ไม่มีข้อมูลของ ตัวที่เลือกใน part action****
            state.cartItems = state.cartItems.filter((x)=> x._id !== action.payload)

            return updateCart(state)
        }

    },
})

export const { addToCart, removeFromCart } = cartSlice.actions

export default cartSlice.reducer