// 1. install : npm i bcryptjs
// 2. bcryptjs เป็นไลบรารีที่ใช้ในการเข้ารหัส (hash) และตรวจสอบรหัสผ่านใน Node.js 
// โดยมักนิยมใช้ในระบบการยืนยันตัวตน (authentication) หรือการจัดเก็บรหัสผ่านอย่างปลอดภัยในฐานข้อมูล.
// มีการป้องกันความปลอดภัยต่อการเจาะระบบ (security) ที่ดี

import bcryptjs from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        emali: 'admin@gmail.com',

        // 1. เมื่อใช้ hashSync, โปรแกรมจะหยุดการทำงานทั้งหมดรอให้การเข้ารหัสเสร็จสิ้นก่อนที่จะดำเนินการต่อ
        // ข้อดีของการใช้ hashSync คือคุณสามารถรับค่าเข้ารหัสที่เป็นผลลัพธ์ได้ทันทีและใช้ได้ทันทีโดยไม่ต้องรอให้ฟังก์ชันทำงานเสร็จสิ้น.
        // 2. ค่า 10 หมายถึงการใช้ 2^10 (1024) รอบเพื่อทำให้การเข้ารหัสมีความปลอดภัยมากยิ่งขึ้น
        password: bcryptjs.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'John Doe',
        email: 'john@email.com',
        password: bcryptjs.hashSync('123456', 10),
        isAdmin: false,
    },
    {
        name: 'Jane Doe',
        email: 'jane@email.com',
        password: bcryptjs.hashSync('123456', 10),
        isAdmin: false,
    }
];

export default users