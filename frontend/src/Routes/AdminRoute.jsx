import React from 'react'
import LoginPage from '../Pages/AdminPages/LoginPage';
import { Routes, Route,Navigate } from "react-router-dom";
import AdminDashboard from '../Pages/AdminPages/DashboardPage';
import AdminLayout from '../Pages/AdminPages/AdminLayout';
import { Toaster } from 'sonner';
import { useSelector } from 'react-redux';
import OfferMessagePage from '../Pages/AdminPages/OfferMessage';

function UserRoute() {
  const  admin  =  useSelector((store) => store.adminData.isAuthenticated);

    return (
        <div>
            <Routes>
            <Route path='/' element={admin ? <Navigate to="/admin/dashboard" /> : <LoginPage />} />
            <Route element={<AdminLayout/>}>
            <Route path='/dashboard' element={admin ? <AdminDashboard /> : <LoginPage />} />
            <Route path='/sendOffer' element={admin ? <OfferMessagePage /> : <LoginPage />} />
            </Route>
            </Routes>
            <Toaster position="top-center" richColors/>
        </div >
    )
}

export default UserRoute

