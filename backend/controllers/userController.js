import asyncHandler from '../middleware/asyncHandler.js'
import User from '../models/userModel.js'

// @desc    Auth user and Get token
// @route   POST /api/user/login
// @access  Public
const authUser = asyncHandler(async(req, res) => {
    res.send('auth user')
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