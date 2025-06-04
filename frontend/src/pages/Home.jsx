import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-8">
          Welcome to{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Schedule System
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-12 max-w-2xl">
          Streamline your scheduling process with our intuitive booking system. 
          Perfect for professionals, consultants, and businesses of all sizes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
          <Link
            to="/login"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-150 ease-in-out"
          >
            Sign In
          </Link>
          
          <Link
            to="/register"
            className="inline-flex items-center justify-center px-8 py-3 border border-blue-600 text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition duration-150 ease-in-out"
          >
            Create Account
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-150">
            <div className="text-blue-600 text-2xl mb-4">⏰</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Scheduling</h3>
            <p className="text-gray-600">Set your availability and let clients book time slots that work for both of you.</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-150">
            <div className="text-blue-600 text-2xl mb-4">🔄</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Automated Bookings</h3>
            <p className="text-gray-600">Eliminate back-and-forth emails with automated scheduling and confirmations.</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-150">
            <div className="text-blue-600 text-2xl mb-4">📱</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Mobile Friendly</h3>
            <p className="text-gray-600">Access your schedule and manage bookings from any device, anywhere.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Home;
