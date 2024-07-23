import React from 'react'
import LoginPage from '../Pages/AdminPages/LoginPage';
import { Routes, Route } from "react-router-dom";

function UserRoute() {
    return (
        <div>
            <Routes>
            <Route path='/' element={<LoginPage />} />
            </Routes>
        </div >
    )
}

export default UserRoute

