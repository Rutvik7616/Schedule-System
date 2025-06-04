const express = require('express');
const router = express.Router();
const { createAvailability } = require('../controllers/availabilityController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, createAvailability);
module.exports = router;
