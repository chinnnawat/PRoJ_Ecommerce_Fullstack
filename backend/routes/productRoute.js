import express from 'express';

// ใช้ asyncHandler แทน import products โดยการดึงข้อมูลมาจาก MongoDB
// import products from '../data/products.js';
import asyncHandler from '../middleware/asyncHandler.js'

import Product from '../models/productModel.js'

const router = express.Router();

// 1. จากไฟล์ server.js มีการกำหนดให้ "/api/products" === "/"
// 2. และจะทำการแสดง(respond) ข้อมูล products ในลักษณะของ json
router.get('/', asyncHandler(async (req,res) => {
    // 1. Product คือ Mongoose Model ที่เกี่ยวข้องกับ collection ใน MongoDB ที่เก็บข้อมูลสินค้า
    // 2. .find({}) คือ query method ของ Mongoose ที่ใช้ในการค้นหาข้อมูลทั้งหมดใน collection นั้น ๆ 
    // โดยในที่นี้คือ collection ที่เกี่ยวข้องกับ Model Product.
    // 3. การใช้ {} ในที่นี้คือแบบว่า "ไม่มีเงื่อนไข" หรือ "ค้นหาทั้งหมด" 
    // ซึ่งจะคืนข้อมูลทั้งหมดที่มีใน collection นั้น ๆ.
    const products = await Product.find({})

    throw new Error('WTF')
    res.json(products)
}));

// ค้นหาสินค้าในอาร์เรย์ products โดยใช้ Array.find() โดยตรวจสอบว่า _id ของสินค้าตรงกับค่าของพารามิเตอร์ :id ที่รับมา.
router.get('/:id', asyncHandler(async (req, res) => {
    // 1. เมื่อ frontend request id จาก url 
    // 2. req.params.id: เป็นการดึงค่า ID จากพารามิเตอร์ของ URL ที่ถูกส่งมาด้วยคำขอ (request) นั้น ๆ.
    // เก็บในตัวแปร product
    const product = await Product.findById(req.params.id)

    if (product) {
        return res.json(product)
    }
    else{
        res.status(404);
        throw new Error('Resource Not Found')
    }
}))

export default router;