// *** ใช้สำหรับดักเส้นทางที่ไม่ได้ถูกกำหนด โดยการรับ request url แปลกๆ

const notFound = (req, res, next) => {
    // หากมีคำขอ (request) ถูกส่งมาที่ไม่ตรงกับเส้นทาง (route) ใด ๆ
    // 1. ก็จะถูกสร้างข้อผิดพลาดใหม่ที่มีข้อความว่า "Not Found - {originalUrl}"
    const error = new Error(`Not Found - ${req.originalUrl}`);

    // 2.  HTTP status code ให้เป็น 404 (Not Found)
    res.status(404);

    // 3. ส่งข้อผิดพลาดนี้ไปยัง Middleware ถัดไป (next(error)).
    next(error);
};

// มีข้อผิดพลาดใด ๆ เกิดขึ้นระหว่างการประมวลผลคำขอ จะเรียกใช้ errorHandler
const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    // *** กำหนด HTTP status code ของ response จาก status code (ถ้าไม่มีจะเซ็ตเป็น 500 Internal Server Error).
    // 1. ตรวจสอบว่าข้อผิดพลาดเป็นชนิดเฉพาะ (ในที่นี้คือ CastError และ kind เป็น 'ObjectId' หรือไม่)
    if(err.name  === 'CastError' && err.kind === 'ObjectId'){
        message = `Resource not found`;
        statusCode = 404;
    }

    // ส่ง response กลับไปที่ client ด้วย JSON object ที่ประกอบด้วย message และ stack 
    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? 'Cake': err.stack,
    })
}

export {notFound,errorHandler}