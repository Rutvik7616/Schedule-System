import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { useParams, Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import SlotSelector from './SlotSelector';

const BookingPage = () => {
  const { linkId } = useParams();
  const [selectedDate, setSelectedDate] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [ownerName, setOwnerName] = useState('');
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchOwnerDetails = async () => {
      try {
        const res = await axios.get(`/api/book/${linkId}/availability`);
        setOwnerName(res.data.ownerName || 'Calendar Owner');
      } catch (err) {
        setError('Invalid or expired booking link');
        console.error(err);
      } finally {
        setInitialLoading(false);
      }
    };

    if (linkId) {
      fetchOwnerDetails();
    }
  }, [linkId]);

  const handleDateChange = async (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    setError('');
    
    if (!date) {
      setSlots([]);
      return;
    }

    setLoading(true);
    const urlFormattedDate = format(date, 'dd-MM-yyyy');
    
    try {
      const res = await axios.get(`/api/book/${linkId}/slots/${urlFormattedDate}`);
      // Format slots as HH:mm if they're not already formatted
      const formattedSlots = (res.data.slots || []).map(slot => {
        // If slot is already formatted, return as is
        if (typeof slot === 'string' && slot.includes(':')) {
          return slot;
        }
        // If slot is a number or unformatted, format it as HH:mm
        const hours = Math.floor(slot / 60);
        const minutes = slot % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      });
      setSlots(formattedSlots);
    } catch (err) {
      setError('Failed to fetch available slots');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async () => {
    if (!selectedDate || !selectedSlot) {
      setError('Please select both date and time slot');
      return;
    }

    setLoading(true);
    setError('');

    const formattedDate = format(selectedDate, 'dd/MM/yyyy');

    try {
      await axios.post('/api/book/booking', {
        linkId,
        date: formattedDate,
        time: selectedSlot,
      });

      setBookingSuccess(true);
      setSlots(slots.filter(slot => slot !== selectedSlot));
      setSelectedSlot(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to book the slot');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleNewBooking = () => {
    setBookingSuccess(false);
    setSelectedDate(null);
    setSelectedSlot(null);
    setSlots([]);
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading booking page...</p>
        </div>
      </div>
    );
  }

  if (error === 'Invalid or expired booking link') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-xl w-full bg-white rounded-xl shadow-lg p-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">Invalid Booking Link</h2>
            <p className="mt-2 text-gray-600">{error}</p>
            <Link to="/" className="mt-6 inline-block text-blue-600 hover:text-blue-800">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (bookingSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-xl w-full bg-white rounded-xl shadow-lg p-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">Booking Confirmed! 🎉</h2>
            <div className="mt-6 bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 mb-2">
                <span className="font-medium">Date:</span> {format(selectedDate, 'dd/MM/yyyy')}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Time:</span> {selectedSlot}
              </p>
            </div>
            <div className="mt-8 space-y-4">
              <button 
                onClick={handleNewBooking}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Book Another Slot
              </button>
              <Link 
                to="/dashboard"
                className="inline-block text-gray-600 hover:text-gray-800"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center">
              Book a Session with {ownerName}
            </h2>
            <p className="mt-2 text-center text-gray-600">
              Select your preferred date and time slot below
            </p>

            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex">
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

            <div className="mt-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                placeholderText="Choose a date"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {loading ? (
              <div className="mt-8 text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading available slots...</p>
              </div>
            ) : (
              <>
                {selectedDate && (
                  <div className="mt-8">
                    <SlotSelector
                      slots={slots}
                      selectedSlot={selectedSlot}
                      onSelect={setSelectedSlot}
                    />
                  </div>
                )}

                {selectedSlot && (
                  <div className="mt-8 text-center">
                    <button 
                      onClick={handleBook}
                      disabled={loading}
                      className={`w-full sm:w-auto px-8 py-3 rounded-lg text-white font-medium transition-all transform hover:scale-105 ${
                        loading 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                      }`}
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Booking...
                        </div>
                      ) : (
                        'Confirm Booking'
                      )}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;