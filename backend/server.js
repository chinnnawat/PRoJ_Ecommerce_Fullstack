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
import dotenv from  'dotenv'
import connectDB from './config/db.js'
import path from 'path'

// อ่านข้อมูลจาก MongoDB และนำมาใช้งาน (Router)
import productRoute from './routes/productRoute.js';
import userRoutes from './routes/userRoutes.js';
import orderRoute from './routes/orderRoute.js';
import uploadImageRoute from './routes/uploadImageRoute.js'
//
import {notFound,errorHandler} from './middleware/errorMiddleware.js'

// ใช้สำหรับการดึงข้อมูลจาก cookies ที่ถูกส่งมาจาก client
import cookieParser from "cookie-parser";



dotenv.config();

connectDB();

// กำหนด port จากค่าที่ระบุใน .env หากไม่ได้ระบุใน .env จะใช้ค่า 5000 เป็นค่าเริ่มต้น
const port = process.env.PORT || 5000;

const app = express();

// Body Parser middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Cookie Parser Middleware
app.use(cookieParser());




app.use('/api/products', productRoute);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoute);
app.use('/api/upload', uploadImageRoute);

// Paypal
app.get('/api/config/paypal', (req,res) => res.send({clientId: process.env.PAYPAL_CLIENT_ID}));

// UploadImage
const __dirname = path.resolve(); // set __dirname to current directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// deploy
if (process.env.NODE_ENV === 'production'){
    // set static folder
    app.use(express.static(path.join(__dirname, '/frontend/build')));

    // any route that is not api will be redirected to index.html
    app.get('*', (req,res) => res.sendFile(path.resolve9(__dirname, 'frontend', 'build', 'index.html')));

} else {
    // เมื่อได้รับ url '/' จะอ่านข้อมูล และจะทำการแสดง(respond) ข้อความ Api is Running... บน port 5000
    app.get('/', (req,res) => {
        res.send('Api is Running...');
});
}

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`Server running on port ${port}`))