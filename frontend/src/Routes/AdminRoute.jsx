import React from 'react'
import LoginPage from '../Pages/AdminPages/LoginPage';
import { Routes, Route } from "react-router-dom";
import AdminDashboard from '../Pages/AdminPages/DashboardPage';
import AdminLayout from '../Pages/AdminPages/AdminLayout';
import { Toaster } from 'sonner';
import { useSelector } from 'react-redux';

function UserRoute() {
  const  admin  =  useSelector((store) => store.UserData.isAuthenticated);

    return (
        <div>
            <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route element={<AdminLayout/>}>
            <Route path='/dashboard' element={<AdminDashboard/>} />
            </Route>
            </Routes>
            <Toaster position="top-center" richColors/>
        </div >
    )
}

export default UserRoute

