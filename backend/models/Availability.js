const mongoose = require('mongoose');

const AvailabilitySchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  date: { 
    type: String, 
    required: true 
  },
  startTime: { 
    type: String, 
    required: true
  },
  endTime: { 
    type: String, 
    required: true 
  }
}, {
  timestamps: true
});

AvailabilitySchema.pre('save', function(next) {
  const [sh, sm] = this.startTime.split(':').map(Number);
  const [eh, em] = this.endTime.split(':').map(Number);
  if (eh < sh || (eh === sh && em <= sm)) {
    return next(new Error('End time must be after start time'));
  }
  next();
});

module.exports = mongoose.model('Availability', AvailabilitySchema);
