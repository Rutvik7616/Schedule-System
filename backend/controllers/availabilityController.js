const Availability = require('../models/Availability');

exports.createAvailability = async (req, res) => {
  try {
    const { date, startTime, endTime } = req.body;
    const userId = req.user.id;

    // Validate date format (DD/MM/YYYY)
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(date)) {
      return res.status(400).json({ error: 'Invalid date format. Please use DD/MM/YYYY' });
    }

    const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
      return res.status(400).json({ error: 'Invalid time format. Please use HH:mm' });
    }

    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    if (startHour > endHour || (startHour === endHour && startMinute >= endMinute)) {
      return res.status(400).json({ error: 'End time must be after start time' });
    }

    const availability = await Availability.create({
      userId,
      date, 
      startTime,
      endTime
    });

    res.json(availability);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to create availability' });
  }
};
