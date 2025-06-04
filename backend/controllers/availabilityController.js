const Availability = require('../models/Availability');
const { format, parse } = require('date-fns');

const convertDateFormat = (dateStr) => {
  try {
    const parsedDate = parse(dateStr, 'dd/MM/yyyy', new Date());
    return format(parsedDate, 'yyyy-MM-dd');
  } catch (err) {
    throw new Error('Invalid date format. Please use DD/MM/YYYY');
  }
};

exports.createAvailability = async (req, res) => {
  try {
    const { date, startTime, endTime } = req.body;
    const userId = req.user.id;

    const formattedDate = convertDateFormat(date);

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
      date: formattedDate,
      startTime,
      endTime
    });

    const response = {
      ...availability.toObject(),
      date: format(parse(availability.date, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy')
    };

    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to create availability' });
  }
};
