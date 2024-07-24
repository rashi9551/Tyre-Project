import React from 'react'
import { Bar, Doughnut } from 'react-chartjs-2';

function AdminDashboard() {
    const tyreData = {
        labels: ['Car Tyres', 'Truck Tyres', 'Bike Tyres'],
        datasets: [
          {
            data: [300, 150, 100],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          },
        ],
      };
    
      const oilData = {
        labels: ['Engine Oil', 'Transmission Oil', 'Brake Fluid'],
        datasets: [
          {
            label: 'Sales in Liters',
            data: [1200, 800, 500],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          },
        ],
      };
    
      const barOptions = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Oil Sales',
          },
        },
      };
    
      return (
        <div className="p-6 bg-gray-100">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Tyre Sales Distribution</h2>
              <Doughnut data={tyreData} />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Oil Sales</h2>
              <Bar options={barOptions} data={oilData} />
            </div>
          </div>
    
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Total Tyre Customers</h3>
              <p className="text-3xl font-bold">1,234</p>
            </div>
            <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Total Oil Customers</h3>
              <p className="text-3xl font-bold">5,678</p>
            </div>
            <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Tyre Stock</h3>
              <p className="text-3xl font-bold">789 units</p>
            </div>
            <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Oil Stock</h3>
              <p className="text-3xl font-bold">2,500 L</p>
            </div>
          </div>
        </div>
      );
    }


export default AdminDashboard
