import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../Redux/Slice';
import { FaTachometerAlt, FaAlignCenter, FaCartPlus, FaOilCan, FaSignOutAlt } from 'react-icons/fa';

function Sidebar() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className='w-64 bg-gray-800 text-white h-screen fixed left-0 top-0 overflow-y-auto transition-all duration-300 ease-in-out'>
      <div className='p-5 border-b border-gray-700'>
        <h1 className='text-2xl font-bold'>Dashboard</h1>
      </div>
      <nav className='mt-6'>
        <Link to='/dashboard' className='block py-3 px-4 transition duration-200 hover:bg-gray-700 hover:text-white'>
          <div className='flex items-center'>
            <FaTachometerAlt className='mr-3' />
            <span>Dashboard</span>
          </div>
        </Link>
        <Link to='/tyres' className='block py-3 px-4 transition duration-200 hover:bg-gray-700 hover:text-white'>
          <div className='flex items-center'>
            <FaAlignCenter className='mr-3' />
            <span>Tyres Alignment</span>
          </div>
        </Link>
        <Link to='/tyresOrder' className='block py-3 px-4 transition duration-200 hover:bg-gray-700 hover:text-white'>
          <div className='flex items-center'>
            <FaCartPlus className='mr-3' />
            <span>Tyres Order</span>
          </div>
        </Link>
        <Link to='/oils' className='block py-3 px-4 transition duration-200 hover:bg-gray-700 hover:text-white'>
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
  );
}

export default Sidebar;
