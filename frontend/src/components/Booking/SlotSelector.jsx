import React from 'react';

const SlotSelector = ({ slots, selectedSlot, onSelect }) => {
  if (!slots || slots.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500">No available slots for this date</p>
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Available Time Slots
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {slots.map((slot) => (
          <button
            key={slot}
            onClick={() => onSelect(slot)}
            className={`py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedSlot === slot
                ? 'bg-blue-600 text-white transform scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SlotSelector;
