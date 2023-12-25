import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn: '30d'
    });

    // Set JWT as HPPT-Only cookie
    res.cookie('jwt', token, {

        // ทำให้คุกกี้เข้าถึงได้เฉพาะผ่าน HTTP headers เท่านั้น และป้องกันการเข้าถึงผ่าน JavaScript ที่ทำงานในบราวเซอร์.
        httpOnly: true,
        
        secure: process.env.NODE_ENV !== 'development',

        //จำกัดการส่งคุกกี้เฉพาะถึงเว็บไซต์ที่ส่งคำขอเท่านั้น (ไม่ส่งให้โดเมนอื่น).
        sameSite: 'strict',
        maxAge: 30*24*60*60*1000, // 30 days
    })
}

export default generateToken