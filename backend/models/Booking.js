const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  linkId: { 
    type: String, 
    required: true 
  },
  date: { 
    type: String, 
    required: true,
    validate: {
      validator: function(v) {
        // Validate YYYY-MM-DD format
        return /^\d{4}-\d{2}-\d{2}$/.test(v);
      },
      message: props => `${props.value} is not a valid date format! Use YYYY-MM-DD`
    }
  },
  time: { 
    type: String, 
    required: true,
    validate: {
      validator: function(v) {
        // Validate HH:mm format
        return /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/.test(v);
      },
      message: props => `${props.value} is not a valid time format! Use HH:mm`
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', BookingSchema);