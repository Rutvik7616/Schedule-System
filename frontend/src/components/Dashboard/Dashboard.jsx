import React from 'react';
import { Link } from 'react-router-dom';
import AvailabilityForm from '../components/Dashboard/AvailabilityForm';

const Dashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/dashboard" className="flex items-center">
                <span className="text-2xl font-bold text-blue-600">Schedule System</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="flex flex-col items-center justify-center text-center px-4 sm:px-0 mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to Your Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your availability and view your scheduled appointments
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 gap-6 px-4 sm:px-0">
          {/* Main Content Area */}
          <div className="max-w-3xl mx-auto w-full">
            <div className="bg-white shadow-sm rounded-lg">
              <div className="p-6 text-center">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Set Your Availability</h2>
                <AvailabilityForm />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-sm mt-8">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Schedule System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard; 