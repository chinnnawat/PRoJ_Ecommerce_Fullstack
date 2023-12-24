import asyncHandler from '../middleware/asyncHandler.js'
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken';


// @desc    Auth user and Get token
// @route   POST /api/user/login
// @access  Public
const authUser = asyncHandler(async(req, res) => {
    // คือการดึงข้อมูล email และ password จาก request body ที่ถูกส่งมาจากผู้ใช้ ซึ่งเป็นข้อมูลที่ผู้ใช้กรอกในฟอร์มหน้าเว็บ.
    const {email, password} = req.body;

    // ใช้ Mongoose (ODM สำหรับ MongoDB) ในการค้นหาผู้ใช้ในฐานข้อมูล โดยใช้เงื่อนไข {email} เพื่อหาผู้ใช้ที่มีอีเมลที่ตรงกับค่าที่ถูกส่งมา.
    const user = await User.findOne({email})

    // _id, name, email, และ isAdmin. ส่วนนี้ถูกใช้ในกรณีที่การตรวจสอบการยืนยันตัวตนเป็นที่เรียบร้อยและถูกต้อง.
    if(user && (await user.matchPassword(password))){

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET,{
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

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    }
    else{
        res.status(401);
        throw new Error('Invalid email or password')
    }
})

// @desc    Register user
// @route   POST /api/user
// @access  Public
const registerUser = asyncHandler(async(req, res) => {
    res.send('register user')
})

// @desc    Logout user / clear cookie
// @route   POST /api/user/logout
// @access  Private
const logoutUser = asyncHandler(async(req, res) => {
    res.send('Logout user')
})

// @desc    Get user Profile
// @route   Get /api/user/profile
// @access  Private
const getUserProfile = asyncHandler(async(req, res) => {
    res.send('get user profile')
})

// @desc    Update user Profile
// @route   PUT /api/user/profile
// @access  Private
const updateUserProfile = asyncHandler(async(req, res) => {
    res.send('update user profile')
})

// @desc    Get user
// @route   Get /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async(req, res) => {
    res.send('get users')
})

// @desc    Get user by ID
// @route   Get /api/users/:id
// @access  Private/Admin
const getUserByID = asyncHandler(async(req, res) => {
    res.send('get user by ID')
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async(req, res) => {
    res.send('delete user')
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async(req, res) => {
    res.send('update user')
})

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserByID,
    deleteUser,
    updateUser
}