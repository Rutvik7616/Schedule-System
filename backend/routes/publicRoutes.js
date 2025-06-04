const express = require('express');
const router = express.Router();
const {
  getAvailabilityByLinkId,
  getSlotsForDate,
  bookSlot,
} = require('../controllers/publicBookingController');

router.get('/:linkId/availability', getAvailabilityByLinkId);
router.get('/:linkId/slots/:date', getSlotsForDate);
router.post('/booking', bookSlot);

module.exports = router;
