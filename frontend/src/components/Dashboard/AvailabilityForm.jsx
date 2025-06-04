import React, { useState } from 'react';
import axios from '../../api/axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, parse } from 'date-fns';

const AvailabilityForm = () => {
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [availabilities, setAvailabilities] = useState([]);
  const [linkId, setLinkId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const formatDisplayDate = (dateString) => {
    try {
      const parsedDate = parse(dateString, 'dd/MM/yyyy', new Date());
      return format(parsedDate, 'dd/MM/yyyy');
    } catch (error) {
      console.error('Error parsing date:', error);
      return dateString; 
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await axios.post('/api/availability', {
        date: format(date, 'dd/MM/yyyy'),
        startTime: format(startTime, 'HH:mm'),
        endTime: format(endTime, 'HH:mm'),
      });
      setAvailabilities([...availabilities, res.data]);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save availability');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  

  const handleGenerateLink = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await axios.post('/api/link/generate');
      setLinkId(res.data.linkId);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate link');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Add New Availability</h3>
          
          <div className="space-y-6">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                placeholderText="Select date"
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                <DatePicker
                  selected={startTime}
                  onChange={(time) => setStartTime(time)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  timeCaption="Time"
                  dateFormat="HH:mm"
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                <DatePicker
                  selected={endTime}
                  onChange={(time) => setEndTime(time)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  timeCaption="Time"
                  dateFormat="HH:mm"
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <button 
              onClick={handleSave}
              disabled={loading}
              className={`w-full py-3 px-4 flex justify-center items-center rounded-lg text-white font-medium transition-colors ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                'Save Availability'
              )}
            </button>
          </div>
        </div>

        {/* Availabilities List Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Your Availabilities</h3>
          
          <div className="space-y-4">
            {availabilities.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 text-4xl mb-3">📅</div>
                <p className="text-gray-500">No availabilities set yet</p>
                <p className="text-sm text-gray-400 mt-1">Add your first availability using the form</p>
              </div>
            ) : (
              <div className="space-y-3">
                {availabilities.map((a, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-blue-100 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="text-blue-500 mr-3">📅</div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {formatDisplayDate(a.date)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {a.startTime} - {a.endTime}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <button 
              onClick={handleGenerateLink}
              disabled={loading || availabilities.length === 0}
              className={`w-full py-3 px-4 flex justify-center items-center rounded-lg text-white font-medium transition-colors ${
                loading || availabilities.length === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                'Generate Booking Link'
              )}
            </button>
          </div>

          {linkId && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Booking Link</h4>
                  <p className="text-sm text-gray-500 mt-1">Share this link with your clients</p>
                </div>
                <button 
                  onClick={() => navigator.clipboard.writeText(`${window.location.origin}/book/${linkId}`)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Copy
                </button>
              </div>
              <div className="mt-3">
                <a 
                  href={`/book/${linkId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm break-all"
                >
                  {window.location.origin}/book/{linkId}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AvailabilityForm;
