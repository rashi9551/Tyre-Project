import React from 'react'
import LoginPage from '../Pages/AdminPages/LoginPage';
import { Routes, Route } from "react-router-dom";
import AdminDashboard from '../Pages/AdminPages/DashboardPage';

function UserRoute() {
    return (
        <div>
            <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/dashboard' element={<AdminDashboard/>} />
            </Routes>
        </div >
    )
}

export default UserRoute

