import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
}, {
    timestamps: true,
});

// bcrypt.compare ใช้เพื่อเปรียบเทียบรหัสผ่านที่ผู้ใช้ป้อนเข้ามา (enteredPassword) 
// กับรหัสผ่านที่เก็บในฐานข้อมูล (this.password).
userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}


const User = mongoose.model("User", userSchema);

export default User;