import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

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
        generateToken(res, user._id)

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
    // ทำการดึงข้อมูล name, email, และ password ที่ถูกส่งมาใน req.body (ส่วนข้อมูลที่ผู้ใช้กรอกในฟอร์มหน้าเว็บ)
    const {name,email,password} = req.body

    // ตรวจสอบว่ามีผู้ใช้ที่มีอีเมลที่ถูกส่งมาแล้วหรือยัง โดยใช้ Mongoose
    const userExists = await User.findOne({ email });

    if (userExists){
        res.status(400);
        throw new Error('User already exists');
    }

    // สร้างผู้ใช้ใหม่ในฐานข้อมูลโดยใช้ User.create()
    const user = await User.create({
        name,
        email,
        password
    })

    // ตรวจสอบว่าการสร้างผู้ใช้สำเร็จหรือไม่
    if (user){
        // ถ้าสำเร็จ, จะทำการสร้าง token และส่งคำตอบกลับไปยัง client
        generateToken(res,user._id)
        res.status(201).json({
            _id: user._id,
            name : user.name,
            email:user.email,
            isAdmin: user.isAdmin,
        })
    }
    else{
        res.status(400);
        throw new Error('User already exists');
    }
})

// @desc    Logout user / clear cookie
// @route   POST /api/user/logout
// @access  Private
const logoutUser = asyncHandler(async(req,res)=>{

    // ส่วนนี้ใช้สร้างคุกกี้ชื่อ 'jwt' และกำหนดให้มีค่าเป็นว่าง ๆ ('')
    res.cookie('jwt','',{
        httpOnly: true,

        // หมายถึงคุกกี้นี้จะหมดอายุทันที (expired).
        expires: new Date(0)
    });

    // ใช้รหัสสถานะ HTTP 200 (OK)
    res.status(200).json({message: 'Logged out Successfully'})
})

// @desc    Get user Profile
// @route   Get /api/user/profile
// @access  Private
const getUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)
    if (user){
        res.status(200).json({
            _id : user._id,
            name : user.name,
            email : user.email,
            isAdmin : user.isAdmin
        })
    }else{
        res.status(404);
        throw new Error('User not Found');
    }
})

// @desc    Update user Profile
// @route   PUT /api/user/profile
// @access  Private
const updateUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)
    if(user){
        // ทำการอัปเดต name และ email ของผู้ใช้ตามค่าที่ระบุในข้อมูลคำขอ
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        // หากมีรหัสผ่านใหม่ที่ระบุในข้อมูลคำขอ จะทำการอัปเดตรหัสผ่านของผู้ใช้ด้วย
        if(req.body.password){
            user.password = req.body.password
        };

        const updatedUser = await user.save();

        // ส่งคำตอบ JSON กลับไปยังไคลเอ็นต์ ประกอบด้วยข้อมูลผู้ใช้ที่อัปเดต ซึ่งรวมถึง ID (_id) ชื่อ อีเมล และสถานะ isAdmin
        res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin
    });
    }
    else{
        res.status(404);
        throw new Error('User not found');
    }
})

// @desc    Get user
// @route   Get /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async(req, res) => {
    const user = await User.find({});
    res.status(200).json(user)
})

// @desc    Get user by ID
// @route   Get /api/users/:id
// @access  Private/Admin
const getUserByID = asyncHandler(async(req, res) => {

    // .select('-password') จะดึงข้อมูลผู้ใช้ทั้งหมดยกเว้นฟิลด์ password
    const user = await User.findById(req.params.id).select('-password')
    if (user){
        res.status(200).json(user)
    } else {
        res.status(404);
        throw new Error('User not found')
    }
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)
    if (user){
        if(user.isAdmin) {
            res.status(404);
            throw new Error ('Cannot Delete Admin User');
        } else {
            // จะลบข้อมูลของผู้ใช้ที่มี _id ตรงกับ _id ของผู้ใช้ที่ได้มาจาก User.findById(req.params.id) ที่กำลังตรวจสอบอยู่.
            await User.deleteOne({_id : user._id});
            res.status(200).json({ message: 'User deleted successfully' })
        }
    } else {
        res.status(404);
        throw new Error('User not found')
    }
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id);

    if(user){
        // req.body.name || user.name => user.name คือ name อันเก่าที่มีอยู่แล้วในระบบ
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin)

        const updateNewInfoUser = await user.save();
        res.status(200).json({
            _id: updateNewInfoUser._id,
            name: updateNewInfoUser.name,
            email: updateNewInfoUser.email,
            isAdmin: updateNewInfoUser.isAdmin,
        })
    } else {
        res.status(404);
        throw new Error('User mot Found');
    }
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