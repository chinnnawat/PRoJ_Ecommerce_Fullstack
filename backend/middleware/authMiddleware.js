import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

// Protect Routes
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Read the jwt from the cookie
    // ใช้เพื่ออ่านค่า token จาก cookie ที่ชื่อ jwt ที่ถูกส่งมาใน request.
    token = req.cookies.jwt;

    if(token){
        try {
            // เพื่อตรวจสอบความถูกต้องของ token โดยใช้ process.env.JWT_SECRET เป็นคีย์สำหรับการถอดรหัส.
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // .select('-password') หมายถึง "ไม่รวมฟิลด์ที่ชื่อว่า 'password'". ดังนั้น, ผลลัพธ์ที่ได้จะไม่รวมฟิลด์ข้อมูลรหัสผ่านของผู้ใช้.
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } 
        // หากมีข้อผิดพลาดในการตรวจสอบ token (เช่น token หมดอายุ, หรือไม่ถูกต้อง), โค้ดในบล็อก catch จะถูกทำงาน.
        catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not Authorized, token fail')
        }
    } else{
        res.status(401);
        throw new Error('Not Authorized, No token')
    }
})

// Admin middleware
const admin = (req,res,next)=>{
    // ตรวจสอบว่าผู้ใช้เป็น admin หรือไม่: ถ้า req.user มีค่า (ไม่เป็น null หรือ undefined) 
    // และ req.user.isAdmin เป็น true แสดงว่าผู้ใช้เป็น admin.
    if (req.user && req.user.isAdmin){
        next()
    }
    else{
        res.status(401);
        throw new Error('Not authorize as admin');
    }
}

export {protect,admin}