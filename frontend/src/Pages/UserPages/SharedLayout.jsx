import React from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from '../../Components/User/Sidebar';

function SharedLayout() {
  return (
    <div className="flex">
    <Sidebar />
    <div className="flex-1 ml-[16.67%] p-4">
      <Outlet />
    </div>
  </div>
  )
}

export default SharedLayout

