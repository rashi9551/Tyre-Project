import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSignOutAlt, FaTachometerAlt, FaUsers, FaChartLine } from 'react-icons/fa';
import { adminLogout } from '../../Redux/Slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AdminSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(adminLogout());
    navigate('/admin');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className='w-64 bg-gray-800 text-gray-100 h-screen fixed left-0 top-0 overflow-y-auto transition-all duration-300 ease-in-out'>
      <div className='p-5 border-b border-gray-700'>
        <h1 className='text-2xl font-bold text-white'>Admin Dashboard</h1>
      </div>
      <nav className='mt-6'>
        <Link to='/admin/dashboard' className={`block py-3 px-4 transition duration-200 ${isActive('/admin/dashboard') ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 hover:text-white'}`}>
          <div className='flex items-center'>
            <FaTachometerAlt className='mr-3' />
            <span>Dashboard</span>
          </div>
        </Link>
        <Link to='/admin/sendOffer' className={`block py-3 px-4 transition duration-200 ${isActive('/admin/sales') ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 hover:text-white'}`}>
          <div className='flex items-center'>
            <FaChartLine className='mr-3' />
            <span>Send Offer</span>
          </div>
        </Link>
        <Link to='/admin/customers' className={`block py-3 px-4 transition duration-200 ${isActive('/admin/customers') ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 hover:text-white'}`}>
          <div className='flex items-center'>
            <FaUsers className='mr-3' />
            <span>Total Customers</span>
          </div>
        </Link>
        <Link to='/admin/sales' className={`block py-3 px-4 transition duration-200 ${isActive('/admin/sales') ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 hover:text-white'}`}>
          <div className='flex items-center'>
            <FaChartLine className='mr-3' />
            <span>Sales</span>
          </div>
        </Link>
      </nav>
      <div className='absolute bottom-0 w-full border-t border-gray-700'>
        <button 
          onClick={handleLogout} 
          className='block w-full py-3 px-4 transition duration-200 hover:bg-red-600 hover:text-white text-left'
        >
          <div className='flex items-center'>
            <FaSignOutAlt className='mr-3' />
            <span>Logout</span>
          </div>
        </button>
      </div>
    </div>
  );
}

export default AdminSidebar;
