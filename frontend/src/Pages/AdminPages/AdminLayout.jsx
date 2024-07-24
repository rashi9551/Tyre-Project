import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../../Components/Admin/AdminSidebar'

function AdminLayout() {
  return (
    <div className="flex">
    <AdminSidebar />
    <div className="flex-1 ml-[16.67%] p-4">
      <Outlet />
    </div>
  </div>
  )
}

export default AdminLayout
