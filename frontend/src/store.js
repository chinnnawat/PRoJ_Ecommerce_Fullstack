import { configureStore } from "@reduxjs/toolkit";
import {apiSlice} from "./slices/apiSlice.js"
import cartSliceReducer from "../src/slices/cartSlice.js";
import authSliceReducer from "./slices/authSlice.js";

// สร้าง Redux store ด้วย configureStore
// ** สร้าง Redux store ที่มี reducer และ middleware ที่เกี่ยวข้องกับ Redux Toolkit Query, พร้อมกับ devTools ที่เปิดใช้งาน.
const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        cart: cartSliceReducer,
        auth: authSliceReducer,
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export default store