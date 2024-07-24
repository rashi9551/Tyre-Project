import React from 'react';
import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <div className='w-1/6 bg-gray-600 fixed h-full px-4 py-2'>
      <div className='my-2 mb-4'>
        <h1 className='text-2x text-white font-bold'>
          USER Dashboard
        </h1>
      </div>
      <hr />
      <ul className='mt-3 text-white font-bold text-left'>
        <Link to='/dashboard' className=''>
          <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
            Dashboard
          </li>
        </Link>
        <Link to='/tyres' className=''>
          <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
            Tyres
          </li>
        </Link>
        <Link to='/oils' className=''>
          <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
            Oils
          </li>
        </Link>
      </ul>
    </div>
  )
}

export default Sidebar
