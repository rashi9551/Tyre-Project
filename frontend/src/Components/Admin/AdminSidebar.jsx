import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSignOutAlt, FaTachometerAlt, FaUsers, FaChartLine, FaBars, FaTimes, FaUserTie } from 'react-icons/fa';
import { adminLogout } from '../../Redux/Slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AdminSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    dispatch(adminLogout());
    navigate('/admin');
  };

  const isActive = (path) => location.pathname === path;

  const toggleSidebar = () => setIsOpen(!isOpen);

  const sidebarClasses = `
    bg-gray-800 text-gray-100 h-screen overflow-y-auto transition-all duration-300 ease-in-out
    ${isMobile ? (isOpen ? 'w-64 fixed left-0 top-0' : 'w-0 fixed left-0 top-0') : 'w-64 fixed left-0 top-0'}
  `;

  const linkClasses = `
    block py-3 px-4 transition duration-200
    hover:bg-gray-700 hover:text-white
  `;

  const activeLinkClasses = `
    bg-blue-600 text-white
  `;

  return (
    <>
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      )}
      <div className={sidebarClasses}>
        <div className='p-5 border-b border-gray-700'>
          <h1 className='text-2xl font-bold text-white'>Admin Dashboard</h1>
        </div>
        <nav className='mt-6'>
          <Link to='/admin/dashboard' className={`${linkClasses} ${isActive('/admin/dashboard') ? activeLinkClasses : ''}`}>
            <div className='flex items-center'>
              <FaTachometerAlt className='mr-3' />
              <span>Dashboard</span>
            </div>
          </Link>
          <Link to='/admin/sendOffer' className={`${linkClasses} ${isActive('/admin/sendOffer') ? activeLinkClasses : ''}`}>
            <div className='flex items-center'>
              <FaChartLine className='mr-3' />
              <span>Send Offer</span>
            </div>
          </Link>
          <Link to='/admin/employees' className={`${linkClasses} ${isActive('/admin/employees') ? activeLinkClasses : ''}`}>
            <div className='flex items-center'>
              <FaUserTie className='mr-3' />
              <span>Employees</span>
            </div>
          </Link>
          <Link to='/admin/customers' className={`${linkClasses} ${isActive('/admin/customers') ? activeLinkClasses : ''}`}>
            <div className='flex items-center'>
              <FaUsers className='mr-3' />
              <span>Total Customers</span>
            </div>
          </Link>
          <Link to='/admin/sales' className={`${linkClasses} ${isActive('/admin/sales') ? activeLinkClasses : ''}`}>
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
    </>
  );
}

export default AdminSidebar;
