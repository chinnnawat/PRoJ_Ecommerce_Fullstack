// สร้าง API slice ที่จะใช้ในการจัดการการส่ง request ไปยัง API ของแอปพลิเคชัน React
import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {BASE_URL} from '../constance.js'

const baseQuery = fetchBaseQuery({baseUrl: BASE_URL});

export const apiSlice = createApi({
    baseQuery,tagTypes:['Product','Order','User'],
    endpoints:(builder)=>({})
})


// Endpoint คือ URL ที่สำหรับการเรียกใช้บริการ
// เช่น, หากคุณมีเว็บ API สำหรับการจัดการข้อมูลผู้ใช้, Endpoint อาจมีลักษณะดังนี้:
// GET /api/users: เพื่อดึงข้อมูลผู้ใช้ทั้งหมด
// GET /api/users/{id}: เพื่อดึงข้อมูลผู้ใช้จาก ID ที่กำหนด
// POST /api/users: เพื่อสร้างผู้ใช้ใหม่
// PUT /api/users/{id}: เพื่ออัปเดตข้อมูลผู้ใช้ที่กำหนด
// DELETE /api/users/{id}: เพื่อลบผู้ใช้ที่กำหนด
// ในทุก Endpoint, คำข้างต้นคือ URI (Uniform Resourc