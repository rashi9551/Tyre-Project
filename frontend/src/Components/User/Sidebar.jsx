import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../Redux/Slice';
import { FaTachometerAlt, FaAlignCenter, FaCartPlus, FaOilCan, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

function Sidebar() {
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
    dispatch(logout());
    navigate('/');
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  const isActive = (path) => location.pathname === path;

  const sidebarClasses = `
    bg-gray-800 text-white h-screen overflow-y-auto transition-all duration-300 ease-in-out
    ${isMobile ? (isOpen ? 'w-64 fixed left-0 top-0 z-40' : 'w-0 fixed left-0 top-0') : 'w-64 fixed left-0 top-0'}
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
          <h1 className='text-2xl font-bold'>Dashboard</h1>
        </div>
        <nav className='mt-6'>
          <Link to='/dashboard' className={`${linkClasses} ${isActive('/dashboard') ? activeLinkClasses : ''}`}>
            <div className='flex items-center'>
              <FaTachometerAlt className='mr-3' />
              <span>Dashboard</span>
            </div>
          </Link>
          <Link to='/tyres' className={`${linkClasses} ${isActive('/tyres') ? activeLinkClasses : ''}`}>
            <div className='flex items-center'>
              <FaAlignCenter className='mr-3' />
              <span>Tyres Alignment</span>
            </div>
          </Link>
          <Link to='/tyresOrder' className={`${linkClasses} ${isActive('/tyresOrder') ? activeLinkClasses : ''}`}>
            <div className='flex items-center'>
              <FaCartPlus className='mr-3' />
              <span>Tyres Order</span>
            </div>
          </Link>
          <Link to='/oils' className={`${linkClasses} ${isActive('/oils') ? activeLinkClasses : ''}`}>
            <div className='flex items-center'>
              <FaOilCan className='mr-3' />
              <span>Oils</span>
            </div>
          </Link>
        </nav>
        <div className='absolute bottom-0 w-full'>
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

export default Sidebar;
