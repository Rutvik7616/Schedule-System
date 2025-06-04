const mongoose = require('mongoose');

const BookingLinkSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  linkId: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('BookingLink', BookingLinkSchema);
