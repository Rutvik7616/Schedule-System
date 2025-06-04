const mongoose = require('mongoose');

const AvailabilitySchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  date: { 
    type: String, 
    required: true,
    validate: {
      validator: function(v) {
        return /^\d{2}\/\d{2}\/\d{4}$/.test(v); 
      },
      message: props => `${props.value} is not a valid date format! Use DD/MM/YYYY`
    }
  },
  startTime: { 
    type: String, 
    required: true,
    validate: {
      validator: function(v) {
        return /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/.test(v);
      },
      message: props => `${props.value} is not a valid time format! Use HH:mm`
    }
  },
  endTime: { 
    type: String, 
    required: true,
    validate: {
      validator: function(v) {
        return /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/.test(v);
      },
      message: props => `${props.value} is not a valid time format! Use HH:mm`
    }
  }
}, {
  timestamps: true
});

AvailabilitySchema.pre('save', function(next) {
  if (this.startTime && this.endTime) {
    const [sh, sm] = this.startTime.split(':').map(Number);
    const [eh, em] = this.endTime.split(':').map(Number);

    if (eh < sh || (eh === sh && em <= sm)) {
      return next(new Error('End time must be after start time'));
    }
  }
  next();
});

module.exports = mongoose.model('Availability', AvailabilitySchema);
