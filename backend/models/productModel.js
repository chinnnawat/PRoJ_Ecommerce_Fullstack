// ใช้ mogoose ในการเขียน Schema ของ models
import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    }
},{
    timestamps: true
})

// เขียน models ของ product เพื่อดูว่าสินค้า 1 ตัวต้องการเก็บค่าอะไรบ้าง
const productSchema = new mongoose.Schema({

    // 1. type เป็นการบอกประเภทข้อมูลนั้นๆ เช่น String, Number, Date, Boolean, Array, Object, และ ObjectId เป็นต้น 
    // 2. required ถ้าไม่มีค่า required และไม่ได้ระบุค่า default, Mongoose จะอนุญาตให้ field นั้นมีค่าเป็น null หรือ undefined. 
    // การกำหนด required ช่วยในการทำ validation และการตรวจสอบความสมบูรณ์ของข้อมูล.


    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0,
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0,
    }
},{
    timestamps: true,
})



// "Product" คือชื่อ Model ที่จะถูกใช้ใน MongoDB. ใน MongoDB, การใช้ชื่อ Model จะแปลงเป็นชื่อคอลเลคชันที่เก็บข้อมูล 
const Product = mongoose.model("Product", productSchema);

export default Product