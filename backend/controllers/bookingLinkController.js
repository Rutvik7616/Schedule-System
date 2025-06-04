const BookingLink = require('../models/BookingLink');
const crypto = require('crypto');

exports.generateLink = async (req, res) => {
  try {
    const userId = req.user.id;
    const linkId = crypto.randomBytes(4).toString('hex');
    await BookingLink.create({ userId, linkId });
    res.json({ linkId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate link' });
  }
};
