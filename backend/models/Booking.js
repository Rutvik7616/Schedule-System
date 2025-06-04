const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  linkId: { 
    type: String, 
    required: true 
  },
  date: { 
    type: String, 
    required: true 
  },
  time: { 
    type: String, 
    required: true 
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', BookingSchema);
