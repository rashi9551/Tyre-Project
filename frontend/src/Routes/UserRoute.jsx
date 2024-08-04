import React from "react";
import SignupPage from "../Pages/UserPages/SignupPage";
import LoginPage from "../Pages/UserPages/LoginPage";
import { Routes, Route, Navigate } from "react-router-dom";
import SharedLayout from "../Pages/UserPages/SharedLayout";
import Dashboard from "../Pages/UserPages/Dashboard";
import TyresManagement from "../Pages/UserPages/TyresManagement";
import OilsManagement from "../Pages/UserPages/OilsManagement";
import { Toaster } from "sonner";
import { useSelector } from "react-redux";
import TyresPurchaseManagement from "../Pages/UserPages/TyresPurchaseManagement";

function UserRoute() {
  const  user  =  useSelector((store) => store.UserData.isAuthenticated);
 
  return (
    <div>
      <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
        <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <SignupPage />} />
        <Route element={<SharedLayout />}>
          <Route path="/dashboard" element={!user ? <Navigate to="/" /> : <Dashboard />}  />
          <Route path="/tyres" element={!user ? <Navigate to="/" /> : <TyresManagement />}  />
          <Route path="/oils" element={!user ? <Navigate to="/" /> : <OilsManagement />}  />
          <Route path="/tyresOrder" element={!user ? <Navigate to="/" /> : <TyresPurchaseManagement />}  />

        </Route>
      </Routes>
      <Toaster position="top-center" richColors/>
    </div>
  );
}

export default UserRoute;
