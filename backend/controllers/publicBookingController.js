const Booking = require('../models/Booking');
const Availability = require('../models/Availability');
const BookingLink = require('../models/BookingLink');
const { format, parse } = require('date-fns');

const convertDateFormat = (dateStr) => {
  try {
    const normalizedDate = dateStr.replace(/-/g, '/');
    const parsedDate = parse(normalizedDate, 'dd/MM/yyyy', new Date());
    return format(parsedDate, 'yyyy-MM-dd');
  } catch (err) {
    throw new Error('Invalid date format. Please use DD-MM-YYYY in URL or DD/MM/YYYY in body');
  }
};

exports.getAvailabilityByLinkId = async (req, res) => {
  try {
    const link = await BookingLink.findOne({ linkId: req.params.linkId });
    if (!link) return res.status(404).send('Invalid Link');

    const today = format(new Date(), 'dd/MM/yyyy');
    const availability = await Availability.find({ 
      userId: link.userId, 
      date: { $gte: convertDateFormat(today) } 
    });

    const formattedAvailability = availability.map(a => ({
      ...a.toObject(),
      date: format(parse(a.date, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy')
    }));

    res.json({ 
      availability: formattedAvailability,
      ownerName: link.ownerName || 'Calendar Owner'
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch availability' });
  }
};

function convertDateToDbFormat(dateStr) {
    return dateStr.replace(/-/g, '/');
  }
  exports.getSlotsForDate = async (req, res) => {
    try {
      const { linkId, date } = req.params;
  
      const link = await BookingLink.findOne({ linkId });
      if (!link) return res.status(404).send('Invalid Link');
  
      const formattedDate = convertDateToDbFormat(date);
  
      const avail = await Availability.findOne({ 
        userId: link.userId, 
        date: formattedDate 
      });
  
      if (!avail) return res.json({ slots: [] });
  
      const bookings = await Booking.find({ linkId, date: formattedDate });
      const bookedTimes = bookings.map(b => b.time);
  
      const slots = [];
      let current = new Date(`${formattedDate.split('/').reverse().join('-')}T${avail.startTime}`);
      const end = new Date(`${formattedDate.split('/').reverse().join('-')}T${avail.endTime}`);
  
      while (current < end) {
        const slot = current.toTimeString().slice(0, 5);
        if (!bookedTimes.includes(slot)) slots.push(slot);
        current.setMinutes(current.getMinutes() + 30);
      }
  
      res.json({ slots });
    } catch (err) {
      res.status(500).json({ error: err.message || 'Failed to fetch slots' });
    }
  };
    

exports.bookSlot = async (req, res) => {
  try {
    const { linkId, date, time } = req.body;
    
    const formattedDate = convertDateFormat(date);

    const exists = await Booking.findOne({ 
      linkId, 
      date: formattedDate, 
      time 
    });
    
    if (exists) return res.status(409).json({ 
      error: 'Slot already booked' 
    });

    await Booking.create({ 
      linkId, 
      date: formattedDate, 
      time 
    });
    
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ 
      error: err.message || 'Booking failed' 
    });
  }
};
