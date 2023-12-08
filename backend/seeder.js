import dotenv from 'dotenv';
import colors from 'colors';

// data
import users from './data/users.js';
import products from './data/products.js';

// models
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';

// connect DataBase
import connectDB from './config/db.js';



// โหลดค่าจากไฟล์ .env 
dotenv.config();

// ฟังก์ชันที่ใช้ในการเชื่อมต่อกับฐานข้อมูล MongoDB โดยใช้ Mongoose, 
// ซึ่งเป็น ODM (Object Data Modeling) สำหรับ MongoDB ใน Node.js.
connectDB();

// ทำการ import ข้อมูลลงใน MongoDB
const importData = async() => {
    try {
        // await Order.deleteMany();, 
        // await Product.deleteMany();, 
        // และ await User.deleteMany();: 
        // ทำการลบข้อมูลทั้งหมดใน collections Order, Product, และ User ใน MongoDB 
        // ** เพื่อให้ข้อมูลในฐานข้อมูลเริ่มต้นจากศูนย์ (fresh start) **
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();


        // 1. นำข้อมูลผู้ใช้จาก array users
        // 2. ใช้ insertMany เพื่อเพิ่มข้อมูลลงใน collection User ใน MongoDB.
        // ** เป็นการเพิ่มข้อมูล user ใหม่
        const createdUsers =  await User.insertMany(users);

        // มีการดึงไอดีของผู้ใช้ admin จาก createdUsers และสร้าง adminUser เป็น index ที่ 0 
        // index 0 คือ ข้อมูลของ array ตัวแรกสุดในการสร้าง createdUsers ซึ่งก็คือ adminUser
        // ** createdUsers[0]._id คือการเข้าถึงไอดีของผู้ใช้ admin ที่ถูกสร้างขึ้นแรกใน array ของผู้ใช้ที่ถูกสร้าง. **
        const adminUser = createdUsers[0]._id;

        // ** ทำการสร้าง sampleProducts ซึ่งมี โครงสร้างเดียวกับ products แต่ เพิ่ม user: adminUser เข้าไปอีก property
        // 1. ทำการคัดลอกคุณสมบัติของ products และ return ออกมาเรื่อยๆตาม property ของ products โดยใช้ map
        // 2. เพิ่ม property user: adminUser
        const sampleProducts = products.map((product) => {
            return {...product, user:adminUser}
        });

        // นำ sampleProducts และใช้ insertMany เพื่อเพิ่มข้อมูลสินค้าลงใน collection Product ใน MongoDB.
        await Product.insertMany(sampleProducts);
        
        // กรณีสำเร็จ: แสดงข้อความ "Data Imported !!!" และทำการปิดแอปพลิเคชัน
        console.log('Data Imported !!!'.green.inverse);
        // process.exit() ใช้เพื่อจบการทำงานของโปรแกรมโดยไม่ระบุข้อมูลเพิ่มเติม และจะส่ง exit code 0 กลับ (successful exit).
        process.exit();


    } catch (error) {
        // กรณีเกิดข้อผิดพลาด: แสดงข้อความผิดพลาดและทำการปิดแอปพลิเคชัน 
        console.error(colors.red.inverse(`${error}`));
        // process.exit(1) ใช้เพื่อจบการทำงานของโปรแกรมและส่ง exit code 1 กลับ เพื่อบ่งบอกว่าโปรแกรมมีข้อผิดพลาดหรือขัดข้องในการทำงาน.
        process.exit(1)
    }
}


// Delete Data
const destroyData = async() => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data destroyed !!!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(colors.red.inverse(`${error}`));
        process.exit(1);
    }
}


// ** node script.js -d เพื่อลบข้อมูลทั้งหมดในฐานข้อมูล.
// node script.js เพื่อนำเข้าข้อมูลใหม่เข้าฐานข้อมูล.**

// 1. ตรวจสอบว่าผู้ใช้ได้ป้อน -d ผ่าน CLI หรือไม่ ถ้าใช่ก็จะเรียกฟังก์ชัน 
// destroyData() ที่ทำงานเพื่อลบข้อมูลทั้งหมดในฐานข้อมูล.
// 2. process.argv[0]: เป็น 'node'
// process.argv[1]: เป็นชื่อของไฟล์ script.js
// process.argv[2]: เป็นข้อมูลที่ถูกป้อนโดยผู้ใช้ผ่าน CLI
if (process.argv[2]==='-d'){
    destroyData();

    // 1. ถ้าไม่ใช่ process.argv[2]==='-d': ก็จะถือว่าผู้ใช้ไม่ได้ป้อน -d และจะเรียกฟังก์ชัน 
    // importData() ที่ทำงานเพื่อนำเข้าข้อมูลใหม่เข้าฐานข้อมูล.
}else{
    importData();
}