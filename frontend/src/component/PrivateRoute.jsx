import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

// PrivateRoute: เป็น functional component ที่ทำหน้าที่ตรวจสอบว่ามีข้อมูลผู้ใช้ (userInfo) 
// หรือไม่ ถ้ามีก็ให้แสดงเนื้อหาภายใน Outlet (child routes) มิฉะนั้นจะนำทางไปยังหน้า login.
const PrivateRoute = () => {
    const {userInfo} = useSelector(state => state.auth)
    return userInfo ? <Outlet/> : <Navigate to='/login' replace />
}

export default PrivateRoute