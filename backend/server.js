// GET (อ่านข้อมูล):
// ลักษณะ: ใช้สำหรับการดึงข้อมูลจากเซิร์ฟเวอร์.
// การส่งข้อมูล: ส่งผ่าน URL และไม่ได้ส่งข้อมูลในรูปแบบของ Request Body.
// ตัวอย่าง: GET /api/products เพื่อดึงข้อมูลสินค้าทั้งหมด.

// POST (สร้างข้อมูล):
// ลักษณะ: ใช้สำหรับการสร้างข้อมูลใหม่บนเซิร์ฟเวอร์.
// การส่งข้อมูล: ส่งข้อมูลในรูปแบบของ Request Body, ซึ่งสามารถเป็น JSON, ฟอร์มข้อมูล, หรือรูปแบบอื่น ๆ.
// ตัวอย่าง: POST /api/products เพื่อเพิ่มสินค้าใหม่.

// PUT (อัปเดตข้อมูล):
// ลักษณะ: ใช้สำหรับการอัปเดตข้อมูลที่มีอยู่บนเซิร์ฟเวอร์.
// การส่งข้อมูล: ส่งข้อมูลที่ต้องการอัปเดตในรูปแบบของ Request Body.
// ตัวอย่าง: PUT /api/products/:id เพื่ออัปเดตข้อมูลของสินค้าที่มี id ที่ระบุ.

// DELETE (ลบข้อมูล):
// ลักษณะ: ใช้สำหรับการลบข้อมูลบนเซิร์ฟเวอร์.
// การส่งข้อมูล: ไม่จำเป็นต้องส่งข้อมูล Request Body (บางทีก็ส่งได้).
// ตัวอย่าง: DELETE /api/products/:id เพื่อลบข้อมูลสินค้าที่มี id ที่ระบุ.

import express from "express";
import products from './data/products.js';

const port = 5000;

const app = express();

// เมื่อได้รับ url '/' จะอ่านข้อมูล และจะทำการแสดง(respond) ข้อความ Api is Running... บน port 5000
app.get('/', (req,res) => {
    res.send('Api is Running...');
});

// เมื่อได้รับ url '/api/products' จะอ่านข้อมูล และจะทำการแสดง(respond) ข้อมูล products ในลักษณะของ json
app.get('/api/products', (req,res) => {
    res.json(products)
});

// ค้นหาสินค้าในอาร์เรย์ products โดยใช้ Array.find() โดยตรวจสอบว่า _id ของสินค้าตรงกับค่าของพารามิเตอร์ :id ที่รับมา.
app.get('/api/products/:id', (req, res) => {
    const product = products.find((p) => (p._id === req.params.id))
    res.json(product)
})

app.listen(port, () => console.log(`Server running on port ${port}`))