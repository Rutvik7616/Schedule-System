const express = require('express');
const router = express.Router();
const { generateLink } = require('../controllers/bookingLinkController');
const auth = require('../middleware/authMiddleware');

router.post('/generate', auth, generateLink);
module.exports = router;
