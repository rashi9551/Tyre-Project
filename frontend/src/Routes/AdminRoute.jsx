import React from 'react'
import LoginPage from '../Pages/AdminPages/LoginPage';
import { Routes, Route } from "react-router-dom";
import AdminDashboard from '../Pages/AdminPages/DashboardPage';
import AdminLayout from '../Pages/AdminPages/AdminLayout';

function UserRoute() {
    return (
        <div>
            <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route element={<AdminLayout/>}>
            <Route path='/dashboard' element={<AdminDashboard/>} />
            </Route>
            </Routes>
        </div >
    )
}

export default UserRoute

