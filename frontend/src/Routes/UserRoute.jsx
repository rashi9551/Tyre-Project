import React from 'react'
import SignupPage from '../Pages/UserPages/SignupPage';
import LoginPage from '../Pages/UserPages/LoginPage';
import { Routes, Route } from "react-router-dom";
import SharedLayout from '../Pages/UserPages/SharedLayout';
import Dashboard from '../Pages/UserPages/Dashboard';
import TyresManagement from '../Pages/UserPages/TyresManagement';
import OilsManagement from '../Pages/UserPages/OilsManagement';

function UserRoute() {
    return (
        <div>
            <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route element={<SharedLayout />}>

<Route path='/dashboard' element={<Dashboard />} />
<Route path='/tyres' element={<TyresManagement />} />
<Route path='/oils' element={<OilsManagement />} />

</Route>
            </Routes>

        </div >
    )
}

export default UserRoute

