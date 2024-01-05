import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

// AdminRoute: เป็น functional component ที่ทำหน้าที่ตรวจสอบว่ามีข้อมูลผู้ใช้ (userInfo) และเป็น Admin 
// หรือไม่ ถ้ามีก็ให้แสดงเนื้อหาภายใน Outlet (child routes) มิฉะนั้นจะนำทางไปยังหน้า login.
const AdminRoute = () => {
    const {userInfo} = useSelector(state => state.auth);

    return userInfo && userInfo.isAdmin ? (
        <Outlet/>
    ) : (
        <Navigate to='/login' replace/>
    )
}

export default AdminRoute